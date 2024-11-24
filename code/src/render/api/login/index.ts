import request from "@/render/service/axios"; 
import type { Login,GetVerificationCode,TestVerificationCode,Cancel } from "./types"; 

// 登录
export const login = (data: Login.Request) => 
  request.post<Login.Response>("https://api.eliya.fun/userLogin/login", {data},{"Content-Type":"multipart/form-data"});

// 通过手机号获取验证码
export const getVerificationCode = (data: GetVerificationCode.Request) => 
  request.get<GetVerificationCode.Response>("/userLogin/getVerificationCode", { params: data });

// 验证码校验
export const testVerificationCode = (data: TestVerificationCode.Request) => 
  request.get<TestVerificationCode.Response>("/user/testVerificationCode", { params: data });

// 用户注销
export const cancel = () => 
  request.get<Cancel.Response>("/user/cancel");
