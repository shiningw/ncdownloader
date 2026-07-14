# Changelog

All notable changes to Vapor will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.2] - 2026-07-08

### Fixed

- Composer creating issue with WebDav [Issue #9]
- Deprecation error logs due to symphony [Issue #7]
- Update Yt-dlp in Vaper Admin settings by clicking on "check for update", error appear in logs. [Issue #8]

[Issue #9]:https://github.com/wolfravenous/vapor/issues/9
[Issue #7]:https://github.com/wolfravenous/vapor/issues/7
[Issue #8]:https://github.com/wolfravenous/vapor/issues/8
[1.0.2]:https://github.com/wolfravenous/vapor/releases/tag/v1.0.2


## [1.0.1] - 2026-07-07

### Added
- [French] Translation of the README file
- Link to [App] in NextCloud Online Store in [README] file

### Changed
- Make download files appear without manual scan. [Issue #4]

### Fixed
- Repaired deprecations. [Issue #3] [Issue #2]

[1.0.1]: https://github.com/wolfravenous/vapor/releases/tag/v1.0.1
[French]: https://github.com/wolfravenous/vapor/issues/6
[Issue #4]:https://github.com/wolfravenous/vapor/issues/4
[Issue #3]:https://github.com/wolfravenous/vapor/issues/3
[Issue #2]:https://github.com/wolfravenous/vapor/issues/2
[README]:https://github.com/wolfravenous/vapor/blob/master/README.md
[App]:https://apps.nextcloud.com/apps/vapor

## [1.0.0] - 2026-06-18

### Added
- Full rebrand from NCDownloader to Vapor
- Nextcloud 34 compatibility: replaced all removed `OC\Server` facade methods with modern `OCP` interface equivalents (`ICacheFactory`, `IConfig`, `IDBConnection`, `IUserSession`, `IURLGenerator`, `IAppManager`, `IniGetWrapper`)
- Nextcloud 33 compatibility: replaced deprecated `OC\Files\Filesystem` with `OCP\Files\IRootFolder`, `QueryBuilder::execute()` with `executeQuery()`/`executeStatement()`, `OC\AllConfig` with `OCP\IConfig`, `OC\Core\Command\Base` with Symfony `Command`
- PHP 8.3 and 8.5 support
- Built and committed compiled JS/CSS assets

### Changed
- App ID renamed from `ncdownloader` to `vapor`
- PHP namespace updated from `OCA\NCDownloader` to `OCA\Vapor`
- Minimum PHP version bumped to 8.3
- Minimum Nextcloud version set to 32, maximum to 34
- License identifier updated to SPDX format (`AGPL-3.0-or-later`)
- Author attribution updated to include fork maintainer

### Fixed
- Anonymous user hitting the app page no longer causes a fatal `TypeError` from null UID passed to `OC_User::isAdminUser()`
- Database index name collision on fresh install (`gid_index` → `vapor_gid_index`)

[1.0.0]: https://github.com/wolfravenous/vapor/releases/tag/v1.0.0

