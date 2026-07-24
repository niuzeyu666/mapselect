# 无畏契约随机地图选择器

一个用于朋友自定义房间开黑的 VALORANT 随机地图选择器。网站是纯静态实现，可以直接部署到 GitHub Pages。

## 地图范围

当前随机池包含全部标准 5v5 爆破地图：

Summit, Corrode, Abyss, Sunset, Lotus, Pearl, Fracture, Breeze, Icebox, Ascent, Split, Haven, Bind。

训练场和模式专属小地图不在随机池内。

## 图片策略

页面优先加载 `assets/maps/` 里的本地地图图；如果本地图片加载失败，会回退到 Valorant API 的地图 `splash` 图片。

## 本地预览

可以直接打开 `index.html`，也可以启动一个静态服务器：

```bash
python -m http.server 8000
```

然后访问 `http://localhost:8000`。
