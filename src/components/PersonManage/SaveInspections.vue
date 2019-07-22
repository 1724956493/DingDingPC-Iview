<template>
  <div>
    <commModule :pageType="pageType" :pageName="pageName" ref="commModule"></commModule>
  </div>
</template>

<script>
  import commModule from './comm/commModule.vue'


  export default {
    name: 'EnergyInspections',
    data() {
      return {
        pageType: 1,
        pageName: "安环部巡检",
        pageCode: "SaveInspections"
      }
    },
    components: {commModule},


    beforeRouteLeave(to, from, next) {
      //如果初始数据加载失败则返回主页面，且不进行缓存
      var dataStatus = this.$refs.commModule.constant.dataSataus;
      if (!dataStatus) {
        from.meta.keepAlive = false;
      } else {
        from.meta.keepAlive = true;
      }
      next();
    }
  }
</script>
