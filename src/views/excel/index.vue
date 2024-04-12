<template>
  <div class="row_nw_center_center excel_container">
    <div class="col_nw_sb_center excel_wraper">
      <div class="row_nw_fs_center excel_up">
        <ExcelTables />
      </div>
      <div class="row_nw_fs_center excel_down">
        <SheetMonths />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import ExcelTables from "./components/ExcelTables.vue";
import SheetMonths from "./components/SheetMonths.vue";
</script>

<style scoped>
.excel_container {
  position: fixed;
  top: 3rem;
  left: 0;
  z-index: 10;
  width: 100vw;
  height: calc(100vh - 3rem);
  background: var(--c-255-255-255-100);
}

.excel_wraper {
  width: calc(100% - 2rem);
  height: 100%;
}

.excel_up {
  width: 100%;
  height: calc(100% - 4rem);
}

.excel_down {
  width: 100%;
  height: 3rem;
}
</style>
