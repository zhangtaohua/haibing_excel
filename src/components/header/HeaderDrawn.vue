<template>
  <div class="row_nw_sb_center header_container">
    <div class="row_nw_fs_center header_left_box">
      <div class="row_nw_center_certer header_logo_box">
        <!-- <img class="wh_100p_100p" src="@/assets/images/header/logo.svg" /> -->
        <div class="row_nw_fs_center header_logo_title">测试EXCEL</div>
      </div>
    </div>

    <div class="row_nw_fe_center header_right_box">
      <Avatar v-if="authUserStore.hasLogin && !authUserStore.isRegister" />
      <AvatarLogin v-else />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch } from "vue";

import Avatar from "../avatar/Avatar.vue";
import AvatarLogin from "../avatar/AvatarLogin.vue";

import { useAuthUserStore } from "@/store/authUserStore";
import { refreshTokenRequest, getCurrentRequest } from "@/api/user.ts";

const { authUserStore, setAuthToken, setAuthUser } = useAuthUserStore();

import storage from "@/utils/storage/storage";

function checkIsLogin() {
  const token = storage.get("userToken");
  if (token) {
    // 检查 刷新 token
    refreshTokenRequest()
      .then((res) => {
        // console.log("refreshTokenRequest ok", res);
        if (res.token) {
          setAuthToken(res.token);
          setTimeout(() => {
            getCurrentRequest()
              .then((res) => {
                // console.log("getCurrentRequest ok", res);
                setAuthUser(res.data);
              })
              .catch((err) => {
                console.log("getCurrentRequest err", err);
                setAuthUser(null);
              });
          }, 250);
        } else {
          setAuthToken("");
        }
      })
      .catch((err) => {
        console.log("refreshTokenRequest err", err);
        setAuthToken("");
      });
  } else {
    setAuthToken("");
  }
}
checkIsLogin();
</script>

<style scoped>
.header_container {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999999;
  width: 100vw;
  height: 3rem;
  min-height: 48px;
  background-color: var(--c-026-030-039-100);
}

.header_left_box {
  width: auto;
  height: 100%;
}

.header_logo_box {
  width: auto;
  height: 100%;
  margin-left: 1.25rem;
}

.header_logo_title {
  width: max-content;
  height: 100%;
  color: var(--c-255-255-255-100);
  font-size: var(--fsr-20px);
  font-family: "Source Han Sans SC VF", "Source Han Sans SC VF";
}

.header_left_info_box {
  width: auto;
  height: 100%;
  margin-left: 5.625rem;
}

.header_right_box {
  width: auto;
  height: 100%;
  margin-right: 1.875rem;
}

.header_right_gap {
  width: 1.125rem;
  height: 100%;
}
</style>
