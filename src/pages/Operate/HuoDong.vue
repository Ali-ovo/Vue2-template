<template>
  <div class="app-container">
    <!-- <el-row :gutter="10">
      <el-col :span="7">
        <el-input
          v-model="filter.activityName"
          :placeholder="'请输入活动名称'"
          clearable
        >
          <template slot="prepend">活动名称</template>
        </el-input>
      </el-col>

      <el-col :span="6">
        <el-select v-model="filter.status" placeholder="请选择活动状态">
          <el-option
            v-for="item in statusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-col>
      <el-col :span="6">
        <el-button type="primary" @click="querySearchList">查询</el-button>
        <el-button type="primary" @click="showCreateForm">新增</el-button>
      </el-col>
    </el-row> -->

    <!--返回信息dialog-->
    <!-- <el-dialog
      :title="titleText + '活动'"
      :visible.sync="dialogInfoVisible"
      width="90%"
      :close-on-click-modal="false"
      @close="addDialogClosed"
    >
      <el-form ref="form" :model="form" :rules="rules" label-width="150px">
        <el-form-item label="活动名称:" prop="activityName">
          <el-input
            v-model="form.activityName"
            :disabled="status === 1 ? false : true"
          />
        </el-form-item>

        <el-form-item label="初始资金:" prop="initCash">
          <el-input
            v-model="form.initCash"
            :disabled="status === 1 ? false : true"
          ><template slot="append">万元</template></el-input>
        </el-form-item>

        <el-form-item label="初始参与人数:" prop="initPersonCount">
          <el-input v-model="form.initPersonCount" />
        </el-form-item>

        <el-form-item label="支持组合数量:" prop="maxPortfolioCount">
          <el-input
            v-model="form.maxPortfolioCount"
            :disabled="status === 1 ? false : true"
          />
        </el-form-item>

        <el-form-item label="活动客群:">
          <el-select
            v-model="form.targetClinetGroup"
            multiple
            filterable
            placeholder="全部客户"
            :disabled="status === 1 ? false : true"
          >
            <el-option
              v-for="item in clientGroupOptions"
              :key="item.fcgId"
              :label="item.fcgName"
              :value="item.fcgId"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="目标基金公司:">
          <el-select
            v-model="form.targetCompany"
            multiple
            filterable
            placeholder="全部基金公司"
            :disabled="status === 1 ? false : true"
          >
            <el-option
              v-for="item in orgaOptions"
              :key="item.companycode"
              :label="item.companysname"
              :value="item.companycode"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="分享标题:" prop="shareTitle">
          <el-input v-model="form.shareTitle" />
        </el-form-item>

        <el-form-item label="分享话术:" prop="shareDescription">
          <el-input v-model="form.shareDescription" />
        </el-form-item>

        <el-form-item label="分享图标">
          <el-upload
            class="avatar-uploader"
            action="/yjbapi/file/upload?target=local"
            :show-file-list="false"
            :on-success="handleIconSuccess"
            :before-upload="shareBannerBeforeAvatarUpload"
          >
            <img
              v-if="form.shareBanner"
              :src="form.shareBanner"
              class="avatar"
            >
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
        </el-form-item>

        <el-form-item label="活动banner" prop="bannerUrl">
          <el-upload
            class="avatar-uploader"
            action="/yjbapi/file/upload"
            :show-file-list="false"
            :on-success="handleBannerSuccess"
            :before-upload="bannerUrlBeforeAvatarUpload"
          >
            <img v-if="form.bannerUrl" :src="form.bannerUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
        </el-form-item>

        <el-form-item label="活动规则" prop="ruleUrl">
          <el-upload
            class="avatar-uploader"
            action="/yjbapi/file/upload"
            :show-file-list="false"
            :on-success="handleRuleSuccess"
            :before-upload="ruleUrlBeforeAvatarUpload"
          >
            <img v-if="form.ruleUrl" :src="form.ruleUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
        </el-form-item>

        <el-form-item label="活动顺序:" prop="sort">
          <el-input v-model="form.sort" />
        </el-form-item>
        <div v-if="titleText === '新增'">
          <el-form-item label="报名开始日期:" prop="registerTimeRange">
            <div class="block">
              <el-date-picker
                v-model="form.registerTimeRange"
                type="datetimerange"
                range-separator="至"
                start-placeholder="报名开始日期"
                end-placeholder="报名结束日期"
                :clearable="false"
                @blur="forceUpdate"
              />
            </div>
          </el-form-item>

          <el-form-item label="活动起止日期:" prop="activityTimeRange">
            <div class="block">
              <el-date-picker
                v-model="form.activityTimeRange"
                value-format="yyyyMMdd"
                format="yyyy-MM-dd"
                type="daterange"
                range-separator="至"
                start-placeholder="活动开始日期"
                end-placeholder="活动结束日期"
                :clearable="false"
                @blur="forceUpdate"
              />
            </div>
          </el-form-item>
        </div>
        <div v-else>
          <el-form-item label="报名开始日期:" prop="activityTimeRange">
            <div class="block">
              <el-date-picker
                v-model="form.registerTimeRange[0]"
                disabled
                style="width: 48%"
                type="datetime"
                :clearable="false"
                @blur="forceUpdate"
              />至
              <el-date-picker
                v-model="form.registerTimeRange[1]"
                :disabled="endDisplay"
                style="width: 45%"
                type="datetime"
                :clearable="false"
                @input="nice"
              />
            </div>
          </el-form-item>

          <el-form-item label="活动起止日期:" prop="activityTimeRange">
            <div class="block">
              <el-date-picker
                v-model="form.activityTimeRange[0]"
                disabled
                style="width: 40%"
                label="活动开始日期:"
                type="date"
                value-format="yyyyMMdd"
                format="yyyy-MM-dd"
                :clearable="false"
                placeholder="选择日期时间"
                @blur="forceUpdate"
              />
              至
              <el-date-picker
                v-model="form.activityTimeRange[1]"
                style="width: 40%"
                :disabled="endDisplay"
                label="活动结束日期:"
                type="date"
                value-format="yyyyMMdd"
                format="yyyy-MM-dd"
                :clearable="false"
                placeholder="选择日期时间"
                @blur="forceUpdate"
              />
            </div>
          </el-form-item>
        </div>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="resetForm">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </span>
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
      >
        <el-table-column
          prop="activityId"
          label="活动ID"
          width="200px"
          align="center"
        />
        <el-table-column
          prop="activityName"
          label="活动名称"
          width="200px"
          align="center"
        />
        <el-table-column
          prop="eitime"
          label="创建时间"
          :formatter="dateFormat"
          width="200px"
          align="center"
        />
        <el-table-column
          prop="startDate"
          label="活动开始时间"
          width="200px"
          align="center"
        />
        <el-table-column
          prop="endDate"
          label="活动截止时间"
          width="200px"
          align="center"
        />
        <el-table-column
          prop="registerStime"
          label="报名开始时间"
          :formatter="dateFormat"
          width="200px"
          align="center"
        />
        <el-table-column
          prop="registerEtime"
          label="报名结束时间"
          :formatter="dateFormat"
          width="200px"
          align="center"
        />
        <el-table-column
          prop="sort"
          label="排序字段"
          width="200px"
          align="center"
        />
        <el-table-column
          prop="status"
          label="活动状态"
          width="200px"
          align="center"
        >
          <template slot-scope="scope">
            {{ scope.row.status === 0 ? "待上线" : "已发布" }}
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="120">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="mini"
              @click="showEditForm(scope.row)"
            >编辑</el-button>
            <el-button
              v-if="scope.row.status === 0"
              type="text"
              size="mini"
              @click="statusPublish(scope.row)"
            >发布</el-button>
            <el-button
              v-if="
                scope.row.status === 9 && scope.row.activityId !== 'normal001'
              "
              type="text"
              size="mini"
              @click="statusAbandon(scope.row)"
            >下架</el-button>
            <el-button
              v-if="scope.row.activityId !== 'normal001'"
              type="text"
              size="mini"
              @click="statusDel(scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
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
    <Table />
  </div>
</template>

<script>
// import { numRegNotRequired } from '../../utils/index.js'
// import moment from 'moment'
import Table from '../table'
export default {
  filters: {},
  components: {
    Table
  },
  data() {
    return {}
  },
  computed: {},
  mounted() {},
  created() {
    this.tableName = this.$route.params.tableName
    // this.fetchListData()
  },
  methods: {}
}
</script>

<style lang="scss" scope>
</style>
