// BaseModule.js
import axios from 'axios'
import qs from 'qs'

// 判断是否为生产环境(npm run build)
const proENV = process.env.NODE_ENV === 'production'

class BaseModule {
  constructor () {
    this.$http = axios.create({
      baseURL: proENV ? '' : 'http://localhost:3001'
    })
    this.dataMethodDefaults = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      transformRequest: [function (data) {
        return qs.stringify(data)
      }]
    }
  }

  get (url, config = {}) {
    return this.$http.get(url, config)
  }

  post (url, data = undefined, config = {}) {
    return this.$http.post(url, data, { ...this.dataMethodDefaults, ...config })
  }

  put (url, data = undefined, config = {}) {
    return this.$http.put(url, data, { ...this.dataMethodDefaults, ...config })
  }

  delete (url, config = {}) {
    return this.$http.delete(url, config)
  }
}

export default BaseModule

