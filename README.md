# Vapor — Condensing the Web into Your Cloud

- [English](README.md)
- [简体中文](README.zh-CN.md)
- [Français](README.fr-FR.md)

Vapor is a Nextcloud app that brings a full-featured download manager directly into your cloud. It provides a clean web interface for Aria2 and yt-dlp, letting you pull content from across the internet straight into your Nextcloud files.

Link to app : https://apps.nextcloud.com/apps/vapor

- Search for torrents from multiple BT sites without leaving Nextcloud
- Control Aria2 and manage all download tasks from the web
- Download videos and audio from 700+ sites via yt-dlp (YouTube, Dailymotion, Twitter, Facebook and many more)

<img width="800" alt="Vapor download manager interface" src="screenshots/vaporFullApp.png">
<img width="800" alt="Vapor settings panel" src="screenshots/vaporSettingsRevealed.png">
<img width="800" alt="Vapor admin settings" src="screenshots/vaporAdminSettings.png">
<img width="800" alt="Vapor personal settings" src="screenshots/vaporPersonalSettings.png">

---

## Requirements

- Nextcloud 32–34
- PHP 8.3–8.5
- Ubuntu 22.04, Debian 12-13 (or compatible Linux distribution)
- Command line access with sudo
- aria2 installed on the server

---

## Installation

**1. Install aria2:**
```bash
sudo apt install aria2
```

**2. Enable the app via the Nextcloud App Store** (search for "Vapor"), or clone manually:
```bash
cd /var/www/nextcloud/apps
sudo git clone https://github.com/wolfravenous/vapor.git
sudo chown -R www-data:www-data /var/www/nextcloud/apps/vapor
```

**3. Download yt-dlp:**
```bash
sudo mkdir -p /var/www/nextcloud/apps/vapor/bin
sudo wget -O /var/www/nextcloud/apps/vapor/bin/yt-dlp https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp
sudo chmod 755 /var/www/nextcloud/apps/vapor/bin/yt-dlp
sudo chown www-data:www-data /var/www/nextcloud/apps/vapor/bin/yt-dlp
```

**4. Enable the app:**
```bash
sudo -u www-data php8.3 /var/www/nextcloud/occ app:enable vapor
```

Then navigate to Vapor in your Nextcloud instance and configure your settings.

---

## Updating yt-dlp

If the in-app update button doesn't work, update manually:

```bash
sudo wget -O /var/www/nextcloud/apps/vapor/bin/yt-dlp https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp
sudo chmod 755 /var/www/nextcloud/apps/vapor/bin/yt-dlp
sudo chown www-data:www-data /var/www/nextcloud/apps/vapor/bin/yt-dlp
```

---

## Credits

Original app by [jiaxinhuang (shiningw)](https://github.com/shiningw/ncdownloader).
Forked and maintained as Vapor by [wolfravenous](https://github.com/wolfravenous/vapor).

---

## License

GNU Affero General Public License v3.0 or later (AGPL-3.0-or-later) — see [LICENSE](LICENSE) for details.
