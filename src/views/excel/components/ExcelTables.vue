<template>
  <div class="col_nw_fs_fs extable_container">
    <el-table
      :data="tableData.data"
      style="width: 100%"
      height="100%"
      header-row-class-name="table_header"
      row-key="ROW"
      border
      stripe
      :row-class-name="tableRowClassNameHandle"
    >
      <el-table-column fixed prop="ROW" label="INDEX" width="80" />
      <el-table-column fixed prop="id" label="ID" width="200" />

      <el-table-column label="A">
        <el-table-column prop="A" label="商品名称" width="300">
          <template #default="scope">
            <div
              class="extable_cell"
              @mouseenter="cellEnterHandle('A', scope.row)"
              @mouseleave="cellEnterHandle('NOUSE', scope.row)"
            >
              <el-input
                v-if="tableData.EDIT == `A${scope.row.id}`"
                v-model="scope.row.A"
                @change="changeDataHandle('A', scope.row)"
              />
              <span v-else class="wh_100p_100p">{{ scope.row.A }}</span>
            </div>
          </template>
        </el-table-column>
      </el-table-column>

      <el-table-column label="B">
        <el-table-column prop="B" label="商品串号" width="300">
          <template #default="scope">
            <div
              class="extable_cell"
              @mouseenter="cellEnterHandle('B', scope.row)"
              @mouseleave="cellEnterHandle('NOUSE', scope.row)"
            >
              <el-input
                v-if="tableData.EDIT == `B${scope.row.id}`"
                v-model="scope.row.B"
                @change="changeDataHandle('B', scope.row)"
              />
              <span v-else class="wh_100p_100p">{{ scope.row.B }}</span>
            </div>
          </template>
        </el-table-column>
      </el-table-column>

      <el-table-column label="C">
        <el-table-column prop="C" label="商品类型" width="150">
          <template #default="scope">
            <div
              class="extable_cell"
              @mouseenter="cellEnterHandle('C', scope.row)"
              @mouseleave="cellEnterHandle('NOUSE', scope.row)"
            >
              <el-input
                v-if="tableData.EDIT == `C${scope.row.id}`"
                v-model="scope.row.C"
                @change="changeDataHandle('C', scope.row)"
              />
              <span v-else class="wh_100p_100p">{{ scope.row.C }}</span>
            </div>
          </template>
        </el-table-column>
      </el-table-column>

      <el-table-column label="D">
        <el-table-column prop="D" label="供应商" width="150">
          <template #default="scope">
            <div
              class="extable_cell"
              @mouseenter="cellEnterHandle('D', scope.row)"
              @mouseleave="cellEnterHandle('NOUSE', scope.row)"
            >
              <el-input
                v-if="tableData.EDIT == `D${scope.row.id}`"
                v-model="scope.row.D"
                @change="changeDataHandle('D', scope.row)"
              />
              <span v-else class="wh_100p_100p">{{ scope.row.D }}</span>
            </div>
          </template>
        </el-table-column>
      </el-table-column>

      <el-table-column label="E">
        <el-table-column
          prop="E"
          label="采购员"
          width="100"
          :filters="tableData.users"
          :filter-method="tableFilterUsersHandle"
        >
          <template #default="scope">
            <div class="extable_cell" @mouseenter="cellEnterHandle('E', scope.row, true)">
              <el-select
                v-if="tableData.EDIT == `E${scope.row.id}`"
                v-model="scope.row.E"
                :clearable="true"
                placeholder="请选择"
                style="width: 100%"
                @change="changeDataHandle('E', scope.row)"
                @visible-change="clearTimerHandle"
              >
                <el-option v-for="item in tableData.users" :key="item.id" :label="item.nick_name" :value="item.id" />
              </el-select>
              <span v-else class="wh_100p_100p">{{ userMapTables[scope.row.E] }}</span>
            </div>
          </template>
        </el-table-column>
      </el-table-column>

      <el-table-column label="F">
        <el-table-column prop="F" label="入库时间" width="170" sortable>
          <template #default="scope">
            <div class="extable_cell" @mouseenter="cellEnterHandle('F', scope.row, true)">
              <el-date-picker
                v-if="tableData.EDIT == `F${scope.row.id}`"
                v-model="scope.row.F"
                type="datetime"
                style="width: 100%"
                :prefix-icon="Calendar"
                placeholder="选择时间"
                :disabledDate="disabledDateHandle"
                value-format="YYYY-MM-DD hh:mm:ss"
                @change="changeDataHandle('F', scope.row)"
                @visible-change="clearTimerHandle"
              />
              <span v-else class="wh_100p_100p">{{ scope.row.F }}</span>
            </div>
          </template>
        </el-table-column>
      </el-table-column>

      <el-table-column label="G">
        <el-table-column prop="G" label="入库单价(¥)" width="180">
          <template #default="scope">
            <div
              class="extable_cell"
              @mouseenter="cellEnterHandle('G', scope.row)"
              @mouseleave="cellEnterHandle('NOUSE', scope.row)"
            >
              <el-input-number
                v-if="tableData.EDIT == `G${scope.row.id}`"
                v-model="scope.row.G"
                :precision="2"
                :step="0.01"
                :min="0"
                step-strictly
                @change="changeDataHandle('G', scope.row)"
              />
              <span v-else class="wh_100p_100p">{{ scope.row.G }}</span>
            </div>
          </template>
        </el-table-column>
      </el-table-column>

      <el-table-column label="H">
        <el-table-column prop="H" label="刷机费(¥)" width="180">
          <template #default="scope">
            <div
              class="extable_cell"
              @mouseenter="cellEnterHandle('H', scope.row)"
              @mouseleave="cellEnterHandle('NOUSE', scope.row)"
            >
              <el-input-number
                v-if="tableData.EDIT == `H${scope.row.id}`"
                v-model="scope.row.H"
                :precision="2"
                :step="0.01"
                :min="0"
                step-strictly
                @change="changeDataHandle('H', scope.row)"
              />
              <span v-else class="wh_100p_100p">{{ scope.row.H }}</span>
            </div>
          </template>
        </el-table-column>
      </el-table-column>

      <el-table-column label="I">
        <el-table-column prop="I" label="耗材费(¥)" width="180">
          <template #default="scope">
            <div
              class="extable_cell"
              @mouseenter="cellEnterHandle('I', scope.row)"
              @mouseleave="cellEnterHandle('NOUSE', scope.row)"
            >
              <el-input-number
                v-if="tableData.EDIT == `I${scope.row.id}`"
                v-model="scope.row.I"
                :precision="2"
                :step="0.01"
                :min="0"
                step-strictly
                @change="changeDataHandle('I', scope.row)"
              />
              <span v-else class="wh_100p_100p">{{ scope.row.I }}</span>
            </div>
          </template>
        </el-table-column>
      </el-table-column>

      <el-table-column label="J">
        <el-table-column prop="J" label="附加费(¥)" width="180">
          <template #default="scope">
            <div
              class="extable_cell"
              @mouseenter="cellEnterHandle('J', scope.row)"
              @mouseleave="cellEnterHandle('NOUSE', scope.row)"
            >
              <el-input-number
                v-if="tableData.EDIT == `J${scope.row.id}`"
                v-model="scope.row.J"
                :precision="2"
                :step="0.01"
                :min="0"
                step-strictly
                @change="changeDataHandle('J', scope.row)"
              />
              <span v-else class="wh_100p_100p">{{ scope.row.J }}</span>
            </div>
          </template>
        </el-table-column>
      </el-table-column>

      <el-table-column label="K">
        <el-table-column prop="K" label="物流费(¥)" width="180">
          <template #default="scope">
            <div
              class="extable_cell"
              @mouseenter="cellEnterHandle('K', scope.row)"
              @mouseleave="cellEnterHandle('NOUSE', scope.row)"
            >
              <el-input-number
                v-if="tableData.EDIT == `K${scope.row.id}`"
                v-model="scope.row.K"
                :precision="2"
                :step="0.01"
                :min="0"
                step-strictly
                @change="changeDataHandle('K', scope.row)"
              />
              <span v-else class="wh_100p_100p">{{ scope.row.K }}</span>
            </div>
          </template>
        </el-table-column>
      </el-table-column>

      <el-table-column label="L">
        <el-table-column prop="L" label="销售数量" width="180">
          <template #default="scope">
            <div
              class="extable_cell"
              @mouseenter="cellEnterHandle('L', scope.row)"
              @mouseleave="cellEnterHandle('NOUSE', scope.row)"
            >
              <el-input-number
                v-if="tableData.EDIT == `L${scope.row.id}`"
                v-model="scope.row.L"
                :precision="2"
                :step="1"
                :min="0"
                step-strictly
                @change="changeDataHandle('L', scope.row)"
              />
              <span v-else class="wh_100p_100p">{{ scope.row.L }}</span>
            </div>
          </template>
        </el-table-column>
      </el-table-column>

      <el-table-column label="M">
        <el-table-column prop="M" label="总成本(¥)" width="180">
          <template #default="scope">
            <div class="extable_cell" @mouseenter="cellEnterHandle('NOUSE', scope.row)">
              <span class="wh_100p_100p">{{ scope.row.M }}</span>
            </div>
          </template>
        </el-table-column>
      </el-table-column>

      <el-table-column label="N">
        <el-table-column prop="N" label="销售币种" width="120">
          <template #default="scope">
            <div
              class="extable_cell"
              @mouseenter="cellEnterHandle('N', scope.row)"
              @mouseleave="cellEnterHandle('NOUSE', scope.row)"
            >
              <el-select
                v-if="tableData.EDIT == `N${scope.row.id}`"
                v-model="scope.row.N"
                :clearable="true"
                placeholder="请选择币种"
                style="width: 100%"
                @change="changeDataHandle('N', scope.row)"
              >
                <el-option v-for="item in currencies" :key="item.code" :label="item.name" :value="item.code" />
              </el-select>
              <span v-else class="wh_100p_100p">{{ scope.row.N }}</span>
            </div>
          </template>
        </el-table-column>
      </el-table-column>

      <el-table-column label="O">
        <el-table-column prop="O" label="汇率(¥)" width="180">
          <template #default="scope">
            <div
              class="extable_cell"
              @mouseenter="cellEnterHandle('O', scope.row)"
              @mouseleave="cellEnterHandle('NOUSE', scope.row)"
            >
              <el-input-number
                v-if="tableData.EDIT == `O${scope.row.id}` && currentUser < 4"
                v-model="scope.row.O"
                :precision="2"
                :step="0.01"
                :min="0"
                step-strictly
                @change="changeDataHandle('O', scope.row)"
              />
              <span v-else class="wh_100p_100p">{{ scope.row.O }}</span>
            </div>
          </template>
        </el-table-column>
      </el-table-column>

      <el-table-column label="P">
        <el-table-column prop="P" label="销售单价" width="180">
          <template #default="scope">
            <div
              class="extable_cell"
              @mouseenter="cellEnterHandle('P', scope.row)"
              @mouseleave="cellEnterHandle('NOUSE', scope.row)"
            >
              <el-input-number
                v-if="tableData.EDIT == `P${scope.row.id}`"
                v-model="scope.row.P"
                :precision="2"
                :step="0.01"
                :min="0"
                step-strictly
                @change="changeDataHandle('P', scope.row)"
              />
              <span v-else class="wh_100p_100p">{{ scope.row.P }}</span>
            </div>
          </template>
        </el-table-column>
      </el-table-column>

      <el-table-column label="Q">
        <el-table-column prop="Q" label="销售单价(¥)" width="180">
          <template #default="scope">
            <div class="extable_cell" @mouseenter="cellEnterHandle('NOUSE', scope.row)">
              <span class="wh_100p_100p">{{ scope.row.Q }}</span>
            </div>
          </template>
        </el-table-column>
      </el-table-column>

      <el-table-column label="R">
        <el-table-column prop="R" label="销售总价(¥)" width="180">
          <template #default="scope">
            <div class="extable_cell" @mouseenter="cellEnterHandle('NOUSE', scope.row)">
              <span class="wh_100p_100p">{{ scope.row.R }}</span>
            </div>
          </template>
        </el-table-column>
      </el-table-column>

      <el-table-column label="S">
        <el-table-column prop="S" label="利润(¥)" width="180">
          <template #default="scope">
            <div class="extable_cell" @mouseenter="cellEnterHandle('NOUSE', scope.row)">
              <span class="wh_100p_100p">{{ scope.row.S }}</span>
            </div>
          </template>
        </el-table-column>
      </el-table-column>

      <el-table-column label="T">
        <el-table-column prop="T" label="销售平台" width="160">
          <template #default="scope">
            <div
              class="extable_cell"
              @mouseenter="cellEnterHandle('T', scope.row)"
              @mouseleave="cellEnterHandle('NOUSE', scope.row)"
            >
              <el-input
                v-if="tableData.EDIT == `T${scope.row.id}`"
                v-model="scope.row.T"
                @change="changeDataHandle('T', scope.row)"
              />
              <span v-else class="wh_100p_100p">{{ scope.row.T }}</span>
            </div>
          </template>
        </el-table-column>
      </el-table-column>

      <el-table-column label="U">
        <el-table-column prop="U" label="店铺名称" width="260">
          <template #default="scope">
            <div
              class="extable_cell"
              @mouseenter="cellEnterHandle('U', scope.row)"
              @mouseleave="cellEnterHandle('NOUSE', scope.row)"
            >
              <el-input
                v-if="tableData.EDIT == `U${scope.row.id}`"
                v-model="scope.row.U"
                @change="changeDataHandle('U', scope.row)"
              />
              <span v-else class="wh_100p_100p">{{ scope.row.U }}</span>
            </div>
          </template>
        </el-table-column>
      </el-table-column>

      <el-table-column label="V">
        <el-table-column prop="V" label="销售平台订单号" width="280">
          <template #default="scope">
            <div
              class="extable_cell"
              @mouseenter="cellEnterHandle('V', scope.row)"
              @mouseleave="cellEnterHandle('NOUSE', scope.row)"
            >
              <el-input
                v-if="tableData.EDIT == `V${scope.row.id}`"
                v-model="scope.row.V"
                @change="changeDataHandle('V', scope.row)"
              />
              <span v-else class="wh_100p_100p">{{ scope.row.V }}</span>
            </div>
          </template>
        </el-table-column>
      </el-table-column>

      <el-table-column label="W">
        <el-table-column prop="W" label="物流平台" width="160">
          <template #default="scope">
            <div
              class="extable_cell"
              @mouseenter="cellEnterHandle('W', scope.row)"
              @mouseleave="cellEnterHandle('NOUSE', scope.row)"
            >
              <el-input
                v-if="tableData.EDIT == `W${scope.row.id}`"
                v-model="scope.row.W"
                @change="changeDataHandle('W', scope.row)"
              />
              <span v-else class="wh_100p_100p">{{ scope.row.W }}</span>
            </div>
          </template>
        </el-table-column>
      </el-table-column>

      <el-table-column label="X">
        <el-table-column prop="X" label="物流单号" width="280">
          <template #default="scope">
            <div
              class="extable_cell"
              @mouseenter="cellEnterHandle('X', scope.row)"
              @mouseleave="cellEnterHandle('NOUSE', scope.row)"
            >
              <el-input
                v-if="tableData.EDIT == `X${scope.row.id}`"
                v-model="scope.row.X"
                @change="changeDataHandle('X', scope.row)"
              />
              <span v-else class="wh_100p_100p">{{ scope.row.X }}</span>
            </div>
          </template>
        </el-table-column>
      </el-table-column>

      <el-table-column label="Y">
        <el-table-column prop="Y" label="入库员" width="100">
          <template #default="scope">
            <div class="extable_cell" @mouseenter="cellEnterHandle('Y', scope.row, true)">
              <el-select
                v-if="tableData.EDIT == `Y${scope.row.id}` && currentUser < 4"
                v-model="scope.row.Y"
                :clearable="true"
                placeholder="请选择"
                style="width: 100%"
                @change="changeDataHandle('Y', scope.row)"
                @visible-change="clearTimerHandle"
              >
                <el-option v-for="item in tableData.users" :key="item.id" :label="item.nick_name" :value="item.id" />
              </el-select>
              <span v-else class="wh_100p_100p">{{ userMapTables[scope.row.Y] }}</span>
            </div>
          </template>
        </el-table-column>
      </el-table-column>

      <el-table-column label="Z">
        <el-table-column prop="Z" label="运营员" width="100">
          <template #default="scope">
            <div class="extable_cell" @mouseenter="cellEnterHandle('Z', scope.row, true)">
              <el-select
                v-if="tableData.EDIT == `Z${scope.row.id}`"
                v-model="scope.row.Z"
                :clearable="true"
                placeholder="请选择"
                style="width: 100%"
                @change="changeDataHandle('Z', scope.row)"
                @visible-change="clearTimerHandle"
              >
                <el-option v-for="item in tableData.users" :key="item.id" :label="item.nick_name" :value="item.id" />
              </el-select>
              <span v-else class="wh_100p_100p">{{ userMapTables[scope.row.Z] }}</span>
            </div>
          </template>
        </el-table-column>
      </el-table-column>

      <el-table-column label="AA">
        <el-table-column prop="AA" label="备注" width="260">
          <template #default="scope">
            <div
              class="extable_cell"
              @mouseenter="cellEnterHandle('AA', scope.row)"
              @mouseleave="cellEnterHandle('NOUSE', scope.row)"
            >
              <el-input
                v-if="tableData.EDIT == `AA${scope.row.id}`"
                v-model="scope.row.AA"
                @change="changeDataHandle('AA', scope.row)"
              />
              <span v-else class="wh_100p_100p">{{ scope.row.AA }}</span>
            </div>
          </template>
        </el-table-column>
      </el-table-column>

      <el-table-column label="AB">
        <el-table-column prop="created_at" label="创建时间" width="180" sortable>
          <template #default="scope">
            <div class="extable_cell" @mouseenter="cellEnterHandle('created_at', scope.row, true)">
              <el-date-picker
                v-if="tableData.EDIT == `created_at${scope.row.id}` && currentUser < 4"
                v-model="scope.row.created_at"
                type="datetime"
                style="width: 100%"
                :prefix-icon="Calendar"
                placeholder="选择时间"
                :disabledDate="disabledDateHandle"
                value-format="YYYY-MM-DD hh:mm:ss"
                @change="changeDataHandle('created_at', scope.row)"
                @visible-change="clearTimerHandle"
              />
              <span v-else class="wh_100p_100p">{{ parseDateFormat(scope.row.created_at) }}</span>
            </div>
          </template>
        </el-table-column>
      </el-table-column>

      <el-table-column label="AC">
        <el-table-column prop="updated_at" label="更新时间" width="180" sortable>
          <template #default="scope">
            <div class="extable_cell" @mouseenter="cellEnterHandle('updated_at', scope.row, true)">
              <el-date-picker
                v-if="tableData.EDIT == `updated_at${scope.row.id}` && currentUser < 4"
                v-model="scope.row.updated_at"
                type="datetime"
                style="width: 100%"
                :prefix-icon="Calendar"
                placeholder="选择时间"
                :disabledDate="disabledDateHandle"
                value-format="YYYY-MM-DD hh:mm:ss"
                @change="changeDataHandle('updated_at', scope.row)"
                @visible-change="clearTimerHandle"
              />
              <span v-else class="wh_100p_100p">{{ parseDateFormat(scope.row.updated_at) }}</span>
            </div>
          </template>
        </el-table-column>
      </el-table-column>

      <el-table-column label="操作" fixed="right" width="130">
        <template #default="scope">
          <el-button
            v-if="scope.row.ROW == tableData.data.length - 1"
            type="primary"
            :icon="Plus"
            circle
            size="small"
            @click="addBlankHandle"
          />
          <el-button
            v-if="scope.row.ROW == tableData.data.length - 1"
            type="danger"
            :icon="Minus"
            circle
            size="small"
            @click="minusBlankHandle"
          />
          <el-button
            v-if="scope.row.id.startsWith('FAKE_')"
            type="danger"
            :icon="Delete"
            circle
            size="small"
            @click="clearBlankDataHandle(scope.row)"
          />
          <el-popconfirm
            v-if="!scope.row.id.startsWith('FAKE_') && scope.row.id != 'SUM'"
            width="220"
            :confirm-button-text="'确定'"
            :cancel-button-text="'取消'"
            :icon="InfoFilled"
            icon-color="#F1330D"
            :title="'确认删除'"
            @confirm="confirmDelHandle(scope.row)"
          >
            <template #reference>
              <el-button type="danger" :icon="Delete" circle size="small" />
            </template>
          </el-popconfirm>
          <el-popconfirm
            v-if="scope.row.id == 'SUM'"
            width="220"
            :confirm-button-text="'确定'"
            :cancel-button-text="'取消'"
            :icon="InfoFilled"
            icon-color="#F1330D"
            :title="'确认下载'"
            @confirm="downloadExcelDataHandle"
          >
            <template #reference>
              <el-button type="primary" :icon="Download" circle size="small" />
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { reactive, watch, onUnmounted, nextTick, computed } from "vue";

import { Calendar, InfoFilled, Delete, Plus, Minus, Download } from "@element-plus/icons-vue";

import { parseDateFormat } from "@/utils/date/date.ts";
import dayjs from "dayjs";

import { ElMessage } from "element-plus";

import { nanoid } from "nanoid";
import { useTimeRangeStore } from "@/store/authTimeRangeStore";
import { useAuthUserStore } from "@/store/authUserStore";
import { currencies } from "@/common/data.ts";

import {
  getAllExcelRequest,
  downloadExcelRequest,
  createExcelRequest,
  updateExcelRequest,
  deleteExcelRequest,
} from "@/api/excel";

import { getAllUserstRequest } from "@/api/user";

const { timeRangeStore, setTimeRange } = useTimeRangeStore();
const { authUserStore } = useAuthUserStore();

const todayTime = dayjs();

const currentUser = computed(() => {
  if (authUserStore.user && authUserStore.user.id) {
    return parseInt(authUserStore.user.id);
  } else {
    return 9999;
  }
});

const disabledDateHandle = (time) => {
  let timeTemp = dayjs(time);
  let newTime = todayTime.add(10, "minute");
  return timeTemp.isAfter(newTime);
};

const blankData = {
  A: "",
  B: "",
  C: "",
  D: "",
  E: "",
  F: "",
  G: 0.0,
  H: 0.0,
  I: 0.0,
  J: 0.0,
  K: 0.0,
  L: 1,
  M: 0.0,
  N: "",
  O: 1.0,
  P: 0.0,
  Q: 0.0,
  R: 0.0,
  S: 0.0,
  T: "",
  U: "",
  V: "",
  W: "",
  X: "",
  Y: "",
  Z: "",
};

let rowIndex = 0;
let oldCellData = null;
const tableData = reactive({
  data: [],
  sum: {},
  EDIT: null,
  users: [],
});

let userMapTables = {};

const currentEdit = {
  column: -1,
  row: -1,
};

const numberColumns = ["G", "H", "I", "J", "K", "L", "O", "P"];

const tableRowClassNameHandle = (row, rowIndex) => {
  if (row.rowIndex == 0) {
    return "row_stick_top";
  } else {
    return "";
  }
};

const currentTableName = computed(() => {
  if (timeRangeStore.table) {
    return timeRangeStore.table;
  } else {
    const year = todayTime.year();
    const table = `order${year}`;
    return table;
  }
});

function downloadFile(url: string, filename: string) {
  if (!url) return;
  const link = document.createElement("a"); //创建a标签
  link.style.display = "none"; //使其隐藏
  link.href = url; //赋予文件下载地址
  link.setAttribute("download", filename); //设置下载属性 以及文件名
  document.body.appendChild(link); //a标签插至页面中
  link.click(); //强制触发a标签事件
  document.body.removeChild(link);
}

const pastHandle = (event) => {
  event.preventDefault();
  const pasteData = (event.clipboardData || window.clipboardData).getData("text");

  let pasteDataArr = null;
  if (pasteData.includes("\r\n")) {
    pasteDataArr = pasteData.split("\r\n");
  } else if (pasteData.includes("\n")) {
    pasteDataArr = pasteData.split("\n");
  } else {
    pasteDataArr = [pasteData];
  }

  let pasteDataNoBlankArr = [];
  for (let i = 0; i < pasteDataArr.length; i++) {
    if (pasteDataArr[i]) {
      pasteDataNoBlankArr.push(pasteDataArr[i]);
    }
  }

  // console.log("window.clipboardData", event, window.clipboardData, pasteData, pasteDataArr, pasteDataNoBlankArr);
  const addDataLen = pasteDataNoBlankArr.length;

  if (currentEdit.column != -1 && currentEdit.row != -1 && addDataLen) {
    tableData.EDIT = "";
    // 先判断是否有足够的可插入 粘贴的数据, 如果不够增加行.
    let endIndex = addDataLen + currentEdit.row;
    while (endIndex > tableData.data.length) {
      addBlankHandle();
    }

    // 开始 粘贴 数据
    // 在有正常ID 时 更新数据
    // 在是假 ID 时 创建数据.
    nextTick(() => {
      for (let i = 0; i < addDataLen; i++) {
        let dataTemp = pasteDataNoBlankArr[i];
        const column = currentEdit.column;
        if (checkIsNeedCalc(column)) {
          dataTemp = parseFloat(dataTemp);
          if (isNaN(dataTemp)) {
            if (column == "L") {
              dataTemp = 1;
            } else if (column == "O") {
              dataTemp = 1.0;
            } else {
              dataTemp = 0;
            }
          }
        }
        const rowData = tableData.data[currentEdit.row + i];
        rowData[currentEdit.column] = dataTemp;
        const table = currentTableName.value;

        if (rowData.id.startsWith("FAKE_")) {
          // 创建数据
          creatRowHandle(rowData, table, currentEdit.column, dataTemp);
        } else {
          // 更新数据
          updataRowHandle(table, rowData.id, currentEdit.column, dataTemp);
        }
      }

      currentEdit.column = -1;
      currentEdit.row = -1;
    });
  }
};

function init() {
  addEventListener("paste", pastHandle);
  console.log("getTableName", currentTableName.value);
  getAllUsersHandle();
}
init();

watch(
  () => timeRangeStore.begin,
  () => {
    getAllExcelData();
  },
  {
    immediate: true,
    deep: true,
  },
);

onUnmounted(() => {
  removeEventListener("paste", pastHandle);
});

function getAllUsersHandle() {
  getAllUserstRequest()
    .then((res) => {
      console.log("getAllUserstRequest ok", res);
      if (res.success) {
        if (res.data && res.data.length) {
          const usersArr = [];
          userMapTables = {};
          for (let i = 0; i < res.data.length; i++) {
            const temp = res.data[i];

            if (currentUser.value < 4) {
              usersArr.push({
                ...temp,
                text: res.data[i].nick_name,
                value: "" + res.data[i].id,
              });
            } else {
              if (currentUser.value == temp.id) {
                usersArr.push({
                  ...temp,
                  text: res.data[i].nick_name,
                  value: "" + res.data[i].id,
                });
              }
            }

            userMapTables[temp.id] = temp.nick_name;
          }
          tableData.users = usersArr;
        } else {
          tableData.users = [];
          userMapTables = {};
        }
      }
    })
    .catch((err) => {
      console.log("getAllUserstRequest err", err);
      tableData.users = [];
      userMapTables = {};
    });
}

const tableFilterUsersHandle = (value: string, row: User, column: any) => {
  console.log("tableFilterUsersHandle", value, row, column);
  const property = column["property"];
  return row[property] === value;
};

function minusBlankHandle() {
  let ind = rowIndex;
  if (tableData.data[ind] && tableData.data[ind].id.startsWith("FAKE_")) {
    tableData.data.pop();
    rowIndex = rowIndex - 1;
  }
}

function addBlankHandle() {
  rowIndex++;
  tableData.data.push({ ...blankData, ROW: rowIndex, id: `FAKE_${nanoid(10)}`, table_name: currentTableName.value });
}

function creatRowHandle(row, table, column, data) {
  const reqData = {
    row: "-1",
    column: "" + column,
    data: "" + data,
    table: table,
  };
  createExcelRequest(reqData)
    .then((res) => {
      console.log("createExcelRequest ok", res);
      const rowId = row.ROW;
      if (res.success && tableData.data[rowId]) {
        tableData.data[rowId].id = "" + res.data.id;
        tableData.data[rowId].table_name = res.data.table_name;
        tableData.data[rowId].created_at = res.data.created_at;
        tableData.data[rowId].updated_at = res.data.updated_at;
        nextTick(() => {
          if (checkIsNeedCalc(column)) {
            calcAndUpdateTotalCasts(tableData.data[rowId], true);
            calcAndUpdateSalesProfit(tableData.data[rowId], true);
          }
          if (column == "N") {
            calcAndUpdateCurrency(tableData.data[rowId], true);
          }
        });
      }
    })
    .catch((err) => {
      console.log("createExcelRequest err", err);
      ElMessage({
        type: "error",
        showClose: true,
        offset: 64,
        message: "新建失败，请刷新重试",
      });
    });
}

function updataRowHandle(table, id, column, data) {
  const reqData = {
    row: "" + id,
    column: "" + column,
    data: "" + data,
    table: table,
  };
  updateExcelRequest(table, id, reqData)
    .then((res) => {
      console.log("updateExcelRequest ok", res);
    })
    .catch((err) => {
      console.log("updateExcelRequest err", err);
      ElMessage({
        type: "error",
        showClose: true,
        offset: 64,
        message: "更新失败，请刷新重试",
      });
    });
}

let enterTimer = null;

function clearTimerHandle(visible = true) {
  if (enterTimer) {
    clearTimeout(enterTimer);
    enterTimer = null;
  }
  if (!visible) {
    enterTimer = setTimeout(() => {
      cellEnterHandle("NOUSE", null);
    }, 2000);
  }
}

function cellEnterHandle(column, row, isTime = false) {
  if (column == "NOUSE") {
    tableData.EDIT = "";
    oldCellData = "";
    currentEdit.column = -1;
    currentEdit.row = -1;
  } else {
    if (row.id != "SUM") {
      tableData.EDIT = `${column}${row.id}`;
      oldCellData = row[column];

      currentEdit.column = column;
      currentEdit.row = row.ROW;

      if (isTime) {
        clearTimerHandle();
        enterTimer = setTimeout(() => {
          cellEnterHandle("NOUSE", null);
        }, 2000);
      }
    }
  }
}

function calcSum() {
  const dataLen = tableData.data.length;
  if (dataLen >= 2) {
    const sumData = tableData.data[0];
    let hdata = 0;
    let idata = 0;
    let jdata = 0;
    let kdata = 0;
    let ldata = 0;
    let mdata = 0;
    let rdata = 0;
    let sdata = 0;
    for (let i = 1; i < dataLen; i++) {
      hdata = hdata + tableData.data[i].H;
      idata = idata + tableData.data[i].I;
      jdata = jdata + tableData.data[i].J;
      kdata = kdata + tableData.data[i].K;

      ldata = ldata + tableData.data[i].L;
      mdata = mdata + tableData.data[i].M;
      rdata = rdata + tableData.data[i].R;
      sdata = sdata + tableData.data[i].S;
    }

    sumData.H = Math.round(hdata * 100) / 100;
    sumData.I = Math.round(idata * 100) / 100;
    sumData.J = Math.round(jdata * 100) / 100;
    sumData.K = Math.round(kdata * 100) / 100;

    sumData.L = Math.round(ldata * 100) / 100;
    sumData.M = Math.round(mdata * 100) / 100;
    sumData.R = Math.round(rdata * 100) / 100;
    sumData.S = Math.round(sdata * 100) / 100;
  }
}

function calcAndUpdateTotalCasts(row, isUpdate = false) {
  if (
    typeof row.G == "number" &&
    typeof row.L == "number" &&
    typeof row.H == "number" &&
    typeof row.I == "number" &&
    typeof row.J == "number" &&
    typeof row.K == "number"
  ) {
    const totalCasts = Math.round((row.G * row.L + row.H + row.I + row.J + row.K) * 100) / 100;
    row.M = totalCasts;

    if (isUpdate) {
      const id = row.id;
      const table = row.table_name ?? currentTableName.value;
      updataRowHandle(table, id, "M", totalCasts);
    }

    calcSum();
  }
}

function calcAndUpdateSalesProfit(row, isUpdate = false) {
  if (
    typeof row.P == "number" &&
    typeof row.O == "number" &&
    typeof row.L == "number" &&
    typeof row.M == "number" &&
    row.P > 0 &&
    row.O > 0
  ) {
    const salesPrice = Math.round(row.O * row.P * 100) / 100;
    const salesTotal = Math.round(salesPrice * row.L * 100) / 100;
    const profit = Math.round((salesTotal - row.M) * 100) / 100;

    row.Q = salesPrice;
    row.R = salesTotal;
    row.S = profit;

    if (isUpdate) {
      const id = row.id;
      const table = row.table_name ?? currentTableName.value;
      updataRowHandle(table, id, "Q", salesPrice);
      updataRowHandle(table, id, "R", salesTotal);
      updataRowHandle(table, id, "S", profit);
    }

    calcSum();
  }
}

function checkIsNeedCalc(column) {
  return numberColumns.includes(column);
}

function calcAndUpdateCurrency(row, isUpdate = false) {
  if (row.N) {
    for (let i = 0; i < currencies.length; i++) {
      let currency = currencies[i];
      if (currency.code == row.N) {
        row.O = currency.exchange_rate;
        break;
      }
    }
  } else {
    row.O = 1.0;
  }

  if (isUpdate) {
    const id = row.id;
    const table = row.table_name ?? currentTableName.value;
    updataRowHandle(table, id, "O", row.O);
  }

  calcAndUpdateTotalCasts(row, true);
  calcAndUpdateSalesProfit(row, true);
  calcSum();
}

function changeDataHandle(column, row) {
  tableData.EDIT = "";
  let newData = row[column];
  let id = row.id;
  let table = row.table_name ?? currentTableName.value;
  console.log("changeDataHandle", oldCellData, newData);
  if (oldCellData != newData) {
    // 更新后台数据
    console.log("更新", column, id, newData);
    if (id.startsWith("FAKE_")) {
      creatRowHandle(row, table, column, newData);
    } else {
      updataRowHandle(table, id, column, newData);
      nextTick(() => {
        if (checkIsNeedCalc(column)) {
          calcAndUpdateTotalCasts(row, true);
          calcAndUpdateSalesProfit(row, true);
        }
        if (column == "N") {
          calcAndUpdateCurrency(row, true);
        }
      });
    }
  } else {
    console.log("没有变", column, id, newData);
  }

  currentEdit.column = -1;
  currentEdit.row = -1;
}

function clearBlankDataHandle(rowData: any) {
  rowData.A = "";
  rowData.B = "";
  rowData.C = "";
  rowData.D = "";
  rowData.E = "";
  rowData.F = "";
  rowData.G = 0.0;
  rowData.H = 0.0;
  rowData.I = 0.0;
  rowData.J = 0.0;
  rowData.K = 0.0;
  rowData.L = 1;
  rowData.M = 0.0;
  rowData.N = "";
  rowData.O = 1.0;
  rowData.P = 0.0;
  rowData.Q = 0.0;
  rowData.R = 0.0;
  rowData.S = 0.0;
  rowData.T = "";
  rowData.U = "";
  rowData.V = "";
  rowData.W = "";
  rowData.X = "";
  rowData.Y = "";
  rowData.Z = "";
}

function getAllExcelData() {
  let reqData = null;
  if (timeRangeStore.begin && timeRangeStore.end) {
    reqData = {
      created_begin_at: timeRangeStore.begin,
      created_end_at: timeRangeStore.end,
      table: currentTableName.value,
    };
  } else {
    reqData = {
      table: currentTableName.value,
    };
  }
  getAllExcelRequest(reqData)
    .then((res) => {
      console.log("getAllExcelRequest", res);
      if (res.data && res.data.length) {
        const tempdata = [];
        tempdata.push({ ...blankData, ROW: "汇总", id: "SUM", table_name: "" });
        rowIndex = 0;
        for (let i = 0; i < res.data.length; i++) {
          rowIndex++;
          tempdata.push({
            ...res.data[i],
            ROW: rowIndex,
            id: "" + res.data[i].id,
            G: parseFloat(res.data[i].G),
            H: parseFloat(res.data[i].H),
            I: parseFloat(res.data[i].I),
            J: parseFloat(res.data[i].J),
            K: parseFloat(res.data[i].K),
            L: parseFloat(res.data[i].L),
            M: parseFloat(res.data[i].M),

            O: parseFloat(res.data[i].O),
            P: parseFloat(res.data[i].P),
            Q: parseFloat(res.data[i].Q),
            R: parseFloat(res.data[i].R),
            S: parseFloat(res.data[i].S),
          });
        }
        tableData.data = tempdata;
        calcSum();
      } else {
        rowIndex = 0;
        tableData.data = [];
        tableData.data.push({ ...blankData, ROW: "汇总", id: "SUM", table_name: "" });
        addBlankHandle();
      }
    })
    .catch((err) => {
      console.log("getAllExcelRequest", err);
      rowIndex = 0;
      tableData.data.push({ ...blankData, ROW: "汇总", id: "SUM", table_name: "" });
      addBlankHandle();
    });
}

function downloadExcelDataHandle() {
  let reqData = null;
  if (timeRangeStore.begin && timeRangeStore.end) {
    reqData = {
      created_begin_at: timeRangeStore.begin,
      created_end_at: timeRangeStore.end,
      table: currentTableName.value,
    };
  }
  downloadExcelRequest(reqData)
    .then((res) => {
      console.log("downloadExcelRequest", res);
      if (res.success) {
        if (res.data.url) {
          downloadFile(res.data.url, "销售表.xlsx");
        }
      }
    })
    .catch((err) => {
      console.log("downloadExcelRequest", err);
    });
}

function confirmDelHandle(rowdata: any) {
  let table = rowdata.table_name ?? currentTableName.value;
  if (rowdata.id != "SUM" || rowdata.id.startsWith("FAKE_")) {
    deleteExcelRequest(table, rowdata.id)
      .then((res) => {
        console.log("deleteExcelRequest ok", res);
        // let rowIndex = rowdata.ROW;
        // tableData.data.splice(rowIndex, 1);
        // rowIndex = rowIndex - 1;
        getAllExcelData();
        ElMessage({
          type: "success",
          showClose: true,
          offset: 64,
          message: "删除成功",
        });
      })
      .catch((err) => {
        console.log("deleteExcelRequest err", err);
        // getAllExcelData();
        ElMessage({
          type: "error",
          showClose: true,
          offset: 64,
          message: "删除失败",
        });
      });
  }
}
</script>

<style scoped>
.extable_container {
  position: relative;
  width: 100%;
  height: 100%;
  background: var(--c-255-255-255-100);
}

.extable_cell {
  width: 100%;
  height: 100%;
  min-height: 2rem;
}

.extable_wraper {
  width: 100%;
  height: calc(100% - 4rem);
}

.extable_sum {
  width: 100%;
  height: 4rem;
}

:deep(.el-table .row_stick_top) {
  position: sticky;
  position: -webkit-sticky;
  top: 0;
  z-index: 3;
  font-size: var(--fsr-16px);
  height: 2rem;
  color: var(--c-064-158-255-100);
}

:deep(.el-table .table_header) {
  font-size: var(--fsr-14px);
  height: 2rem;
}

:deep(.el-table th.el-table__cell) {
  background: var(--c-247-248-250-100);
}
</style>
