# Vapor — Condenser le Web dans votre Cloud

- [Anglais](README.md)
- [简体中文](README.zh-CN.md)
- [Français](README.fr-FR.md)

Vapor est une application Nextcloud qui ajoute un gestionnaire de téléchargement complet directement dans votre cloud. Il fournit une interface web propre pour Aria2 et yt-dlp, vous permettant de télécharger du contenu d'Internet directement dans vos fichiers Nextcloud.

Lien de l'application : https://apps.nextcloud.com/apps/vapor

- Rechercher des torrents sur plusieurs sites BT sans quitter Nextcloud
- Contrôler Aria2 et gérer toutes les tâches de téléchargement depuis le web
- Télécharger des vidéos et des sons sur plus de 700 sites via yt-dlp (YouTube, Dailymotion, Twitter, Facebook et bien d'autres)

<img width="800" alt="Interface du gestionnaire de téléchargement Vapor" src="screenshots/vaporFullApp.png">
<img width="800" alt="Panneau de réglage des options de Vapor" src="screenshots/vaporSettingsRevealed.png">
<img width="800" alt="Paramètres de l'administration de Vapor" src="screenshots/vaporAdminSettings.png">
<img width="800" alt="Paramètres personnels de Vapor" src="screenshots/vaporPersonalSettings.png">

---

## Prérequis

- Nextcloud 32–34
- PHP 8.3–8.5
- Ubuntu 22.04, Debian 12-13 (ou n'importe quelle distribution Linux compatible)
- Accès en ligne de commande avec sudo
- aria2 installé sur le serveur

---

## Installation

**1. Installer aria2:**
```bash
sudo apt install aria2
```

**2. Activez l'application via l'App Store de Nextcloud** (recherche de "Vapor"), ou cloner manuellement:
```bash
cd /var/www/nextcloud/apps
sudo git clone https://github.com/wolfravenous/vapor.git
sudo chown -R www-data:www-data /var/www/nextcloud/apps/vapor
```

**3. Télécharger yt-dlp:**
```bash
sudo mkdir -p /var/www/nextcloud/apps/vapor/bin
sudo wget -O /var/www/nextcloud/apps/vapor/bin/yt-dlp https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp
sudo chmod 755 /var/www/nextcloud/apps/vapor/bin/yt-dlp
sudo chown www-data:www-data /var/www/nextcloud/apps/vapor/bin/yt-dlp
```

**4. Activer l'application:**
```bash
sudo -u www-data php8.3 /var/www/nextcloud/occ app:enable vapor
```

Naviguez ensuite vers Vapor dans votre instance Nextcloud et configurez vos paramètres.

---

## Mise à jour de yt-dlp

Si le bouton de mise à jour de l'application ne fonctionne pas, mettez à jour manuellement:
```bash
sudo wget -O /var/www/nextcloud/apps/vapor/bin/yt-dlp https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp
sudo chmod 755 /var/www/nextcloud/apps/vapor/bin/yt-dlp
sudo chown www-data:www-data /var/www/nextcloud/apps/vapor/bin/yt-dlp
```

---

## Credits

Application originale par [jiaxinhuang (shiningw)](https://github.com/shiningw/ncdownloader).
Forké et maintenu en tant que Vapor by [wolfravenous](https://github.com/wolfravenous/vapor).

---

## License

GNU Affero General Public License v3.0 ou plus tard (AGPL-3.0-or-later) — Voir [LICENSE](LICENSE) pour plus de details.
