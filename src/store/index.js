import Vue from 'vue';
import Vuex from 'vuex';
import moduleHome from './moduleHome'
import modulePersonManage from './modulePersonManage'
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    home: moduleHome,
    person: modulePersonManage
  }
});
