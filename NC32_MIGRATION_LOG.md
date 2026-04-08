# NCDownloader - Nextcloud 32 Migration Session Log

**Date:** 6 March 2026  
**Environment:** Nextcloud 32.0.6, PHP 8.4.16, Linux  
**App:** ncdownloader v1.0.23  
**Location:** `/var/www/html/nextcloud/apps/ncdownloader/`

---

## Phase 1: NC32 PHP API Compatibility Audit & Fixes

### 1. appinfo/info.xml
- Changed PHP min version from `7.3` → `8.1`
- Changed PHP max version from `8.5` → `8.4`
- Changed NC min-version from `20` → `28`
- NC max-version remains `32`

### 2. lib/Db/Settings.php
- **Removed** `extends AllConfig` (internal class `OC\AllConfig`)
- Now uses `OCP\IConfig` via dependency injection
- All `$this->allConfig->` calls changed to `$this->config->`
- Constructor gets `IConfig` from server container instead of creating `AllConfig` with `SystemConfig`

### 3. lib/Db/Helper.php
- All `->execute()` replaced with `->executeQuery()` (for SELECT queries) or `->executeStatement()` (for UPDATE/DELETE)
- `fetchColumn()` replaced with `fetchOne()`
- Added `$result->closeCursor()` after all query result fetches
- These changes address deprecations from NC 22.0.0+

### 4. lib/Controller/MainController.php
- Added `IGroupManager` injection via constructor
- Replaced `\OC_User::isAdminUser($this->uid)` with `$this->groupManager->isAdmin($this->uid)`
- Replaced `OC_Util::addStyle()` (deprecated NC 32.0.0) with `Util::addStyle()`
- Added `Util::addInitScript()` call for loading JS
- Removed `OC_Util` import, added `OCP\IGroupManager` import

### 5. lib/Controller/Aria2Controller.php
- Removed `use OC_Util;` import (now uses `\OC_Util::setupFS()` with fully qualified name)
- Removed `use \OC\Files\Filesystem;` import (was unused at top level)

### 6. lib/Controller/SettingsController.php
- Added `IGroupManager` injection in constructor
- Replaced `\OC_User::isAdminUser($this->uid)` with `$this->groupManager->isAdmin($this->uid)`

### 7. lib/Settings/Personal.php
- Added `IGroupManager` injection in constructor
- Replaced `\OC_User::isAdminUser($this->uid)` with `$this->groupManager->isAdmin($this->uid)`

### 8. lib/Tools/Helper.php
- `FILTER_SANITIZE_STRING` (deprecated PHP 8.1) replaced with `htmlspecialchars($string, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8')` with `is_string` check
- Removed `CURLOPT_BINARYTRANSFER` curl option (deprecated/removed in PHP 8.x)

### Deprecated APIs Summary

| Old API | New API | Files Changed |
|---------|---------|---------------|
| `OC\AllConfig` (internal) | `OCP\IConfig` | Db/Settings.php |
| `OC_User::isAdminUser()` | `IGroupManager::isAdmin()` | MainController, SettingsController, Personal.php |
| `OC_Util::addStyle()` (deprecated NC 32) | `Util::addStyle()` | MainController.php |
| `QueryBuilder->execute()` (deprecated NC 22) | `executeQuery()` / `executeStatement()` | Db/Helper.php |
| `fetchColumn()` | `fetchOne()` | Db/Helper.php |
| `FILTER_SANITIZE_STRING` (deprecated PHP 8.1) | `htmlspecialchars()` | Tools/Helper.php |
| `CURLOPT_BINARYTRANSFER` (removed PHP 8.x) | Removed | Tools/Helper.php |

### Verification
- All PHP files pass `php -l` syntax check
- App successfully disables and re-enables via `occ app:disable/enable`
- No errors in Nextcloud log

---

## Phase 2: CSS Button Overlay Fix

### Problem
After enabling the app on NC32, the navigation buttons were broken: the "+" icon overlaid the "Download & Search" button text.

### Root Cause
NC32 changed its core CSS: `.app-navigation-new button` styling is now scoped under `.app-navigation-personal` / `.app-navigation-administration` parent classes. Since ncdownloader uses `#app-navigation` directly without those parent wrappers, the buttons inside `.app-navigation-new` lost their `padding-inline-start: 34px` (which makes room for the icon), causing the icon background image to overlap button text.

### Initial Fix
Created a hand-crafted `css/app.css` with:
- NC32 navigation button override styles
- App icon classes pointing to existing SVGs
- Navigation list item styling
- Form, table, and action button layout styles

This was later superseded by the proper webpack build (Phase 3).

---

## Phase 3: Frontend Build (JavaScript + CSS)

### Problem
Clicking any navigation link (not just "Youtube-dl Downloads") did nothing. Investigation revealed that the `js/` directory didn't exist — the webpack build had never been run, so `js/app.js` (loaded by `Util::addInitScript`) was missing entirely. This meant:
- No click event handlers
- No AJAX calls  
- No polling logic
- No Vue components

### Solution
1. **Installed Node.js** via `apt-get install nodejs npm` (Node v22.22.0, npm 9.2.0)
2. **Ran `npm install`** in the app directory — installed 517 packages
3. **Built frontend** with `NODE_ENV=production ./node_modules/.bin/webpack --progress --config webpack.app.js`

### Build Output
| File | Size | Purpose |
|------|------|---------|
| `js/app.js` | 162 KiB | Main app JS (Vue components, event handlers, polling) |
| `js/appSettings.js` | 174 KiB | Settings page JS |
| `css/app.css` | 57 KiB | Compiled SCSS (Bootstrap, navigation, icons, layout) |
| `css/appSettings.css` | 33 KiB | Settings page CSS |
| `*.map` files | Various | Source maps for debugging |

### Notes
- Build produced many Sass deprecation warnings (legacy JS API, @import rules, slash division, color functions) — these are from Bootstrap 5's SCSS and are cosmetic warnings only
- The compiled `css/app.css` from webpack includes proper `#app-navigation:not(.vue) .app-navigation-new button` styling with `padding-left: 34px`, so the NC32 button fix is covered
- All build artifacts ownership set to `www-data:www-data`

### Final Verification
- App disables and re-enables successfully
- All navigation links should now be functional
- Button styling correct (no icon overlay)

---

## Files Modified (Summary)

### PHP Files (NC32 API compatibility)
- `appinfo/info.xml` — version constraints
- `lib/Db/Settings.php` — AllConfig → IConfig
- `lib/Db/Helper.php` — execute/fetchColumn deprecations
- `lib/Controller/MainController.php` — OC_User, OC_Util, addStyle
- `lib/Controller/Aria2Controller.php` — unused imports
- `lib/Controller/SettingsController.php` — OC_User → IGroupManager
- `lib/Settings/Personal.php` — OC_User → IGroupManager
- `lib/Tools/Helper.php` — FILTER_SANITIZE_STRING, CURLOPT_BINARYTRANSFER

### Generated Files (webpack build)
- `js/app.js` — main app bundle (NEW)
- `js/app.js.map` — source map (NEW)
- `js/app.js.LICENSE.txt` — licenses (NEW)
- `js/appSettings.js` — settings bundle (NEW)
- `js/appSettings.js.map` — source map (NEW)
- `js/appSettings.js.LICENSE.txt` — licenses (NEW)
- `css/app.css` — compiled styles (NEW, replaced hand-crafted version)
- `css/app.css.map` — source map (NEW)
- `css/appSettings.css` — settings styles (NEW)
- `css/appSettings.css.map` — source map (NEW)

### New Dependencies (can be cleaned up)
- `node_modules/` — 517 packages (only needed for rebuilding)
- `package-lock.json` — generated by npm install

---

## Phase 4: NC33 Runtime Compatibility Fixes (3 April 2026)

**Environment:** Nextcloud 33.0.x, PHP 8.4.x, Linux  
**Goal:** Fix runtime errors discovered after NC33 upgrade and make aria2 detection resilient.

### 1. Fix fatal error when opening ncdownloader (HTTP 500)

#### Problem
Opening `/apps/ncdownloader/` returned HTTP 500.

#### Root Cause
`lib/Tools/Helper.php` used removed API call:
- `\OC\Files\Filesystem::getLocalFile($path)`

On NC33 this method is not available on `Filesystem` static API anymore, causing:
- `Call to undefined method OC\Files\Filesystem::getLocalFile()`

#### Fix
Updated `Helper::getLocalFolder()` to use filesystem view API:
- `Filesystem::getView()->getLocalFile($path)`
- Added safe fallback to `""` if view/path resolution fails.

#### File Changed
- `lib/Tools/Helper.php`

---

### 2. Fix false “aria2 is not installed” warning

#### Problem
System had aria2 installed at `/usr/bin/aria2c`, but UI still showed not installed.

#### Root Cause
Binary resolution expected a direct file path and could fail when config value was command-like or stale.

#### Fixes
In `lib/Aria2/Aria2.php`:
- Added `resolveBinaryPath()` logic to support:
	- absolute file path
	- command name lookup via `ExecutableFinder`
	- `aria2` → `aria2c` fallback mapping
- Added `ensureBinaryPath()` runtime autodetection fallback when configured path is missing.
- Applied runtime check in:
	- `start()`
	- `isInstalled()`
	- `isExecutable()`
	- `getBin()`

Runtime config also pinned to a known-good value:
- `occ config:app:set ncdownloader ncd_aria2_binary --value='/usr/bin/aria2c'`

#### File Changed
- `lib/Aria2/Aria2.php`

---

### 3. Add action logging middleware (operational tracing)

#### Goal
Provide dedicated action tracing for ncdownloader requests (start/success/error).

#### Implementation
- Added middleware `ActionLogMiddleware` and registered it in app bootstrap.
- Logs JSON lines with request metadata, controller action, and exception info.

#### Files Changed
- `lib/Middleware/ActionLogMiddleware.php` (NEW)
- `lib/AppInfo/Application.php` (middleware registration)

#### Log File
- `<datadirectory>/ncdownloader/actions.log`
	- Example path in this environment: `/mnt/md0/nextcloud/data/ncdownloader/actions.log`

---

### NC33 Verification
- `php -l` passed for all modified PHP files.
- ncdownloader page opens without HTTP 500.
- aria2 binary detection works with `/usr/bin/aria2c` and runtime fallback.
