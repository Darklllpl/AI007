/**
 * 脱离客户端 使用浏览器打开窗口
 */

// import { shell } from "electron";

export const useOpenByBrowser = () => {
  const openByBrowser = (url: string) => {
    window.electronAPI.openExternal(url);
  };
  return {
    openByBrowser,
  };
};
