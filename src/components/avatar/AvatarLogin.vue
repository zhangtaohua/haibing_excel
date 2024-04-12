<template>
  <div class="row_nw_fs_center avatar_container">
    <div class="row_nw_center_center avatar_box" @click="showLoginHandle(true)">
      <div class="row_nw_center_center avatar_img">
        <img class="avatar_img_show" src="@/assets/images/header/login.svg" />
      </div>
      <div class="col_nw_center_center avatar_tip_box">
        <div class="col_nw_fs_fs avatar_tip_title">请登录</div>
      </div>
    </div>

    <div v-if="isShowPanel" class="col_nw_fs_fs login_wrapper">
      <div class="login_mask" @click="showLoginHandle(false)"></div>
      <div class="login_box">
        <div class="login_rbg"></div>
        <div class="row_nw_center_center login_inbox">
          <div class="col_nw_fs_center login_left">
            <div class="row_nw_center_center login_logo">
              <!-- <img class="login_logo_show" src="@/assets/images/header/logo2.svg" /> -->
            </div>

            <h1 class="row_nw_center_center login_title">测试EXCEL</h1>
            <h2 class="row_nw_center_center login_en_title"> HB Data Center System </h2>
          </div>

          <!-- 登录界面 -->
          <div v-if="isLogin" class="row_nw_center_center login_left">
            <div v-if="isUsePhone" class="col_nw_fs_center wh_100p_100p">
              <div class="row_nw_center_center login_rtitle">登录</div>
              <div class="row_nw_center_center login_phone_box">
                <input
                  v-model="loginParas.phone"
                  class="row_nw_fs_center login_phone_in"
                  type="text"
                  maxlength="11"
                  placeholder="请输入手机号"
                />
                <img v-if="loginParas.phone" class="login_ps_clear" src="@/assets/images/header/clear.svg" />
              </div>
              <div v-if="loginParas.isPhoneError" class="row_nw_fs_center login_rerror">请输入正确手机号</div>

              <div class="row_nw_fs_center login_code_box">
                <input
                  v-model="loginParas.vcode"
                  class="row_nw_fs_center login_code_in"
                  type="text"
                  placeholder="请输入验证码"
                />
                <div class="row_nw_center_center login_code_get">{{
                  loginParas.isGetCode ? countdown + "s" : "获取验证码"
                }}</div>
                <img v-if="loginParas.vcode" class="login_vcode_clear" src="@/assets/images/header/clear.svg" />
              </div>
              <div class="row_nw_fs_center login_rerror">请输入验证码</div>

              <div class="row_nw_center_center login_action_box">
                <el-button type="primary" class="login_action_title">登录</el-button>
              </div>

              <div class="row_nw_fs_center login_c_box">
                <div class="row_nw_fs_center login_c_type" @click="changLogoTypeHandle(false)">账号密码登录</div>
                <div class="row_nw_fs_center login_c_type" @click="changRegisterHandle(true)">注册</div>
              </div>
            </div>
            <!-- user password -->
            <div v-else class="col_nw_fs_center wh_100p_100p">
              <div class="row_nw_center_center login_rtitle">登录</div>

              <div class="row_nw_center_center login_phone_box">
                <input
                  v-model="loginParas.userName"
                  class="row_nw_fs_center login_phone_in"
                  type="text"
                  placeholder="用户名"
                  maxlength="64"
                  @input="() => (loginParas.isPasswordError = false)"
                />
                <img
                  v-if="loginParas.userName"
                  class="login_ps_clear"
                  src="@/assets/images/header/clear.svg"
                  @click="() => (loginParas.userName = '')"
                />
              </div>
              <!-- <div class="row_nw_fs_center login_rerror">请输入用户名</div> -->

              <div class="row_nw_center_center login_code_box">
                <input
                  v-model="loginParas.password"
                  class="row_nw_fs_center login_phone_in"
                  type="password"
                  placeholder="密码"
                  @input="() => (loginParas.isPasswordError = false)"
                />
                <img
                  v-if="loginParas.password"
                  class="login_ps_clear"
                  src="@/assets/images/header/clear.svg"
                  @click="() => (loginParas.password = '')"
                />
              </div>
              <div v-show="loginParas.isPasswordError" class="row_nw_fs_center login_rerror">
                请输入正确用户名和密码
              </div>

              <div class="row_nw_center_center login_action_box">
                <el-button type="primary" class="login_action_title" :disabled="!isCanUserPwLogin" @click="loginHandle">
                  登录
                </el-button>
              </div>

              <div class="row_nw_fe_center login_c_box">
                <!-- <div class="row_nw_fs_center login_c_type" @click="changLogoTypeHandle(true)">手机验证码登录 </div> -->
                <!-- <div class="row_nw_fs_center login_c_type" @click="changRegisterHandle(false)">注册</div> -->
              </div>
            </div>
          </div>
          <!-- 注册界面 -->
          <div v-else class="row_nw_center_center login_left">
            <div class="col_nw_fs_center wh_100p_100p">
              <div class="row_nw_center_center reg_rtitle">注册</div>

              <div class="row_nw_center_center reg_phone_box">
                <el-input
                  v-model="loginParas.phone"
                  type="tel"
                  style="height: 100%"
                  placeholder="手机号"
                  :maxlength="11"
                  clearable
                  @change="checkPhoneHandle"
                />
              </div>
              <div v-if="loginParas.isPhoneError" class="row_nw_fs_center login_rerror">请输入正确的手机号</div>

              <div class="row_nw_center_center reg_phone_box">
                <el-input
                  v-model="loginParas.email"
                  style="height: 100%"
                  type="email"
                  placeholder="电子邮箱"
                  clearable
                  @change="checkEmailHandle"
                />
              </div>
              <div v-if="loginParas.isEmailError" class="row_nw_fs_center login_rerror">请输入正确的E-MAIL</div>

              <div class="row_nw_center_center reg_phone_box">
                <el-input
                  v-model="loginParas.userName"
                  style="height: 100%"
                  placeholder="唯一用户名，可用于登录"
                  clearable
                />
              </div>

              <div class="row_nw_center_center reg_phone_box">
                <el-input v-model="loginParas.nickName" style="height: 100%" placeholder="用户姓名" clearable />
              </div>

              <div class="row_nw_center_center reg_phone_box">
                <el-input
                  v-model="loginParas.password"
                  style="height: 100%"
                  type="password"
                  placeholder="密码"
                  show-password
                  clearable
                  @change="checkDbPasswordHandle"
                />
              </div>

              <div class="row_nw_center_center reg_phone_box">
                <el-input
                  v-model="loginParas.confirmPassword"
                  style="height: 100%"
                  type="password"
                  placeholder="确认密码"
                  show-password
                  clearable
                  @change="checkDbPasswordHandle"
                />
              </div>
              <div v-if="loginParas.isPasswordError" class="row_nw_fs_center login_rerror">两次密码不一致</div>

              <div class="row_nw_center_center login_action_box">
                <el-button type="primary" class="login_action_title" :disabled="!isCanReg" @click="reghandle">
                  注册
                </el-button>
              </div>

              <div class="row_nw_fe_center login_c_box">
                <div class="row_nw_fs_center login_c_type" @click="changRegisterHandle(true)">登录</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch } from "vue";
import { loginRequest, getCurrentRequest, registerRequest } from "@/api/user.ts";
import { useAuthUserStore } from "@/store/authUserStore";

import { useRoute, useRouter } from "vue-router";

import { ElMessage } from "element-plus";
import { ROOT_TREE_INJECTION_KEY } from "element-plus/es/components/tree-v2/src/virtual-tree.mjs";

const { authUserStore, setAuthToken, setAuthUser, setRegisterUser } = useAuthUserStore();

const route = useRoute();
const router = useRouter();

const isShowPanel = ref(false);
const isUsePhone = ref(false);
const isLogin = ref(true);

const countdown = ref(60);

const loginParas = reactive({
  userName: "",
  isUserNameError: false,
  phone: "",
  isPhoneError: false,
  email: "",
  isEmailError: false,
  password: "",
  confirmPassword: "",
  isPasswordError: false,
  vcode: "",
  isCodeError: false,
  isGetCode: false,
  nickName: "",
});

const isCanUserPwLogin = computed(() => {
  if (loginParas.userName && loginParas.password && !loginParas.isUserNameError && !loginParas.isPasswordError) {
    return true;
  } else {
    return false;
  }
});

const isCanReg = computed(() => {
  if (
    loginParas.userName &&
    !loginParas.isUserNameError &&
    loginParas.phone &&
    !loginParas.isPhoneError &&
    loginParas.email &&
    !loginParas.isEmailError &&
    loginParas.password &&
    loginParas.confirmPassword &&
    !loginParas.isPasswordError &&
    loginParas.nickName
  ) {
    return true;
  } else {
    return false;
  }
});

watch(
  () => authUserStore.isRegister,
  () => {
    if (authUserStore.isRegister) {
      showLoginHandle(true);
      changRegisterHandle(false);
    }
  },
  {
    immediate: true,
    deep: true,
  },
);

function checkPhoneHandle() {
  if (loginParas.phone.length == 11) {
    const phoneRegex = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
    if (phoneRegex.test(loginParas.phone)) {
      loginParas.isPhoneError = false;
    } else {
      loginParas.isPhoneError = true;
    }
  } else {
    loginParas.isPhoneError = false;
  }
}

function checkEmailHandle() {
  if (loginParas.email.length >= 3) {
    const emailRegex = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
    if (emailRegex.test(loginParas.email)) {
      loginParas.isEmailError = false;
    } else {
      loginParas.isEmailError = true;
    }
  } else {
    loginParas.isEmailError = false;
  }
}

function checkDbPasswordHandle() {
  if (loginParas.password.length && loginParas.confirmPassword.length) {
    if (loginParas.password == loginParas.confirmPassword) {
      loginParas.isPasswordError = false;
    } else {
      loginParas.isPasswordError = true;
    }
  } else {
    loginParas.isPasswordError = false;
  }
}

function showLoginHandle(isShow: boolean) {
  isShowPanel.value = isShow;
  if (!isShow) {
    setRegisterUser(false);
  }
}

function changLogoTypeHandle(isShow: boolean) {
  isUsePhone.value = isShow;
}

function changRegisterHandle(isShow: boolean) {
  isLogin.value = isShow;
}

function loginHandle() {
  if (isCanUserPwLogin.value) {
    const data = {
      login_id: loginParas.userName,
      password: loginParas.password,
      captcha_id: "captcha_skip_test",
      captcha_answer: "123456",
    };
    loginRequest(data)
      .then((res) => {
        // console.log("login ok", res);
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
          loginParas.isPasswordError = true;
          setAuthToken("");
        }
      })
      .catch((err) => {
        console.log("login err", err);
        loginParas.isPasswordError = true;
        setAuthToken("");
      });
  }
}

function reghandle() {
  if (isCanReg.value) {
    const data = {
      name: loginParas.userName,
      password: loginParas.password,
      password_confirm: loginParas.confirmPassword,
      phone: loginParas.phone,
      email: loginParas.email,
      nick_name: loginParas.nickName,
    };

    registerRequest(data)
      .then((res) => {
        console.log("registerRequest", res);
        changRegisterHandle(true);
        showLoginHandle(false);
        ElMessage({
          type: "success",
          showClose: true,
          offset: 64,
          message: "增加用户成功",
        });
      })
      .catch((err) => {
        console.log("registerRequest", err);
        ElMessage({
          type: "error",
          showClose: true,
          offset: 64,
          message: "增加用户失败",
        });
        ElMessage({
          type: "error",
          showClose: true,
          offset: 64,
          message: err.response.data.message,
        });
      });
  }
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
  width: 1.625rem;
  height: 1.625rem;
  background-color: transparent;
  cursor: pointer;
}

.avatar_img {
  width: 1.625rem;
  height: 1.625rem;
}

.avatar_img_show {
  width: 100%;
  height: 100%;
}

.avatar_tip_box {
  display: none;
}

.avatar_box:hover {
  .avatar_tip_box {
    position: absolute;
    top: 3.25rem;
    z-index: 999999;
    display: flex;
    width: max-content;
    height: 1.5rem;
    padding: 0.25rem 0.5rem;
    color: var(--c-255-255-255-100);
    font-size: var(--fsr-12px);
    background: var(--c-000-000-000-100);
    border-radius: 0.125rem;
  }
}

.login_wrapper {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999999;
  width: 100vw;
  height: 100vh;
  background: transform;
}

.login_mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: var(--c-026-030-039-040);
}

.login_box {
  position: relative;
  top: 50%;
  left: 50%;
  z-index: 999999;
  width: 75rem;
  height: 37.5rem;
  background-color: var(--c-255-255-255-100);
  border-radius: 1.875rem;
  transform: translate(-50%, -50%);
}

.login_rbg {
  position: absolute;
  top: 0;
  right: 0;
  width: 50%;
  height: 100%;
  background-color: var(--c-241-241-241-100);
  border-radius: 0 1.875rem 1.875rem 0;
}

.login_inbox {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("@/assets/images/header/loginBg.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100% 100%;
}

.login_left {
  width: 50%;
  height: 100%;
}

.login_logo {
  width: 11.125rem;
  height: 4rem;
  margin-top: 4.375rem;
}

.login_logo_show {
  width: 100%;
  height: auto;
}

.login_title {
  width: 100%;
  height: 4rem;
  margin-top: 6.625rem;
  color: var(--c-034-056-081-100);
  font-weight: 600;
  font-size: 2.75rem;
  font-family: "Source Han Sans SC VF", "Source Han Sans SC VF";
  text-shadow: 0.1875rem 0.1875rem 0.375rem var(--c-034-056-081-044);
}

.login_en_title {
  width: 100%;
  height: 2.625rem;
  margin-top: 0.375rem;
  color: var(--c-034-056-081-044);
  font-weight: 600;
  font-size: 1.875rem;
  font-family: "Source Han Sans SC VF", "Source Han Sans SC VF";
}

.login_rtitle {
  width: 100%;
  height: 2.25rem;
  margin-top: 6.625rem;
  color: var(--c-034-056-081-100);
  font-size: 1.5rem;
  font-family: "Source Han Sans SC VF", "Source Han Sans SC VF";
}

.login_phone_box {
  position: relative;
  width: 25rem;
  height: 2.5rem;
  margin-top: 3.125rem;
}

.login_phone_in {
  width: 25rem;
  height: 2.5rem;
  padding: 0 0.75rem;
  color: var(--c-034-056-081-100);
  font-size: var(--fsr-14px);
  font-family: "Source Han Sans SC VF", "Source Han Sans SC VF";
  background-color: var(--c-255-255-255-100);
  border: 1px solid var(--c-220-223-230-100);
  border-radius: 0.125rem;
  outline: none;
}

.login_phone_in:focus {
  border: none;
  box-shadow: 0 0 0 1px var(--c-064-158-255-100) inset;
}

.login_phone_in::placeholder {
  display: flex;
  flex-direction: row;
  padding: 0;
  color: var(--c-074-074-074-100);
  font-size: var(--fsr-14px);
  place-items: center flex-start;
}

.login_ps_clear {
  position: absolute;
  top: 0.8125rem;
  right: 0.75rem;
  width: 0.875rem;
  height: 0.875rem;
  cursor: pointer;
}

.login_rerror {
  width: 25rem;
  height: 1.125rem;
  margin-top: 0.375rem;
  color: var(--c-241-051-013-100);
  font-size: var(--fsr-12px);
  font-family: "Source Han Sans SC VF", "Source Han Sans SC VF";
  opacity: 1;
}

.login_rerror_show {
  opacity: 1;
}

.login_code_box {
  position: relative;
  width: 25rem;
  height: 2.5rem;
  margin-top: 2.25rem;
}

.login_code_in {
  width: 16.875rem;
  height: 2.5rem;
  padding: 0 0.75rem;
  color: var(--c-034-056-081-100);
  font-size: var(--fsr-14px);
  font-family: "Source Han Sans SC VF", "Source Han Sans SC VF";
  background-color: var(--c-255-255-255-100);
  border: 1px solid var(--c-220-223-230-100);
  border-radius: 0.125rem;
  outline: none;
}

.login_code_in::placeholder {
  display: flex;
  flex-direction: row;
  padding: 0;
  color: var(--c-074-074-074-100);
  font-size: var(--fsr-14px);
  place-items: center flex-start;
}

.login_vcode_clear {
  position: absolute;
  top: 0.8125rem;
  right: 8.75rem;
  width: 0.875rem;
  height: 0.875rem;
  cursor: pointer;
}

.login_code_get {
  width: 8rem;
  height: 2.375rem;
  color: var(--c-255-255-255-100);
  background: var(--c-180-201-225-100);
  border: 1px solid var(--c-180-201-225-100);
  border-radius: 0 2px 2px 0;
  cursor: pointer;
}

.login_code_get_dis {
  color: var(--c-232-234-237-100);
  background: var(--c-148-165-173-100);
  cursor: not-allowed;
}

.login_action_box {
  width: 25rem;
  height: 2.875rem;
  margin-top: 2.25rem;
}

.login_action_title {
  width: 100%;
  height: 100%;
}

.login_c_box {
  width: 25rem;
  height: 1.25rem;
  margin-top: 1.125rem;
}

.login_c_type {
  width: max-content;
  height: 100%;
  color: var(--c-034-056-081-100);
  font-weight: 400;
  font-size: var(--fsr-14px);
  font-family: "Source Han Sans SC VF", "Source Han Sans SC VF";
  cursor: pointer;
}

.reg_rtitle {
  width: 100%;
  height: 2.25rem;
  margin-top: 3rem;
  color: var(--c-034-056-081-100);
  font-size: 1.5rem;
  font-family: "Source Han Sans SC VF", "Source Han Sans SC VF";
}

.reg_phone_box {
  width: 25rem;
  height: 2.5rem;
  margin-top: 1rem;
}
</style>
