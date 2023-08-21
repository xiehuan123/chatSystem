import {request} from "./axios"

export const getInfo=async (data)=>{

  return await request(data,{url:"/getInfo",method:"POST"})
}