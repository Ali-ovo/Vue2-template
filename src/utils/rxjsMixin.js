import { Subject, BehaviorSubject, from, zip, combineLatest } from 'rxjs'
import { map, tap, switchAll, switchMap, scan, startWith } from 'rxjs/operators'

export const requestMixinRxjs = {
  methods: {
    cache$Factory() {
      const cacheBehaviorSubject = new BehaviorSubject()
      const cache$ = cacheSubject.pipe(
        scan((pre, cur = {}) => {
          return { ...pre, ...cur }
        }, {})
      )

      return [cacheBehaviorSubject, cache$]
    },
    request$Factory() {
      const requestSubject = new Subject()
      const request$ = requestSubject.pipe(
        map(({ payload, type, defaultValue }) =>
          from(this.abstractPromise({ payload, type, defaultValue }))
        ),
        switchAll(),
        map((data) => data)
      )
      return [requestSubject, request$]
    },
    abstractPromise({ type = "", payload, defaultState }) {
      return new Promise((resolve, reject) => {
        this.$store.dispatch({
          type: type,
          payload: { ...payload },
          callback: (res = {}) => {
            let defaultData = defaultState
            if (res.code == 0) defaultData = res.data
            return resolve(defaultData)
          },
        })
      })
    },
  },
}
