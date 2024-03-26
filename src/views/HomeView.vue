<script setup lang="ts">
import { onMounted } from 'vue'
import * as Cesium from 'cesium'
onMounted(() => {
  const defaultToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI4MGQ0YTBmOS0zNTY2LTQ5ZmUtODY2My1jMTc1OTIzMjU0MDAiLCJpZCI6MTk1MDUwLCJpYXQiOjE3MDc2NTA1Mjh9.AG76qYPGsQvT0kbsRba0vrA8Hm3KICp_3VYk0kq3msQ'
  Cesium.Ion.defaultAccessToken = defaultToken
  const viewer = new Cesium.Viewer('cesiumContainer', {
    // 这里是配置项
    // 动画播放控件
    animation: false,
    // 时间轴控件
    timeline: false,
    // 全屏按钮
    fullscreenButton: true,
    // 搜索位置按钮
    geocoder: true,
    // 帮助按钮
    navigationHelpButton: false,
    // VR按钮
    vrButton: true
  })
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
