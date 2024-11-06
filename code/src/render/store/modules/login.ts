// stores/app.ts
import { defineStore } from "pinia";

interface LoginState {
  loginSetting: {
    autoLogin: Boolean;
    rememberPassword: false;
  };
}
export const useLoginStore = defineStore("login", {
  state: (): LoginState => {
    return {
      loginSetting: {
        autoLogin: false,
        rememberPassword: false,
      },
    };
  },
  actions: {
    setLoginSetting(key: keyof LoginState["loginSetting"]) {
      const bol = this.loginSetting[key];
      this.loginSetting[key] = !bol;
      console.log(this.loginSetting);
    },
  },
});
