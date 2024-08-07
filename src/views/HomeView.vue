<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import * as Cesium from 'cesium'
import { keyboardMapRoamingInit } from '@/utils/keyboardMapRoaming'
import { saveToImage } from '@/utils/saveToImage'
import { createSnowEffect } from '@/utils/snowEffect'
import { createRainEffect } from '@/utils/rainEffect'
import { updateLighting } from '@/utils/updateLighting'

const cesiumViewer = ref<Cesium.Viewer | null>(null)
const state = reactive({
  isWalking: false,
  animations: []
})

/** 初始化Cesium */
const setCesiumDefault = async () => {
  const defaultToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI4MGQ0YTBmOS0zNTY2LTQ5ZmUtODY2My1jMTc1OTIzMjU0MDAiLCJpZCI6MTk1MDUwLCJpYXQiOjE3MDc2NTA1Mjh9.AG76qYPGsQvT0kbsRba0vrA8Hm3KICp_3VYk0kq3msQ'
  Cesium.Ion.defaultAccessToken = defaultToken

  const esri = await Cesium.ArcGisMapServerImageryProvider.fromUrl(
    'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer'
  )

  /** 这里是配置项 */
  cesiumViewer.value = new Cesium.Viewer('cesiumContainer', {
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
    vrButton: false,
    shouldAnimate: true,
    selectionIndicator: true,
    infoBox: true
  })

  // 加载ArcGis地图
  // cesiumViewer.value.imageryLayers.addImageryProvider(esri)

  // 去除logo
  // @ts-ignore
  cesiumViewer.value.cesiumWidget.creditContainer.style.display = 'none'

  // 显示帧率
  cesiumViewer.value.scene.debugShowFramesPerSecond = true

  // 自定义地球球体背景效果
  // const provider = await Cesium.SingleTileImageryProvider.fromUrl('/1.webp')
  // cesiumViewer.value.imageryLayers.addImageryProvider(provider)

  // 昼夜交替效果
  // updateLighting(cesiumViewer.value)

  // 下雪事件
  // const snowEffect = createSnowEffect(cesiumViewer.value, {
  //   snowSize: 0.02,
  //   snowSpeed: 60
  // })

  // 下雨事件
  // const rainEffect = createRainEffect(cesiumViewer.value, {
  //   tiltAngle: -0.2, //倾斜角度
  //   rainSize: 1.0, // 雨大小
  //   rainSpeed: 120.0 // 雨速
  // })

  // 键盘控制漫游
  keyboardMapRoamingInit(cesiumViewer.value)

  // 夜晚的地球
  // addImageryProvider方法用于添加一个新的图层
  // cesiumViewer.value.imageryLayers.addImageryProvider(
  //   await Cesium.IonImageryProvider.fromAssetId(3812)
  // )

  /** 相机 */
  // const position = Cesium.Cartesian3.fromDegrees(116.39, 39.9, 400)
  // cesiumViewer.value.camera.setView({
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
  // const entity = cesiumViewer.value.entities.add({
  //   position: Cesium.Cartesian3.fromDegrees(116.39, 39.9, 400),
  //   point: {
  //     pixelSize: 100,
  //     color: new Cesium.Color(0, 1, 0, 1)
  //   }
  // })
  // cesiumViewer.value.trackedEntity = entity

  /** 通过entities加载一个飞机模型 */
  // const orientation = Cesium.Transforms.headingPitchRollQuaternion(
  //   position,
  //   new Cesium.HeadingPitchRoll(-90, 0, 0)
  // )
  // const entity = cesiumViewer.value.entities.add({
  //   position: position,
  //   orientation: orientation,
  //   model: {
  //     uri: '/Cesium_Air.glb',
  //     minimumPixelSize: 100,
  //     maximumScale: 10000,
  //     show: true
  //   }
  // })
  // cesiumViewer.value.trackedEntity = entity

  /** 通过GeoJsonDataSource加载矢量数据 */
  // cesiumViewer.value.dataSources.add(Cesium.GeoJsonDataSource.load('/ne_10m_us_states.topojson'))

  /** wgs84转为笛卡尔空间直角坐标系*/
  // const cartesian3 = Cesium.Cartesian3.fromDegrees(longitude, latitude, height)

  /** 添加建筑物 */
  // const tileset = cesiumViewer.value.scene.primitives.add(
  //   await Cesium.Cesium3DTileset.fromIonAssetId(75343)
  // )

  /** 添加相机信息 */
  // const position = Cesium.Cartesian3.fromDegrees(-74.006, 40.7128, 100)
  // cesiumViewer.value.camera.setView({
  //   destination: position,
  //   orientation: {
  //     heading: 0,
  //     pitch: 0,
  //     roll: 0.0
  //   }
  // })
  // tileset.style = new Cesium.Cesium3DTileStyle({
  //   color: {
  //     conditions: [
  //       ['${Height} >= 300', 'rgba(45,0,75,0.5)'],
  //       ['${Height} >= 100', 'rgb(170,162,204)'],
  //       ['${Height} >= 50', 'rgb(102,71,151)'],
  //       ['true', 'rgb(127,59,8)']
  //     ]
  //   },
  //   show: '${Height} > 0',
  //   meta: {
  //     description: '"Building id ${id} has height ${Height}."'
  //   }
  // })

  // 设置人物初始位置
  const position = Cesium.Cartesian3.fromDegrees(120.53994, 31.295186, 0.0)
  cesiumViewer.value.camera.setView({
    destination: Cesium.Cartesian3.fromDegrees(120.53954, 31.293226, 20.0),
    orientation: {
      heading: 0,
      pitch: 0,
      roll: 0.0
    }
  })
  // 记录初始相机位置和相对位置
  const initialCameraPosition = Cesium.Cartesian3.clone(cesiumViewer.value.camera.position)
  const initialCameraOffset = Cesium.Cartesian3.subtract(
    initialCameraPosition,
    position,
    new Cesium.Cartesian3()
  )
  const headingPositionRoll = new Cesium.HeadingPitchRoll()
  const fixedFrameTransform = Cesium.Transforms.localFrameToFixedFrameGenerator('north', 'west')
  const orientation = Cesium.Transforms.headingPitchRollQuaternion(
    position,
    new Cesium.HeadingPitchRoll(-135, 0, 0)
  )

  cesiumViewer.value.entities.add({
    position: position,
    orientation: orientation,
    model: {
      uri: '/场景卡通.glb',
      minimumPixelSize: 100,
      maximumScale: 10000,
      show: true
    }
  })
  /** 加载人物模型 */
  const model = await Cesium.Model.fromGltfAsync({
    url: '/Cesium_Man.glb',
    scale: 8,
    show: true,
    gltfCallback: (gltf) => {
      state.animations = gltf.animations
    },
    modelMatrix: Cesium.Transforms.headingPitchRollToFixedFrame(
      position,
      headingPositionRoll,
      Cesium.Ellipsoid.WGS84,
      fixedFrameTransform
    )
  })
  cesiumViewer.value.scene.primitives.add(model)

  function handleReady() {
    model.readyEvent.removeEventListener(handleReady)
    document.addEventListener('keydown', (event) => handleKeyDown(event))
    document.addEventListener('keyup', (event) => handleKeyUp(event))

    // 初始化动画状态
    if (state.isWalking) {
      updateAnimationState(true)
    }
  }
  model.readyEvent.addEventListener(() => {
    handleReady()
  })
  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'w') {
      state.isWalking = true
      updateAnimationState(true)
      // updatePositionAndCamera()
    }
  }
  function handleKeyUp(event: KeyboardEvent) {
    if (event.key === 'w') {
      state.isWalking = false
      updateAnimationState(false)
    }
  }
  function updateAnimationState(isWalking: boolean) {
    if (state.animations && state.animations.length > 0) {
      if (isWalking) {
        if (!model.activeAnimations.length) {
          model.activeAnimations.add({
            index: state.animations.length - 1,
            loop: Cesium.ModelAnimationLoop.REPEAT,
            multiplier: 0.5
          })
        }
      } else {
        model.activeAnimations.removeAll()
      }
    }
  }

  let currentModelMatrix = Cesium.Transforms.headingPitchRollToFixedFrame(
    position,
    headingPositionRoll,
    Cesium.Ellipsoid.WGS84,
    fixedFrameTransform
  )
  // 更新模型和相机位置的函数
  function updatePositionAndCamera() {
    // 计算前进方向
    const moveDirection = Cesium.Cartesian3.multiplyByScalar(
      Cesium.Cartesian3.UNIT_X,
      0.1,
      new Cesium.Cartesian3()
    )

    // 计算新的位置
    const newPosition = Cesium.Matrix4.multiplyByPoint(
      currentModelMatrix,
      moveDirection,
      new Cesium.Cartesian3()
    )

    // 更新当前模型矩阵
    currentModelMatrix = Cesium.Transforms.headingPitchRollToFixedFrame(
      newPosition,
      headingPositionRoll,
      Cesium.Ellipsoid.WGS84,
      fixedFrameTransform
    )

    // 更新模型位置
    model.modelMatrix = currentModelMatrix

    // 更新相机位置，保持初始偏移和角度
    const newCameraPosition = Cesium.Cartesian3.add(
      newPosition,
      initialCameraOffset,
      new Cesium.Cartesian3()
    )
    cesiumViewer.value?.camera.setView({
      destination: newCameraPosition,
      orientation: {
        heading: 0,
        pitch: 0,
        roll: 0.0
      }
    })
  }
}

/** 导出场景图片 */
const handleExport = () => {
  if (cesiumViewer.value) {
    saveToImage(cesiumViewer.value)
  }
}

onMounted(() => {
  setCesiumDefault()
})
</script>

<template>
  <div style="position: relative">
    <div id="cesiumContainer" class="cesium-container"></div>
    <div class="export" @click="handleExport">export</div>
  </div>
</template>

<style scoped>
#cesiumContainer {
  width: 100vw;
  height: 100vh;
}
.export {
  position: absolute;
  top: 100px;
  right: 0;
  background-color: #fff;
  border-radius: 12px;
  padding: 8px 12px;
  cursor: pointer;
}
</style>
