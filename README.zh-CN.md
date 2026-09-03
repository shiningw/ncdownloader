# Vapor — 将网络凝聚于您的云端

- [English](README.md)
- [简体中文](README.zh-CN.md)
- [Français](README.fr-FR.md)

Vapor 是一款 Nextcloud 应用，将功能完整的下载管理器直接集成到您的云端。它为 Aria2 和 yt-dlp 提供简洁的 Web 界面，让您可以将互联网上的内容直接下载到 Nextcloud 文件中。

应用链接 : https://apps.nextcloud.com/apps/vapor

- 无需离开 Nextcloud，即可从多个 BT 站点搜索种子
- 通过 Web 界面控制 Aria2 并管理所有下载任务
- 借助 yt-dlp 的强大功能，从 700 多个网站下载音视频文件（YouTube、优酷、Dailymotion、Twitter、Facebook 等）

<img width="800" alt="Vapor 下载管理界面" src="screenshots/vaporFullApp.png">
<img width="800" alt="Vapor 设置面板" src="screenshots/vaporSettingsRevealed.png">
<img width="800" alt="Vapor 管理员设置" src="screenshots/vaporAdminSettings.png">
<img width="800" alt="Vapor 个人设置" src="screenshots/vaporPersonalSettings.png">

---

## 系统要求

- Nextcloud 32–34
- PHP 8.3–8.5
- Ubuntu 22.04, Debian 12-13 （或兼容的 Linux 发行版）
- 具有 sudo 权限的命令行访问
- 服务器上已安装 aria2

---

## 安装方法

**1. 安装 aria2：**
```bash
sudo apt install aria2
```

**2. 通过 Nextcloud 应用商店启用应用**（搜索"Vapor"），或手动克隆：
```bash
cd /var/www/nextcloud/apps
sudo git clone https://github.com/wolfravenous/vapor.git
sudo chown -R www-data:www-data /var/www/nextcloud/apps/vapor
```

**3. 下载 yt-dlp：**
```bash
sudo mkdir -p /var/www/nextcloud/apps/vapor/bin
sudo wget -O /var/www/nextcloud/apps/vapor/bin/yt-dlp https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp
sudo chmod 755 /var/www/nextcloud/apps/vapor/bin/yt-dlp
sudo chown www-data:www-data /var/www/nextcloud/apps/vapor/bin/yt-dlp
```

**4. 启用应用：**
```bash
sudo -u www-data php8.3 /var/www/nextcloud/occ app:enable vapor
```

然后在您的 Nextcloud 实例中打开 Vapor 并配置相关设置。

---

## 手动更新 yt-dlp

如果应用内的更新按钮无法正常工作，请手动更新：

```bash
sudo wget -O /var/www/nextcloud/apps/vapor/bin/yt-dlp https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp
sudo chmod 755 /var/www/nextcloud/apps/vapor/bin/yt-dlp
sudo chown www-data:www-data /var/www/nextcloud/apps/vapor/bin/yt-dlp
```

---

## 致谢

原始应用由 [jiaxinhuang (shiningw)](https://github.com/shiningw/ncdownloader) 开发。
由 [wolfravenous](https://github.com/wolfravenous/vapor) 更名为 Vapor 并持续维护。

---

## 许可证

GNU Affero 通用公共许可证 v3.0 或更高版本（AGPL-3.0-or-later）— 详情请参阅 [LICENSE](LICENSE)。
