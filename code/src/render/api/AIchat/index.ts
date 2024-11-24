import request from "@/render/service/axios";
import type { Getchatstream,GetChatList } from "./types"; // 引入类型定义

const token="eyJhbGciOiJIUzUxMiJ9.eyJsb2dpbl91c2VyX2tleSI6IjViNjJlZjRjLTMzZGEtNDU1ZS1iMDU0LTM3ZTU1ZGI2NDQ0ZSJ9.xafO0T90--P6pMXa7q24ljW8OLIP_7NiBhbvqva_XhoHwaXwgZWVc3ZIn4GVc0Fb6JBMJ6_gNHGKlRQSYXfc6w";
// 设置请求头
const headers = {
  Authorization: `Bearer ${token}`, // 替换为你的 token
};

// 流式对话
export const getChatStream = async (data) => {
  const response = await fetch('https://api.eliya.fun/chat/completions/stream', {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(data),
  });

  return response; // 返回响应对象
};

// 消息列表
export const getChatList = () => 
    request.get<GetChatList.Response>("https://api.eliya.fun/chat/list");
