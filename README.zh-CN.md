- [English](README.md)
- [简体中文](README.zh-CN.md)

运行在nextcloud下的多功能下载工具（Aria2 and youtube-dl）

- 内置种子搜索工具，可以多个网站搜索，直接APP内下载
- 无需手动配置Aria2，支持web界面配置和开启
- 利用youtube-dl的强大功能，可从数百个网站下载音视频文件
<img width="800" alt="nc2" src="https://user-images.githubusercontent.com/3911975/132008308-dec2a7ba-4387-441e-9ded-538d61fbccf0.png">
<img width="800" alt="nc4" src="https://user-images.githubusercontent.com/3911975/142444998-54dd54a6-0c8e-4d49-8188-270964a99c50.png">
<img width="800" alt="nc5" src="https://user-images.githubusercontent.com/3911975/142445020-27ec389a-5437-4d28-acc0-5e757fd6897d.png">

### 如何使用

最新版本已经自带aria2c和youtube-dl程序 (*在centos7 and ubuntu 20.04上测试过nextcloud的snap版本，可正常运行*)   
但如果自带的程序无法在你的系统正常运行，那你就得自己安装youtube-dl和aria2c了
#### 在ubuntu下安装aria2 and youtube-dl
```bash
sudo apt install aria2
sudo curl -L https://yt-dl.org/downloads/latest/youtube-dl 4 -o /usr/local/bin/youtube-dl
sudo chmod a+rx /usr/local/bin/youtube-dl
```
本地安装的版本优先于自带的版本
但是你可以通过在app内设置，强制使用特定版本的aria2或youtube-dl

#### 生成前端代码
需要安装NPM 7.0+ and node 14.0.0+
```bash
#start to build
npm run build

#installing php dependencies
composer install
```

#### Nextcloud App homepage
https://apps.nextcloud.com/apps/ncdownloader