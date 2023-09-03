import { request } from "./axios"

export const getInfo = async (uId, data = {}) => {

  return await request({ url: `/user/getInfo/${uId}`, method: "GET", data })
}

export const login = async (data = {}) => {
  console.log('data', data)
  return await request({ url: `/user/login`, method: "POST", data })
}

export const zhuce = async (data = {}) => {
  console.log('data', data)
  return await request({ url: `/user/register`, method: "POST", data })
}