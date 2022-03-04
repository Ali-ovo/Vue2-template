<template>
  <div :class="{ 'has-logo': showLogo }">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item
          v-for="route in tableRoutes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapState } from "vuex"
import Logo from "./Logo"
import SidebarItem from "./SidebarItem"
import variables from "@/styles/variables.scss"

export default {
  components: { SidebarItem, Logo },
  data() {
    return {
      tableRoutes: [
        {
          path: "/database",
          meta: { title: "数据库表", icon: "el-icon-s-help" },
          children: [
            {
              path: "zuHeXinXi",
              meta: { title: "组合信息", icon: "table" },
            },
            {
              path: "zuHeChiCang",
              meta: { title: "组合持仓", icon: "table" },
            },
          ],
        },
        {
          path: "/operate",
          meta: { title: "运营管理", icon: "el-icon-s-help" },
          children: [
            {
              path: "huoDong",
              meta: { title: "活动", icon: "table" },
            },
          ],
        },
      ],
    }
  },
  computed: {
    ...mapState("settings", {
      sidebar: (state) => state.sidebar,
      // device: (state) => state.device,
      // fixedHeader: (state) => state.fixedHeader,
    }),
    routes() {
      // console.log(this.$router.options.routes)
      return this.$router.options.routes
    },
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    },
  },
  created() {},

  mounted() {
    // getTableNameList2().then(res => {
    //   console.log("#############TableNames################")
    //   console.log(res)
    //   this.tableRoutes[0].children = res.data
    // })
  },
}
</script>
