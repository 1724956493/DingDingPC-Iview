<template>

	<div class="mui-content">
		<moon-loading v-show="showLoading" position-el="body"></moon-loading>

		<div class="mui-card">
			<ul class="mui-table-view">
				<li class="mui-table-view-cell" id="total" style="font-size: larger;font-style: initial;">合计违章次数 ：{{total}} 次
				</li>
				<li class='li_reward mui-table-view-cell mui-collapse' v-for="(value,index) in filterDate">
					<a class='mui-navigate-right' style='width: 100%;'>违章日期：{{value.create_time}}</a>
					<div class='mui-collapse-content'>
						<table class='tab'>
							<tr>
								<th>违章明细:</th>
								<td>{{value.wzlistname}}</td>
							</tr>
							<tr>
								<th>违章备注:</th>
								<td>{{value.cknote}}</td>
							</tr>
							<tr>
								<th>违章日期:</th>
								<td>{{value.create_time}}</td>
								<!--<td>{{value.create_time | formatDate}}</td>-->
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
			this.pageType = this.$route.params.pageType;

			dd.biz.navigation.setTitle({
				//接收全局变量title
				title: '违章查询',
				onSuccess: function(data) {},
				onFail: function(err) {
					log.e(JSON.stringify(err));
				}
			});
			dd.biz.navigation.setRight({
				show: true, //控制按钮显示， true 显示， false 隐藏， 默认true
				control: true, //是否控制点击事件，true 控制，false 不控制， 默认false
				text: '刷新', //控制显示文本，空字符串表示显示默认文本
				onSuccess: function(result) {
					window.location.reload();
				},
				onFail: function(err) {}
			});
			this.preMountData()

		},
		data() {
			return {
				preMountUrl: "/json/dinguser_personManage_getBreakInforByPkpsndoc",
				pk_psndoc: "",
				breakDetail: [],
				pageType: "",
				showLoading: false
			}
		},
		computed: {
			path() {
				return this.comMethods.projectPath();
			},
			total() {
				return this.breakDetail.length;
			},
			filterDate() {
				//计算属性中使用过滤
				return this.breakDetail.filter(function(value) {
					value.create_time = this.comMethods.formatDate(value.create_time)
					return true;
				}.bind(this))
			}
		},
		filters: {
			//自定义过滤,不能有
			formatDate(date) {
				return;
			}
		},
		methods: {
			preMountData() {
				this.showLoading = true;
				var $this = this;
				this.$ajax.get(this.path + this.preMountUrl, {
						params: {
							pkpsndoc: this.pk_psndoc,
							pageType: this.pageType
						}
					})
					.then(function(response) {
						var data = response.data;
						if(data.success) {
							$this.breakDetail = data.obj;
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
		}
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