<template>
	<div class="mui-content">
		<moon-loading v-show="showLoading" position-el="body"></moon-loading>
		<!--<input type="text" v-model="pk_psndoc">-->
		<div class="mui-card">
			<div class='mycard_heard'>&nbsp;&nbsp;职业证书</div>
			<ul class="mui-table-view">
				<li class='li_reward mui-table-view-cell mui-collapse' v-cloak v-for="(value,index) in certificateFist">
					<a class='mui-navigate-right' style='width: 100%;'>证书名称： {{value.certname}}</a>
					<div class='mui-collapse-content'>
						<table class='tab'>
							<tr>
								<th width='40%'>证书类别:</th>
								<td>{{value.certtype}}</td>
							</tr>
							<tr>
								<th width='40%'>证书编号:</th>
								<td>{{value.certcode}}</td>
							</tr>
							<tr>
								<th width='40%'>证书名称:</th>
								<td>{{value.certname}}</td>
							</tr>
							<tr>
								<th width='40%'>取证日期:</th>
								<td>{{value.begindate}}</td>
							</tr>
							<tr>
								<th width='40%'>复审日期:</th>
								<td>{{value.reviewdate}}</td>
							</tr>
							<tr>
								<th width='40%'>截止日期:</th>
								<td>{{value.enddate}}</td>
							</tr>
						</table>
					</div>
				</li>
			</ul>

		</div>
		<div class="mui-card">
			<div class='mycard_heard'>&nbsp;&nbsp;焊工证书</div>
			<ul class="mui-table-view">
				<li class='li_reward mui-table-view-cell mui-collapse' v-cloak v-for="(value,index) in certificateSecond">
					<a class='mui-navigate-right' style='width: 100%;'>焊接类型： {{value.def3}}</a>
					<div class='mui-collapse-content'>
						<table class='tab'>
							<tr>
								<th width='40%'>证书编号:</th>
								<td>{{value.certcode}}</td>
							</tr>
							<tr>
								<th width='40%'>焊接类型:</th>
								<td>{{value.def3}}</td>
							</tr>
							<tr>
								<th width='40%'>焊接位置:</th>
								<td>{{value.def4}}</td>
							</tr>
							<tr>
								<th width='40%'>取证日期:</th>
								<td>{{value.begindate}}</td>
							</tr>
							<tr>
								<th width='40%'>复审日期:</th>
								<td>{{value.reviewdate}}</td>
							</tr>
						</table>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default {
		mounted() {
			this.pk_psndoc = this.$route.params.pk_psndoc;

			dd.biz.navigation.setTitle({
				//接收全局变量title
				title: '证书查询',
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
			this.preMountData();
		},
		data() {
			return {
				preMountUrl: "/json/dinguser_comm_getCertificate",
				pk_psndoc: "",
				certificate: [],
				showLoading: false
			}
		},
		computed: {
			path() {
				return this.comMethods.projectPath();

			},
			certificateFist() {
				return this.certificate.filter(function(value, index) {
					return value.def2 == 1;
				})
			},
			certificateSecond() {
				return this.certificate.filter(function(value, index) {
					return value.def2 == 2;
				})
			}
		},
		methods: {
			preMountData() {
				this.showLoading = true;
				var $this=this;
				this.$ajax.get(this.path + this.preMountUrl, {
						params: {
							pk_psndoc: this.pk_psndoc //private
						}
					})
					.then(function(response) {
						var data = response.data;
						if(data.success) {
							$this.certificate = data.obj;
						}
						else {
							mui.alert(data.msg, '提示');
						}
					})
					.catch(function(error) {
						 alert(error);
					}).then(function() {
						$this.showLoading = false;
					});
			}
		},
		watch: {}

	}
</script>

<style scoped>
	html,
	body {
		height: 100%;
		background: white;
	}
	
	.tab {
		width: 100%;
	}
	
	.tab th {
		width: 40%;
		border-bottom: 1px solid gray;
	}
	
	.tab td {
		text-indent: 1rem;
		/*border: 1px solid red;*/
		height: 3rem;
		width: 60%;
		border-bottom: 1px solid gray;
	}
</style>