import request from "@/render/service/axios"; // 引入自定义的 axios 请求封装
import type { Login,GetVerificationCode } from "./types"; // 引入类型定义

// 登录请求
export const login = (data: Login.Request) =>
  request.post<Login.Response>("/userLogin/login", data);

export const getVerificationCode=(data:GetVerificationCode.Request)=>
  request.get<GetVerificationCode.Response>("/userLogin/getVerificationCode",data);
  
