import Server from './server.js'

export default {
  postJi (params) {
    return Server.post('/customs/container/ocr/uploadImgRecogContainer', params)
  },
  postFeng (params) {
    return Server.post('/customs/container/ocr/uploadImgSealRecog', params)
  }
}
