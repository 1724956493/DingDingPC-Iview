const state = {
  powerCode: "",
  userInfo: "",
  dingID: ""
}
const mutations = {
  savePowerCode(state, payload) {
    state.powerCode = payload.powerCode;
  },
  saveUserInfo(state, payload) {
    state.userInfo = payload.userInfo;
  },
  saveDingID(state, payload) {
    state.dingID = payload.dingID;
  }
}
const getters = {}
const actions = {
  saveUserInfoAction({commit}, payload) {
    commit('saveUserInfo', payload)
  }
}
const moduleHome = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
export default moduleHome;
