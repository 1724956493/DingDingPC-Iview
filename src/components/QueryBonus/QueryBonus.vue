<template>
	<div>
		<bonustemplate :sel-ykt="ad_ykt"  ></bonustemplate>
	</div>
</template>

<script>
	import bonustemplate from '../PersonManage/PersonIntegratedInfor.vue'
	export default {
		activated() {
			this.setTitle();
		},
		data() {
			return {
				ad_ykt: ""
			}
		},
		mounted() { 
			this.ad_ykt = this.$store.state.home.userInfo.ad_ykt;
		},
		components: {
			bonustemplate
		},
		methods: {

			setTitle() { 
				dd.biz.navigation.setTitle({
					//接收全局变量title
					title: '奖惩查询',
					onSuccess: function(data) {},
					onFail: function(err) {
						log.e(JSON.stringify(err));
					}
				});
				dd.biz.navigation.setRight({
					show: false, //控制按钮显示， true 显示， false 隐藏， 默认true
					control: true, //是否控制点击事件，true 控制，false 不控制， 默认false
					text: '刷新', //控制显示文本，空字符串表示显示默认文本
					onSuccess: function(result) {
						window.location.reload();
					},
					onFail: function(err) {}
				});
			}
		}
	}
</script>