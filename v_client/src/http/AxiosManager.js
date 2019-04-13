import BaseModule from './BaseModule'

class AxiosManager extends BaseModule {
  constructor() {
    super()
  }
  getAxiosPageableList ({url, page = 0, size = 20}) { // 分页
    return this.get(`${url}?page=${page}&size=${size}`)
  }
  getAxiosFullList ({url}) { // 查询所有
    return this.get(`${url}/all`)
  }

  getAxios ({url, id}) { // 通过id查询
    if (!id) {
      return Promise.reject(new Error(`getAxios：id(${id})无效`))
    }
    return this.get(`${url}/${id}`)
  }

  createAxios ({url, data = {}}) { // 创建
    if (!data || !Object.keys(data).length) {
      return Promise.reject(new Error('createAxios：提交的数据无效'))
    }
    return this.post(`${url}`, data)
  }

  updateAxios ({url, id, update = {}}) { // 修改
    if (!update || !Object.keys(update).length) {
      return Promise.reject(new Error('updateAxios：提交的数据无效'))
    }
    return this.put(`${url}/${id}`, update)
  }

  deleteAxios ({url, id}) { // 删除
    if (!id) {
      return Promise.reject(new Error(`deleteAxios：id(${id})无效`))
    }
    return this.delete(`${url}/${id}`)
  }
}

export default new AxiosManager()


// 调用实例
// import userManager from '../http/AxiosManager'
// userManager.getAxiosPageableList({url: '/api/test', page: this.currentPage, size: this.currentPageSize})
//       .then(response => {       
//             this.userList = response.data      
//        }).catch(err => {        
//          console.error(err.message)     
//        })

// 或者
// try {
//         const {data} = await userManager.deleteAxios({url: '/api/test', id: 1});
//       } catch (err) {
//         console.log(err);
//       }