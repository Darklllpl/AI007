// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer } from "electron";

// 暴露 API 到渲染进程
contextBridge.exposeInMainWorld("electronAPI", {
  openExternal: (url: string) => ipcRenderer.send("open-external", url),
});
