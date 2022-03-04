<template>
  <div class="app-container">
    <!-- <el-row :gutter="10">
      <el-col v-for="(item, index) in searchList" :key="index" :span="6">
        <el-input
          v-model="item.value"
          :placeholder="'请输入' + item.label"
          clearable
          @clear="querySearchList"
        >
          <template slot="prepend">{{ item.label }}</template>
        </el-input>
      </el-col>
      <el-col :span="6">
        <el-button type="primary" @click="querySearchList">查询</el-button>
      </el-col>
    </el-row> -->

    <!--返回信息dialog-->
    <!-- <el-dialog
      title="提示"
      :visible.sync="dialogInfoVisible"
      width="70%"
      :before-close="handleInfoClose"
    >
      <div class="app-container">
        <el-table
          v-loading="infoListLoading"
          :data="infoList"
          element-loading-text="Loading"
          :header-cell-style="tableHeader"
          fit
          border
          highlight-current-row
        >
          <el-table-column label="pid" prop="pid" align="center" />
          <el-table-column label="result" prop="result" align="center" />
          <el-table-column label="params" prop="params" align="center" />
        </el-table>
      </div>
    </el-dialog> -->

    <!--表格-->
    <!-- <div style="margin-top: 10px">
      <el-table
        ref="multipleTable"
        v-loading="listLoading"
        height="600"
        :data="list"
        element-loading-text="Loading"
        :header-cell-style="tableHeader"
        border
        fit
        highlight-current-row
        @sort-change="onSortChange"
      >
        <el-table-column type="selection" align="center" />
        <el-table-column
          v-for="(key, index) in title"
          :key="index"
          :label="key.label"
          :prop="key.prop"
          align="center"
          min-width="200"
          show-overflow-tooltip
          sortable="custom"
        />
        <el-table-column
          v-for="(key, index) in titledate"
          :key="index"
          :label="key.label"
          :prop="key.prop"
          align="center"
          min-width="200"
          show-overflow-tooltip
          sortable="custom"
          :formatter="dateFormat"
        />
      </el-table>
    </div> -->

    <!--分页-->
    <!-- <div style="text-align: center; margin-top: 10px">
      <el-pagination
        background
        :current-page="filter.currPage"
        :page-sizes="[10, 25, 50]"
        :page-size="filter.pageRows"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div> -->
  </div>
</template>

<script>
// import moment from 'moment'

export default {
  filters: {},

  components: {},
  data() {
    return {}
  },
  mounted() {},
  created() {},
  methods: {}
}
</script>
<style lang="scss" scope>
/*设置显示隐藏部分内容，按50%显示*/
</style>

