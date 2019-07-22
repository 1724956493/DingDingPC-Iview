const state = {
  personYKT: "",
  bonousData:{"EnergyInspections":"","QualityInspections":"","SaveInspections":""}
}
const mutations = {
  savePersonYKT(state, payload) {
    state.personYKT = payload.personYKT;
  }
  ,
  saveBonousData(state,payload){
    state.bonousData[payload.pageCode]=payload.bonousData;
  }
}
const getters = {
}
const actions = {
  savePersonYKTAction({commit}, payload) {
    commit('savePersonYKT', payload)
  },
  saveBonousDataAction({commit},payload){
    commit('saveBonousData', payload)
  }
}
const modulePersonManage = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
export default modulePersonManage;
