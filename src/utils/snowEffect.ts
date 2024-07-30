import * as Cesium from 'cesium'

/**
 * @description: 下雪效果
 */
export function createSnowEffect(
  viewer: Cesium.Viewer,
  options?: { snowSize?: number; snowSpeed?: number }
) {
  if (!viewer) throw new Error('no viewer object!')

  const snowSize = Cesium.defaultValue(options?.snowSize, 0.02) // 最好小于0.02
  const snowSpeed = Cesium.defaultValue(options?.snowSpeed, 60.0) // 速度

  const snowStage = new Cesium.PostProcessStage({
    name: 'czm_snow',
    fragmentShader: snowFragmentShader(snowSize, snowSpeed),
    uniforms: {
      snowSize: () => snowSize,
      snowSpeed: () => snowSpeed
    }
  })
  // 默认禁用 PostProcessStage，可以这样执行show和destroy，但是我觉得有点多此一举
  // postProcessStages默认就是开启状态，没必要用show事件手动开启
  // snowStage.enabled = false

  viewer.scene.postProcessStages.add(snowStage)

  return {
    // show: () => {
    //   snowStage.enabled = true
    // },
    destroy: () => {
      viewer.scene.postProcessStages.remove(snowStage)
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function snowFragmentShader(snowSize: number, snowSpeed: number): string {
    return `uniform sampler2D colorTexture;\n\
          in vec2 v_textureCoordinates;\n\
          uniform float snowSpeed;\n\
                  uniform float snowSize;\n\
          float snowFragmentShader(vec2 uv,float scale)\n\
          {\n\
              float time=czm_frameNumber/snowSpeed;\n\
              float w=smoothstep(1.,0.,-uv.y*(scale/10.));if(w<.1)return 0.;\n\
              uv+=time/scale;uv.y+=time*2./scale;uv.x+=sin(uv.y+time*.5)/scale;\n\
              uv*=scale;vec2 s=floor(uv),f=fract(uv),p;float k=3.,d;\n\
              p=.5+.35*sin(11.*fract(sin((s+p+scale)*mat2(7,3,6,5))*5.))-f;d=length(p);k=min(d,k);\n\
              k=smoothstep(0.,k,sin(f.x+f.y)*snowSize);\n\
              return k*w;\n\
          }\n\
          out vec4 fragColor;\n\
          void main(void){\n\
              vec2 resolution=czm_viewport.zw;\n\
              vec2 uv=(gl_FragCoord.xy*2.-resolution.xy)/min(resolution.x,resolution.y);\n\
              vec3 finalColor=vec3(0);\n\
              //float c=smoothstep(1.,0.3,clamp(uv.y*.3+.8,0.,.75));\n\
              float c=0.;\n\
              c+=snowFragmentShader(uv,30.)*.0;\n\
              c+=snowFragmentShader(uv,20.)*.0;\n\
              c+=snowFragmentShader(uv,15.)*.0;\n\
              c+=snowFragmentShader(uv,10.);\n\
              c+=snowFragmentShader(uv,8.);\n\
              c+=snowFragmentShader(uv,6.);\n\
              c+=snowFragmentShader(uv,5.);\n\
              finalColor=(vec3(c));\n\
              fragColor=mix(texture(colorTexture,v_textureCoordinates),vec4(finalColor,1),.5);\n\
              }\n\
              `
  }
}
