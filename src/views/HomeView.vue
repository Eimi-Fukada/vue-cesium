<script setup lang="ts">
import { onMounted } from 'vue'
import * as Cesium from 'cesium'
import { prettyLog } from '@/utils/prettylog'
import { keyboardMapRoamingInit } from '@/utils/keyboardMapRoaming'

const setCesiumDefault = async () => {
  const defaultToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI4MGQ0YTBmOS0zNTY2LTQ5ZmUtODY2My1jMTc1OTIzMjU0MDAiLCJpZCI6MTk1MDUwLCJpYXQiOjE3MDc2NTA1Mjh9.AG76qYPGsQvT0kbsRba0vrA8Hm3KICp_3VYk0kq3msQ'
  Cesium.Ion.defaultAccessToken = defaultToken

  const esri = await Cesium.ArcGisMapServerImageryProvider.fromUrl(
    'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer'
  )
  /** 这里是配置项 */
  const viewer = new Cesium.Viewer('cesiumContainer', {
    baseLayerPicker: false,
    terrainProvider: await Cesium.CesiumTerrainProvider.fromIonAssetId(1, {
      // 可以增加法线，用于提高光照效果
      requestVertexNormals: true,
      // 可以增加水面特效
      requestWaterMask: true
    }),
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
  // 加载ArcGis地图
  viewer.imageryLayers.addImageryProvider(esri)
  // 去除logo
  // @ts-ignore
  viewer.cesiumWidget.creditContainer.style.display = 'none'

  // 键盘控制漫游
  keyboardMapRoamingInit(viewer)

  // 夜晚的地球
  // addImageryProvider方法用于添加一个新的图层
  // viewer.imageryLayers.addImageryProvider(await Cesium.IonImageryProvider.fromAssetId(3812))

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

  /** 添加建筑物 */
  const tileset = viewer.scene.primitives.add(await Cesium.Cesium3DTileset.fromIonAssetId(75343))
  /** 添加相机信息 */
  const position = Cesium.Cartesian3.fromDegrees(-74.006, 40.7128, 100)
  viewer.camera.setView({
    destination: position,
    orientation: {
      heading: 0,
      pitch: 0,
      roll: 0.0
    }
  })
  tileset.style = new Cesium.Cesium3DTileStyle({
    color: {
      conditions: [
        ['${Height} >= 300', 'rgba(45,0,75,0.5)'],
        ['${Height} >= 100', 'rgb(170,162,204)'],
        ['${Height} >= 50', 'rgb(102,71,151)'],
        ['true', 'rgb(127,59,8)']
      ]
    },
    show: '${Height} > 0',
    meta: {
      description: '"Building id ${id} has height ${Height}."'
    }
  })
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
