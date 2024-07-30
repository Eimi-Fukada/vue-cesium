import * as Cesium from 'cesium'

/**
 * @description: 昼夜交替效果
 */
export function updateLighting(_viewer: Cesium.Viewer) {
  // OSM标准风格地图
  const dayLayer = _viewer.imageryLayers.addImageryProvider(
    new Cesium.UrlTemplateImageryProvider({
      url: 'https://tile-{s}.openstreetmap.fr/hot/{z}/{x}/{y}.png',
      subdomains: ['a', 'b', 'c', 'd']
    })
  )

  // OSM暗色系地图
  const nightLayer = _viewer.imageryLayers.addImageryProvider(
    new Cesium.UrlTemplateImageryProvider({
      url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png',
      subdomains: ['a', 'b', 'c', 'd']
    })
  )
  // 启用光照
  _viewer.scene.globe.enableLighting = true
  _viewer.clock.shouldAnimate = true
  _viewer.clock.multiplier = 5000
  nightLayer.dayAlpha = 0.0
}
