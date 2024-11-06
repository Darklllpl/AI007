import request from "@/render/service/axios";
import type { Login } from "./types";
export const login = (data: Login.Request) =>
  request.post<Login.Response>("/login", { data });
