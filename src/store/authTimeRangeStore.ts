import { defineStore } from "pinia";
import { reactive } from "vue";

// 这个商品 相关参数

export const useTimeRangeStore = defineStore("authTimeRangeStore", () => {
  const timeRangeStore = reactive({
    begin: "",
    end: "",
    table: "",
  });

  function setTimeRange(begin: string, end: string, table: string) {
    timeRangeStore.begin = begin;
    timeRangeStore.end = end;
    timeRangeStore.table = table;
  }

  return {
    timeRangeStore,
    setTimeRange,
  };
});
