<template>
  <div class="mui-content" v-cloak>
    <table class='tabLayout'>
      <tr>
        <th width='40%'>点检员:</th>
        <td>{{initData.psnname}}</td>
      </tr>
      <tr>
        <th width='40%'>点检部门:</th>
        <td>{{initData.deptname}}</td>
      </tr>
      <tr>
        <th width='40%'>点检时间:</th>
        <td>{{initData.ckdatetime | formatDate}}</td>
      </tr>
      <tr v-for="(value,index) in initData.checkcontent" v-if="initData.checkcontent.length>=1 && initData.checkcontent[0]">
        <th width='40%' :rowspan='index==0?initData.checkcontent.length:""' v-if="index==0">不达标项:</th>
        <td>{{index+1+'.'+value}}</td>
      </tr>
      <tr v-else  >
        <th width='40%' colspan='2' style="text-align: center">没有任何违规项</th>
      </tr>
      <tr>
        <th width='40%'>设备名称:</th>
        <td>{{initData.ckcpstatus}}</td>
      </tr>
      <tr>
        <th width='40%'>点检类别:</th>
        <td>{{initData.ck4sstatus}}</td>
      </tr>
      <tr>
        <th width='40%'>备注:</th>
        <td>{{initData.cknote}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
  export default {
    mounted() {
      this.preMounted()
     this.initData= this.$route.params.initData;
      switch (this.initData.ck4sstatus) {
        case "deptcheck01":
          this.initData.ck4sstatus = "一级保养检查"
          break;
        case  "deptcheck02":
          this.initData.ck4sstatus = "设备部巡查"
          break;
        case  "dailycheck":
          this.initData.ck4sstatus = "日常检查"
          break;
        case  "functioncheck":
          this.initData.ck4sstatus = "职能一级保养检查"
          break;
      }
    },
    methods: {
      preMounted() {
        dd.biz.navigation.setTitle({
          //接收全局变量title
          title: '最近一次保养记录',
          onSuccess: function (data) {
          },
          onFail: function (err) {
            log.e(JSON.stringify(err));
          }
        });
        dd.biz.navigation.setRight({
          show: false, //控制按钮显示， true 显示， false 隐藏， 默认true
          control: true, //是否控制点击事件，true 控制，false 不控制， 默认false
          text: '刷新', //控制显示文本，空字符串表示显示默认文本
          onSuccess: function (result) {
            window.location.reload();
          },
          onFail: function (err) {
          }
        });
      }
    },
    data() {
      return {
        initData: {}
      }
    }
  }
</script>

<style scoped>
.tabLayout >tr>th{
  text-align: left;
}
.tabLayout >tr>td{
  text-align: left;
}
</style>
