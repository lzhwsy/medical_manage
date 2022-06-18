import axios from 'axios'

export function request(config) {
  const instance = axios.create({
    baseURL: "http://172.18.1.114:5000",
    timeout: 5000
  })
  instance.interceptors.request.use(config => {
    //添加Token验证Authorization字段
    config.headers.Authorization = window.sessionStorage.getItem('token')
    console.log(config)
    return config
  }, err => {
    console.log(err)
  });

  instance.interceptors.response.use(res => {
    console.log(res)
    return res.data
  }, err => {
    console.log(err)
  });

  return instance(config)
}
