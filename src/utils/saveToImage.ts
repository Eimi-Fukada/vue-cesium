import * as Cesium from 'cesium'
/**
 * @description: 场景导出成图片
 * @param {*} _viewer
 * @return {*}
 */
export function saveToImage(_viewer: Cesium.Viewer) {
  _viewer.render()

  const canvas = _viewer.scene.canvas
  const image = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream')
  const timestamp = new Date().getTime()

  const link = document.createElement('a')
  const blob = dataURLtoBlob(image)
  const objurl = URL.createObjectURL(blob)
  link.download = `scene-${timestamp}.png`
  link.href = objurl
  link.click()
}

function dataURLtoBlob(dataURL: string): Blob {
  const byteString = atob(dataURL.split(',')[1])
  const arrayBuffer = new ArrayBuffer(byteString.length)
  const uint8Array = new Uint8Array(arrayBuffer)

  for (let i = 0; i < byteString.length; i++) {
    uint8Array[i] = byteString.charCodeAt(i)
  }

  return new Blob([uint8Array], { type: 'image/png' })
}
