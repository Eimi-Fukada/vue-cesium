import * as Cesium from 'cesium'

/**
 * @description: 下雨效果
 */
export function createRainEffect(
  viewer: Cesium.Viewer,
  options?: { tiltAngle?: number; rainSize?: number; rainSpeed?: number }
) {
  if (!viewer) throw new Error('no viewer object!')

  const tiltAngle = Cesium.defaultValue(options?.tiltAngle, -0.6) // 倾斜角度，负数向右，正数向左
  const rainSize = Cesium.defaultValue(options?.rainSize, 0.3) // 雨大小
  const rainSpeed = Cesium.defaultValue(options?.rainSpeed, 60.0) // 雨速

  const rainStage = new Cesium.PostProcessStage({
    name: 'czm_rain',
    fragmentShader: rainFragmentShader(tiltAngle, rainSize, rainSpeed),
    uniforms: {
      tiltAngle: () => tiltAngle,
      rainSize: () => rainSize,
      rainSpeed: () => rainSpeed
    }
  })
  // 默认禁用 PostProcessStage，可以这样执行show和destroy，但是我觉得有点多此一举
  // postProcessStages默认就是开启状态，没必要用show事件手动开启
  // snowStage.enabled = false

  viewer.scene.postProcessStages.add(rainStage)

  return {
    // show: () => {
    //   snowStage.enabled = true
    // },
    destroy: () => {
      viewer.scene.postProcessStages.remove(rainStage)
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function rainFragmentShader(tiltAngle: number, rainSize: number, rainSpeed: number): string {
    return `uniform sampler2D colorTexture;\n\
              in vec2 v_textureCoordinates;\n\
              uniform float tiltAngle;\n\
              uniform float rainSize;\n\
              uniform float rainSpeed;\n\
              float hash(float x) {\n\
                  return fract(sin(x * 133.3) * 13.13);\n\
              }\n\
              out vec4 fragColor;\n\
              void main(void) {\n\
                  float time = czm_frameNumber / rainSpeed;\n\
                  vec2 resolution = czm_viewport.zw;\n\
                  vec2 uv = (gl_FragCoord.xy * 2. - resolution.xy) / min(resolution.x, resolution.y);\n\
                  vec3 c = vec3(.6, .7, .8);\n\
                  float a = tiltAngle;\n\
                  float si = sin(a), co = cos(a);\n\
                  uv *= mat2(co, -si, si, co);\n\
                  uv *= length(uv + vec2(0, 4.9)) * rainSize + 1.;\n\
                  float v = 1. - sin(hash(floor(uv.x * 100.)) * 2.);\n\
                  float b = clamp(abs(sin(20. * time * v + uv.y * (5. / (2. + v)))) - .95, 0., 1.) * 20.;\n\
                  c *= v * b;\n\
                  fragColor = mix(texture(colorTexture, v_textureCoordinates), vec4(c, 1), .5);\n\
              }\n\
              `
  }
}
