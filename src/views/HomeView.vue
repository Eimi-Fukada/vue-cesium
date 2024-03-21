<script setup lang="ts">
import {onMounted, ref} from 'vue'
import * as Cesium from 'cesium'

onMounted(() => {
  const position = Cesium.Cartesian3.fromDegrees(-75.59777, 40.03883, 10000.0);  
  const heading = Cesium.Math.toRadians(0.0); // 朝向的方位角（以弧度为单位）  
  const pitch = Cesium.Math.toRadians(0.0);
  const roll = 0.0
  const orientation = {  
    heading : heading,  
    pitch : pitch,  
    roll : roll  
  };  
  const viewer = new Cesium.Viewer('cesiumContainer', {
    //这里是配置项
  })
  viewer.camera.setView({  
    destination : position,
    orientation : orientation  
  });
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
