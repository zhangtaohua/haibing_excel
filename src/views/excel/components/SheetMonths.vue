<template>
  <div class="row_nw_fs_fs sheet_container">
    <div
      v-for="data in monthsData"
      :key="data"
      class="row_nw_center_center sheet_tbox"
      :class="{ sheet_tbox_act: currentMonth == data }"
    >
      <span
        class="row_nw_fs_fs sheet_title"
        :class="{ sheet_title_act: currentMonth == data }"
        @click="changeMonthHandle(data)"
        >{{ data }}</span
      >
    </div>

    <div class="row_nw_fs_fs sheet_ybox">
      <el-select v-model="year" style="width: 100%" @change="yearHandle">
        <el-option v-for="item in yearsOpt" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useTimeRangeStore } from "@/store/authTimeRangeStore";
import dayjs from "dayjs";
import isLeapYear from "dayjs/plugin/isLeapYear";
dayjs.extend(isLeapYear);

const { setTimeRange } = useTimeRangeStore();
const leapYearMonth = [0, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const normalYearMonth = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const monthsName = [
  "空",
  "一月",
  "二月",
  "三月",
  "四月",
  "五月",
  "六月",
  "七月",
  "八月",
  "九月",
  "十月",
  "十一月",
  "十二月",
];

const yearsOpt = [
  { label: "2024年", value: 2024 },
  { label: "2025年", value: 2025 },
  { label: "2026年", value: 2026 },
  { label: "2027年", value: 2027 },
  { label: "2028年", value: 2028 },
  { label: "2029年", value: 2029 },
  { label: "2030年", value: 2030 },
];

const monthsData = ref([]);
const currentMonth = ref("");
const emit = defineEmits(["change"]);
const todayTime = dayjs();
const year = ref(todayTime.year());
let month = todayTime.month() + 1;

const monthsRange = {};

function calcMonthDataHandle(year, month) {
  const newDataTime = todayTime.year(year);
  const isLeap = newDataTime.isLeapYear();
  const dataTemp = [];
  for (let i = 1; i <= 12; i++) {
    let keyname = `${year}年 ${monthsName[i]}`;
    let month = ("" + i).padStart(2, "0");
    let dayend = isLeap ? leapYearMonth[i] : normalYearMonth[i];

    let startTime = `${year}-${month}-01 00:00:00`;
    let endTime = `${year}-${month}-${dayend} 23:59:59`;
    const table = `order${year}`;
    dataTemp.push(keyname);
    monthsRange[keyname] = [startTime, endTime, table];
  }
  monthsData.value = dataTemp;

  changeMonthHandle(`${year}年 ${monthsName[month]}`);
  // console.log("year", year, isLeap, monthsRange);
}
calcMonthDataHandle(year.value, month);

function changeMonthHandle(data: string) {
  console.log("changeMonthHandle", data, monthsRange[data]);
  currentMonth.value = data;
  setTimeRange(monthsRange[data][0], monthsRange[data][1], monthsRange[data][2]);
  emit("change", monthsRange[data]);
}

function yearHandle() {
  calcMonthDataHandle(year.value, month);
}
</script>

<style scoped>
.sheet_container {
  width: 100%;
  height: 100%;
  background: var(--c-255-255-255-100);
  border: 1px solid var(--c-048-049-051-100);
  border-radius: 0.125rem;
}

.sheet_tbox {
  width: auto;
  height: 100%;
  border-right: 1px solid var(--c-048-049-051-100);
  background: var(--c-243-243-243-100);
  flex-grow: 1;
}

.sheet_tbox:last-child {
  border-right: none;
}

.sheet_tbox_act {
  background: var(--c-255-255-255-100);
}

.sheet_title {
  width: max-content;
  height: 100%;
  color: var(--c-048-049-051-100);
  padding: 0.5rem;
  font-weight: bolder;
  font-size: var(--fsr-14px);
  font-family: "Source Han Sans SC VF", "Source Han Sans SC VF";
  cursor: pointer;
}

.sheet_title_act {
  color: var(--c-064-158-255-100);
}

.sheet_ybox {
  width: 6rem;
  height: 100%;
  flex-shrink: 0;
  flex-grow: 1;
}
</style>
