import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    //快速申请入口模板信息
    apply: {
      tplTypeName: '',//模板名称
      tplTypeModel: '',//模板类型模式
      tplType: '',//模板类型
    },
    //快速申请指定模板信息
    template: {
      tplId: '',
      tplName: ''
    },
    //任务信息
    task: {
      bizTypeId: '',
      bizId: ''
    },
    //权益排行榜时间
    rankingTime: {
      startTime: '',
      endTime: ''
    },
    //业绩排行榜入口信息存储
    performanceData: {},
    //选择客户信息存储
    chooseCustomer: {}
  },
  mutations: {
    updataApply (state, payload) {
      state.apply = payload.apply
    },
    updataTemplate (state, payload) {
      state.template = payload.template
    },
    updataTask (state, payload) {
      state.task = payload.task
    },
    updataRankingTime (state, payload) {
      state.rankingTime = payload.rankingTime
    },
    updataPerformanceData (state, payload) {
      state.performanceData = payload.performanceData
    },
    updataChooseCustomer (state, payload) {
      state.chooseCustomer = payload.chooseCustomer
    }
  },
  actions: {
    updataApply ({commit}, apply) {
      commit({type: 'updataApply', apply: apply})
    },
    updataTemplate ({commit}, template) {
      commit({type: 'updataTemplate', template: template})
    },
    updataTask ({commit}, task) {
      commit({type: 'updataTask', task: task})
    },
    updataRankingTime ({commit}, rankingTime) {
      commit({type: 'updataRankingTime', rankingTime: rankingTime})
    },
    updataPerformanceData ({commit}, performanceData) {
      commit({type: 'updataPerformanceData', performanceData: performanceData})
    },
    updataChooseCustomer ({commit}, chooseCustomer) {
      commit({type: 'updataChooseCustomer', chooseCustomer: chooseCustomer})
    }
  }
})

export default store
