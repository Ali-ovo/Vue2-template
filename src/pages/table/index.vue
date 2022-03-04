<template>
  <div class="app-container">
    <el-row :gutter="10">
      <el-col v-for="(condition, index) in conditions" :key="index" :span="6">
        <el-input
          v-model="condition.value"
          :placeholder="'请输入' + condition.name"
          clearable
        >
          <template slot="prepend">{{ condition.name }}</template>
        </el-input>
      </el-col>
      <el-col :span="6">
        <el-button
          v-if="conditions.length != 0"
          type="primary"
          @click="getValue"
        >查询</el-button>
        <el-button
          v-if="tableName == 'f_portfolio_baseinfo'"
          type="success"
          @click="dialogVisible = true"
        >清算单个组合区间
        </el-button>
      </el-col>
    </el-row>

    <!--输入日期dialog-->
    <el-dialog
      title="输入日期"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-input
        v-model="clearObj.ecDate"
        placeholder="请输入日期，格式yyyyMMdd"
        clearable
      >
        <template slot="prepend">日期</template>
      </el-input>
      <span slot="footer" class="dialog-footer">
        <el-button
          @click=";(dialogVisible = false), (clearObj.ecDate = '')"
        >取 消</el-button>
        <el-button type="primary" @click="clearValue()">确 定</el-button>
      </span>
    </el-dialog>

    <!--返回信息dialog-->
    <el-dialog
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
    </el-dialog>

    <!--表格-->
    <div style="margin-top: 10px">
      <el-table
        ref="multipleTable"
        v-loading="listLoading"
        height="480"
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
      </el-table>
    </div>

    <!--分页-->
    <div style="text-align: center; margin-top: 10px">
      <el-pagination
        background
        :current-page="pageInfo.pageNum"
        :page-sizes="[10, 25, 50]"
        :page-size="pageInfo.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageInfo.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
export default {
  filters: {
    ellipsis(value) {
      if (!value) return ''
      if (value.length > 30) {
        return value.slice(0, 30) + '...'
      }
      return value
    }
  },

  components: {},
  data() {
    return {
      /** 弹出框**/
      dialogVisible: false,
      dialogInfoVisible: false,
      infoList: null,
      infoListLoading: false,
      /** 路径参数**/
      tableName: '',
      /** 输入框参数**/
      conditions: [],
      /** 表格参数**/
      list: null,
      listLoading: false,
      keys: [],
      title: [],
      queryParams: {},
      /* 排序参数*/
      columnProp: null,
      colmnOrder: null,
      /* 多选框参数*/
      selection: [],
      clearObj: {
        pList: [],
        ecDate: ''
      },
      /** 分页参数**/
      pageInfo: {
        total: 0,
        pageNum: 1,
        pageSize: 10
      }
    }
  },
  mounted() {},
  created() {
    // console.log(this.$route.params.tableName)
    this.tableName = this.$route.params.tableName
    this.getHeader()
    // this.fetchData()
  },
  methods: {
    /** 按钮操作**/
    getValue() {
      this.conditions.forEach((item) => {
        Object.defineProperty(this.queryParams, item.column, {
          value: item.value,
          writable: true,
          enumerable: true,
          configurable: true
        })
      })

      console.log('###########queryParams############')
      console.log(this.queryParams)

      // getTableValue2(this.tableName, this.pageInfo.pageNum, this.pageInfo.pageSize, this.queryParams, this.columnProp, this.colmnOrder).then(res => {
      //   this.listLoading = true
      //   console.log('###########TableValue############')
      //   console.log(res)
      //   const result = res.data.result
      //   this.list = result.list
      //   this.pageInfo.total = result.total
      //   this.listLoading = false
      // })
    },
    clearValue() {
      this.selection = this.$refs.multipleTable.selection
      console.log('******************this.selection*****************')
      console.log(this.selection)
      /* 校验判断*/
      if (this.selection === 0) {
        this.$message.warning('请选择要清算的列')
        return
      }
      if (this.clearObj.ecDate === '' || this.clearObj.ecDate.trim() === '') {
        this.$message.warning('请填写日期')
        return
      }

      this.selection.forEach((item) => {
        this.clearObj.pList.push(item.portfolioId)
      })
      console.log('******************this.clearObj*****************')
      console.log(this.clearObj)

      // clearValue(this.clearObj).then((res) => {
      //   console.log('******************this.res*****************')
      //   console.log(res)

      //   this.infoList = res.data

      //   console.log('******************this.infoList*****************')
      //   console.log(this.infoList)
      //   this.dialogInfoVisible = true
      //   this.clearObj.ecDate = ''
      //   this.clearObj.pList = []
      // })

      this.dialogVisible = false
    },
    /** 表格操作**/
    // fetchData() {
    //   this.listLoading = true
    //   getTableValue2(this.tableName, this.pageInfo.pageNum, this.pageInfo.pageSize, this.queryParams, this.columnProp, this.colmnOrder).then(res => {
    //     console.log('###########TableValue############')
    //     console.log(res)
    //     this.conditions = res.data.condition
    //     const result = res.data.result
    //     this.list = result.list
    //     this.pageInfo.total = result.total
    //     this.listLoading = false
    //   })
    // },
    tableHeader({ row, column, rowIndex, columnIndex }) {
      return 'text-align:center;'
    },
    /* 表格排序*/
    onSortChange(column) {
      console.log('********************排序相关**************************')
      console.log(column.prop + '-' + column.order)
      this.columnProp = column.prop
      switch (column.order) {
        case 'ascending':
          this.colmnOrder = 'asc'
          break
        case 'descending':
          this.colmnOrder = 'desc'
          break
        default:
          this.colmnOrder = null
      }

      console.log(column.prop + '-' + this.colmnOrder)
      // getTableValue2(this.tableName, this.pageInfo.pageNum, this.pageInfo.pageSize, this.queryParams, this.columnProp, this.colmnOrder).then(res => {
      //   this.listLoading = true
      //   console.log('###########TableValue############')
      //   console.log(res)
      //   const result = res.data.result
      //   this.list = result.list
      //   this.pageInfo.total = result.total
      //   this.listLoading = false
      // })
    },
    getHeader() {
      this.title = [
        { label: '主键id', prop: 'fid' },
        { label: '用户id', prop: 'userId' },
        { label: '手机号', prop: 'phoneNumber' },
        { label: '资金账号', prop: 'capitalAccount' },
        { label: '组合个数', prop: 'portfolioNum' },
        { label: '预留字段1', prop: 'column1' },
        { label: '预留字段2', prop: 'column2' },
        { label: '更新日期', prop: 'initDate' },
        { label: '插入时间', prop: 'eitime' },
        { label: '更新时间', prop: 'eutime' }
      ]
      if (this.tableName === 'zuHeXinXi') {
        this.title = [
          { label: '主键id', prop: 'fid' },
          { label: '用户id', prop: 'userId' },
          { label: '手机号', prop: 'phoneNumber' },
          { label: '资金账号', prop: 'capitalAccount' },
          { label: '组合个数', prop: 'portfolioNum' },
          { label: '预留字段1', prop: 'column1' },
          { label: '预留字段2', prop: 'column2' },
          { label: '更新日期', prop: 'initDate' },
          { label: '插入时间', prop: 'eitime' },
          { label: '更新时间', prop: 'eutime' }
        ]
      } else if (this.tableName === 'f_activity_base_info') {
        this.title = [
          { label: '主键id', prop: 'fid' },
          { label: '活动id', prop: 'activityId' },
          { label: '活动名称', prop: 'activityName' },
          { label: '是否支持入金(0-不支持 1-支持)', prop: 'supportInflow' },
          { label: '初始资金(默认100万)', prop: 'initCash' },
          { label: '活动开始时间', prop: 'startDate' },
          { label: '活动截止时间', prop: 'endDate' },
          { label: '创建日期', prop: 'initDate' },
          {
            label: '活动类型(单次活动/主分赛场/预选赛/决赛)',
            prop: 'activityType'
          },
          { label: '关联活动id', prop: 'relatedActivityId' },
          { label: '关联类型', prop: 'relatedType' },
          { label: '插入时间', prop: 'eitime' },
          { label: '更新时间', prop: 'eutime' },
          { label: '预留字段1', prop: 'column1' },
          { label: '预留字段2', prop: 'column2' }
        ]
      } else if (this.tableName === 'f_portfolio_baseinfo') {
        this.title = [
          {
            label: '主键id',
            prop: 'fid'
          },
          {
            label: '用户ID',
            prop: 'userId'
          },
          {
            label: '组合ID',
            prop: 'portfolioId'
          },
          {
            label: '组合名称',
            prop: 'portfolioName'
          },
          {
            label: '组合描述',
            prop: 'portfolioDes'
          },
          {
            label: '创建日期',
            prop: 'creatDate'
          },
          {
            label: '初始资金',
            prop: 'initAmount'
          },
          {
            label: '组合类型(专家组、业余组)',
            prop: 'portfolioType'
          },
          {
            label: '组合状态:0-存续 1-删除',
            prop: 'portfolioStatus'
          },
          {
            label: '客户最后操作时间',
            prop: 'latestActiveTime'
          },
          {
            label: '更新日期',
            prop: 'initDate'
          },
          {
            label: '插入时间',
            prop: 'eitime'
          },
          {
            label: '更新时间',
            prop: 'eutime'
          },
          {
            label: '组合的数据状态(0:正常可用,1:数据维护中）',
            prop: 'dataStatus'
          },
          {
            label: '活动ID',
            prop: 'activityId'
          },
          {
            label: '清算信息',
            prop: 'settleMsg'
          },

          {
            label: '是否公开(1:是,0不是)',
            prop: 'isPublic'
          },
          {
            label: '清算状态(0:表示正常未清算,1:表示清算中）',
            prop: 'settleStatus'
          }
        ]
      } else if (this.tableName === 'f_portfolio_position') {
        this.title = [
          {
            label: '主键id',
            prop: 'fid'
          },
          {
            label: '用户ID',
            prop: 'userId'
          },
          {
            label: '组合ID',
            prop: 'portfolioId'
          },
          {
            label: '组合名称',
            prop: 'portfolioName'
          },
          {
            label: '基金代码',
            prop: 'fundCode'
          },
          {
            label: '基金名称',
            prop: 'fundName'
          },
          {
            label: '基金类型',
            prop: 'fundType'
          },
          {
            label: '基金类型',
            prop: 'dfType'
          },
          {
            label: '基金风险等级',
            prop: 'fundRisk'
          },
          {
            label: '建仓日期',
            prop: 'startDate'
          },
          {
            label: '清仓日期',
            prop: 'endDate'
          },
          {
            label: '最近调仓日期',
            prop: 'lastAdjustDate'
          },
          {
            label: '总购买金额（不包括手费续）',
            prop: 'totalBuyAmount'
          },
          {
            label: '持仓份额',
            prop: 'holdVolumn'
          },
          {
            label: '基金市值',
            prop: 'fundMv'
          },
          {
            label: '总收益',
            prop: 'totalRevenue'
          },
          {
            label: '仓位占比',
            prop: 'positionRate'
          },
          {
            label: '总收益率',
            prop: 'totalYield'
          },
          {
            label: '最新净值',
            prop: 'latestNav'
          },
          {
            label: '最新净值日期',
            prop: 'latestNavDate'
          },
          {
            label: '最新净值增长率',
            prop: 'latestNavRate'
          },
          {
            label: '预留字段1',
            prop: 'column1'
          },
          {
            label: '预留字段2',
            prop: 'column2'
          },
          {
            label: '更新日期',
            prop: 'initDate'
          },
          {
            label: '插入时间',
            prop: 'eitime'
          },
          {
            label: '更新时间',
            prop: 'eutime'
          },
          {
            label: '持仓成本价',
            prop: 'holdCost'
          },
          {
            label: '最新净值(复权)',
            prop: 'latestAdjustNav'
          },
          {
            label: '现金分红金额',
            prop: 'dividendAmount'
          },
          {
            label: '累计现金分红金额',
            prop: 'totalDividendAmount'
          },
          {
            label: '申请的赎回份数',
            prop: 'applyRedeemVolumn'
          },
          {
            label: '累计拆股送份数',
            prop: 'totalSplitVolumn'
          },
          {
            label: '总卖出收益（不包括手费续）',
            prop: 'totalSellProfit'
          },
          {
            label: '总费用',
            prop: 'totalFee'
          },
          {
            label: '累计总买入费用',
            prop: 'totalBuyFee'
          },
          {
            label: '累计总卖出费用',
            prop: 'totalSellFee'
          },
          {
            label: '昨日持仓',
            prop: 'holdVolumnPre'
          },
          {
            label: '昨日成本价',
            prop: 'holdCostPre'
          },
          {
            label: '昨日总成本',
            prop: 'holdCostTotalPre'
          },
          {
            label: '累计买入份数',
            prop: 'totalBuyVolumn'
          },
          {
            label: '累计卖出份数',
            prop: 'totalSellVolumn'
          },
          {
            label: '当日买入总金额（不包手费）',
            prop: 'dayBuyUnfeeamount'
          },
          {
            label: '当日卖出总收益（不包手费）',
            prop: 'daySellProfit'
          },
          {
            label: '当日买入份数',
            prop: 'dayBuyVolumn'
          },
          {
            label: '当日卖出份数',
            prop: 'daySellVolumn'
          },
          {
            label: '当日买入手续费',
            prop: 'dayBuyFee'
          },
          {
            label: '当日卖出手续费',
            prop: 'daySellFee'
          },
          {
            label: '累计货币基金收益',
            prop: 'totalMmfAmount'
          },
          {
            label: '清算申请的赎回份数的变动值',
            prop: 'applyRedeemVolumnSettleChange'
          },
          {
            label: '清算日期(yyyyMMdd)',
            prop: 'settleDate'
          }
        ]
      }
    },
    /** 对话框操作**/
    handleClose(done) {
      this.clearObj.ecDate = ''
      done()
    },
    handleInfoClose(done) {
      this.infoList = null
      done()
    },

    /** 分页操作**/
    // 每页条数改变的方法
    handleSizeChange(val) {
      this.pageInfo.pageSize = val
      this.fetchData()
    },
    // 页数改变的方法
    handleCurrentChange(val) {
      this.pageInfo.pageNum = val
      this.fetchData()
    }
  }
}
</script>
<style>
.el-table tbody tr:hover > td {
  background-color: #ecf5ff !important;
}

.el-col {
  margin-bottom: 10px;
}

.el-tooltip__popper {
  font-size: 14px;

  max-width: 50%;

  background: #68859a !important; /*背景色!important优先级*/
}

/*设置显示隐藏部分内容，按50%显示*/
</style>

