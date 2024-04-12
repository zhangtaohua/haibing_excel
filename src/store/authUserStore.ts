import { defineStore } from "pinia";
import { reactive } from "vue";
import storage from "@/utils/storage/storage";
import globalVar from "@/utils/global/global";

// 这个商品 相关参数

export const useAuthUserStore = defineStore("authUserStore", () => {
  const authUserStore = reactive({
    token: "",
    hasLogin: false,
    user: null,
    isRegister: 0,
  });

  function setAuthToken(token = "") {
    authUserStore.token = token;

    if (token) {
      authUserStore.hasLogin = true;
      storage.set("userToken", token);
    } else {
      authUserStore.hasLogin = false;
      storage.remove("userToken");
      authUserStore.user = null;
    }
  }

  function setAuthUser(user: any) {
    authUserStore.user = user;
  }

  function setRegisterUser(isReg: boolean) {
    if (isReg) {
      authUserStore.isRegister++;
    } else {
      authUserStore.isRegister = 0;
    }
  }

  const loginout = () => {
    setAuthToken("");
  };

  globalVar.loginOutFunc = loginout;

  return {
    authUserStore,
    setAuthToken,
    setAuthUser,
    setRegisterUser,
  };
});
