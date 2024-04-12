<template>
  <div class="row_nw_fs_center avatar_container">
    <div class="row_nw_center_center avatar_box" @mouseenter="showInfoHandle(true)">
      <div class="row_nw_center_center avatar_img">
        <img class="avatar_img_show" src="@/assets/images/header/avatar.png" />
      </div>
    </div>

    <div
      v-if="isShowPanel"
      class="col_nw_fs_center user_box"
      @mouseenter="clearHiddenTimerHandle"
      @mouseleave="showInfoHandle(false)"
    >
      <div class="row_nw_center_center user_info_name">{{ userInfo.name }}</div>
      <div class="row_nw_center_center user_info_lgap"></div>
      <div class="row_nw_center_center user_info_id">
        <span class="row_nw_fs_center user_info_idlabel">账号ID:&nbsp;</span>
        <span class="row_nw_fs_center user_info_idvalue">{{ userInfo.id }}</span>
      </div>
      <div v-if="isAdmin" class="row_nw_center_center user_info_item" @click="setRegisterUser(true)">
        <img class="row_nw_center_center user_info_item_show" src="@/assets/images/header/user.svg" />
        <span class="row_nw_fs_center user_info_item_title">注册员工</span>
      </div>
      <div class="row_nw_center_center user_info_item" @click="gotoPathHandle('excel')">
        <img class="row_nw_center_center user_info_item_show" src="@/assets/images/header/project.svg" />
        <span class="row_nw_fs_center user_info_item_title">我的工作</span>
      </div>
      <div class="row_nw_center_center user_info_item">
        <img class="row_nw_center_center user_info_item_show" src="@/assets/images/header/quit.svg" />
        <span class="row_nw_fs_center user_info_item_title" @click="logoutHandle">退出登录</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

import { useAuthUserStore } from "@/store/authUserStore";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();

const { authUserStore, setAuthToken, setRegisterUser } = useAuthUserStore();

const isShowPanel = ref(false);

const userInfo = computed(() => {
  if (authUserStore.user) {
    return {
      ...authUserStore.user,
    };
  } else {
    return {
      name: "",
      id: "",
    };
  }
});

const isAdmin = computed(() => {
  if (authUserStore.user && authUserStore.user.id) {
    const id = authUserStore.user.id;
    if (id == "1" || id == "2") {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
});

let hiddenTimer = null;

function gotoPathHandle(name) {
  router.replace({ name: name });
}

function showInfoHandle(isShow: boolean) {
  isShowPanel.value = isShow;
  if (isShow) {
    clearHiddenTimerHandle();
    hiddenTimer = setTimeout(() => {
      isShowPanel.value = false;
    }, 1500);
  }
}

function clearHiddenTimerHandle() {
  if (hiddenTimer) {
    clearTimeout(hiddenTimer);
  }
}

function logoutHandle() {
  router.replace("home");
  setAuthToken("");
}
</script>

<style scoped lang="scss">
.avatar_container {
  position: relative;
  width: auto;
  height: 100%;
  background-color: transparent;
}

.avatar_box {
  width: 2rem;
  height: 2rem;
  background-color: transparent;
  cursor: pointer;
}

.avatar_img {
  width: 2rem;
  height: 2rem;
}

.avatar_img_show {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

.user_box {
  position: fixed;
  top: 3.25rem;
  right: 0;
  z-index: 999998;
  width: 11rem;
  height: auto;
  padding: 0.875rem 0;
  background: var(--c-054-060-069-100);
  border-radius: 0.125rem;
}

.user_info_name {
  width: 100%;
  height: 2rem;
  margin-bottom: 0.25rem;
  color: var(--c-064-158-255-100);
  font-weight: 600;
  font-size: var(--fsr-14px);
  font-family: "Source Han Sans SC VF", "Source Han Sans SC VF";
}

.user_info_lgap {
  width: 90%;
  height: auto;
  margin-bottom: 0.5rem;
  border-bottom: 1px solid var(--c-065-072-083-100);
}

.user_info_box {
  width: 100%;
  height: auto;
}

.user_info_id {
  width: 100%;
  height: 2rem;
  cursor: default;
}

.user_info_idlabel {
  width: max-content;
  height: 100%;
  color: var(--c-232-234-237-100);
  font-size: var(--fsr-14px);
  font-family: "Source Han Sans SC VF", "Source Han Sans SC VF";
}

.user_info_idvalue {
  width: max-content;
  height: 100%;
  color: var(--c-232-234-237-100);
  font-size: var(--fsr-14px);
  font-family: "Source Han Sans SC VF", "Source Han Sans SC VF";
}

.user_info_item {
  width: 100%;
  height: 2rem;
  cursor: pointer;
}

.user_info_item:last-child {
  margin-bottom: 0;
}

.user_info_item_show {
  width: 0.875rem;
  height: 0.875rem;
  margin-right: 0.625rem;
}

.user_info_item:hover {
  background: var(--c-038-042-049-100);
}

.user_info_item:hover .user_info_item_show {
  transform: translate(-2000vw);
  filter: drop-shadow(2000vw 0 0 var(--c-064-158-255-100));
}

.user_info_item_title {
  width: max-content;
  height: 100%;
  color: var(--c-232-234-237-100);
  font-size: var(--fsr-14px);
  font-family: "Source Han Sans SC VF", "Source Han Sans SC VF";
}

.user_info_item:hover .user_info_item_title {
  color: var(--c-064-158-255-100);
}
</style>
