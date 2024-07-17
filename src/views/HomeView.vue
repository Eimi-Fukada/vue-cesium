<script setup lang="ts">
import { onMounted } from 'vue'
import * as Cesium from 'cesium'
import { prettyLog } from '@/utils/prettylog'

const setCesiumDefault = async () => {
  const defaultToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI4MGQ0YTBmOS0zNTY2LTQ5ZmUtODY2My1jMTc1OTIzMjU0MDAiLCJpZCI6MTk1MDUwLCJpYXQiOjE3MDc2NTA1Mjh9.AG76qYPGsQvT0kbsRba0vrA8Hm3KICp_3VYk0kq3msQ'
  Cesium.Ion.defaultAccessToken = defaultToken

  /** 这里是配置项 */
  const viewer = new Cesium.Viewer('cesiumContainer', {
    baseLayerPicker: false,
    // 动画播放控件
    animation: false,
    // 时间轴控件
    timeline: false,
    // 全屏按钮
    fullscreenButton: false,
    // 搜索位置按钮
    geocoder: true,
    // 帮助按钮
    navigationHelpButton: false,
    // VR按钮
    vrButton: false
  })
  // 加载带标签的必应鸟瞰图
  const layer = viewer.imageryLayers.addImageryProvider(
    await Cesium.IonImageryProvider.fromAssetId(3)
  )

  // 夜晚的地球
  // const layer = viewer.imageryLayers.addImageryProvider(
  //   await Cesium.IonImageryProvider.fromAssetId(3812)
  // )

  /** 相机 */
  // const position = Cesium.Cartesian3.fromDegrees(116.39, 39.9, 400)
  // viewer.camera.setView({
  //   // 设定相机的目的地
  //   destination: position,
  //   // 设定相机视口的方向
  //   orientation: {
  //     // 控制视口方向的水平旋转，即沿着Y轴旋转
  //     heading: Cesium.Math.toRadians(0),
  //     // 控制视口方向的上下旋转，即沿着X轴旋转
  //     pitch: Cesium.Math.toRadians(-20),
  //     // 控制视口的翻转角度，即沿着Z轴旋转
  //     roll: 0
  //   }
  // })

  /** 通过entities加载一个绿色的实体 */
  // const entity = viewer.entities.add({
  //   position: Cesium.Cartesian3.fromDegrees(116.39, 39.9, 400),
  //   point: {
  //     pixelSize: 100,
  //     color: new Cesium.Color(0, 1, 0, 1)
  //   }
  // })
  // viewer.trackedEntity = entity

  /** 通过entities加载一个飞机模型 */
  // const orientation = Cesium.Transforms.headingPitchRollQuaternion(
  //   position,
  //   new Cesium.HeadingPitchRoll(-90, 0, 0)
  // )
  // const entity = viewer.entities.add({
  //   position: position,
  //   orientation: orientation,
  //   model: {
  //     uri: '/Cesium_Air.glb',
  //     minimumPixelSize: 100,
  //     maximumScale: 10000,
  //     show: true
  //   }
  // })
  // viewer.trackedEntity = entity

  /** 通过GeoJsonDataSource加载矢量数据 */
  // viewer.dataSources.add(Cesium.GeoJsonDataSource.load('/ne_10m_us_states.topojson'))

  /** wgs84转为笛卡尔空间直角坐标系*/
  // const cartesian3 = Cesium.Cartesian3.fromDegrees(longitude, latitude, height)
}

onMounted(() => {
  setCesiumDefault()
})
</script>

<template>
  <div id="cesiumContainer" class="cesium-container"></div>
</template>

<style scoped>
#cesiumContainer {
  width: 100vw;
  height: 100vh;
}
</style>
