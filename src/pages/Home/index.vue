<template>
  <div class="dashboard-container">
    <div class="dashboard-text">基金模拟交易数据管理</div>
  </div>
</template>

<script>
import { filter, map, switchMap, tap } from "rxjs/operators"
import { interval, of, Subject, timer } from "rxjs"
import { requestMixinRxjs } from "@/utils/rxjsMixin"
import axios from "axios"

export default {
  name: "Home",
  computed: {},
  mixins: [requestMixinRxjs],
  mounted() {
    // this.homeNewStockSubject.next({
    //   type: "settings/homeNewStock",
    //   defaultState: [],
    //   payload: {
    //     current_date: "20211019",
    //   },
    // })

    
    // this.marketStatusSubject.next()


    // this.saveSearchHityorySubject.next({
    //   type: "settings/saveSearchHityory",
    //   defaultState: [],
    //   payload: {
    //     bizKey: "000005.SZ",
    //     bizType: "5",
    //     text: "世纪星源",
    //   },
    // })
  },

  domStreams: [
    "marketStatusSubject",
    "homeNewStockSubject",
    "saveSearchHityorySubject",
  ],
  subscriptions() {
    // 盘中的指数数据
    const marketStatus = this.marketStatusSubject.pipe(
      switchMap(() =>
        this.abstractPromise({
          type: "settings/marketStatus",
          defaultState: {},
        })
      ),
      map((res) => {
        // console.log(res)
        return res
      })
    )

    const hongNewStockArr = this.homeNewStockSubject.pipe(
      switchMap((requets) => this.abstractPromise(requets)),
      map((res) => {
        // console.log(res)
        return res
      })
    )

    const saveSearch = this.saveSearchHityorySubject.pipe(
      switchMap((requets) => this.abstractPromise(requets)),
      map((res) => {
        // console.log(res)
        return res
      })
    )

    return { marketStatus, hongNewStockArr, saveSearch }
  },
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
