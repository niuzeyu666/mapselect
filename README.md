# 无畏契约随机地图选择器

一个用于朋友自定义房间开黑的 VALORANT 随机地图选择器，也包含 VCT 风格 Ban/Pick 手动流程工具。网站是纯静态实现，可以直接部署到 GitHub Pages。

## 功能

- 自定义房间随机地图：从全部标准 5v5 爆破地图中随机选择。
- VCT Ban/Pick：支持 Bo1、Bo3、Bo5，按官方 VCT 规则中的 Team A / Team B 顺序逐步执行。轮到哪一队，就由该队手动点击地图；需要选边时，再由规则指定的队伍选择进攻方或防守方。
- 图片优先加载 `assets/maps/` 里的本地地图图；如果本地图片加载失败，会回退到 Valorant API 的地图 `splash` 图片。

## 地图范围

自定义随机池包含全部标准 5v5 爆破地图：

Summit, Corrode, Abyss, Sunset, Lotus, Pearl, Fracture, Breeze, Icebox, Ascent, Split, Haven, Bind。

VCT Ban/Pick 使用 7 图池。当前默认池为：

Summit, Sunset, Breeze, Haven, Lotus, Split, Ascent。

VCT 官方规则说明完整地图池由具体赛事规则集决定；如果 Riot 后续调整地图池，更新 `script.js` 中的 `vctPoolSlugs` 即可。

## 免责声明

本网站是非官方粉丝项目，未获得 Riot Games、VALORANT 或 VCT 官方认可、赞助或授权。Riot Games、VALORANT 及相关地图图片资产归 Riot Games, Inc. 所有。

## 本地预览

可以直接打开 `index.html`，也可以启动一个静态服务器：

```bash
python -m http.server 8000
```

然后访问 `http://localhost:8000`。
