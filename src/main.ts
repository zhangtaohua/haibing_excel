import { createApp } from "vue";
import { createPinia } from "pinia";

import ElementPlus from "element-plus";
import zhCn from "element-plus/dist/locale/zh-cn.mjs";

import "element-plus/dist/index.css";
import "@/assets/style/font.scss";
import "@/assets/style/normalize.css";
import "@/assets/style/base.scss";
import "@/assets/style/flex.scss";
import "@/assets/style/general.scss";
import "@/assets/style/size.scss";
import "@/assets/style/mpgap.scss";
import "@/assets/style/olCustom.scss";
import App from "./App.vue";
import router from "@/router/index";

const pinia = createPinia();

createApp(App)
  .use(router)
  .use(pinia)
  .use(ElementPlus, {
    locale: zhCn,
  })
  .mount("#app");
