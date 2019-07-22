<template>
	<div>
		<moon-loading v-show="showLoading" position-el="body"></moon-loading>
		<div class="mui-content">
			<table class="tabLayout">
				<tr>
					<td width="30%">姓名:</td>
					<td><input v-model="personName" type="text" placeholder="请输入被查询人姓名"></td>
				</tr>
				<tr>
					<td>部门：</td>
					<td>
						<moon-autocomplete-input style="height: 2.5rem" v-model="deptName" :data="deptList" placeholder="选择输入部门名"
						 show-content="deptname" max-list="5"></moon-autocomplete-input>
					</td>
				</tr>
			</table>
			<ul class="mui-table-view">
				<li class="mui-table-view-cell" style="pointer-events:none; ">
					<table class="tab" width="100%" style="height: 1rem;">
						<tr>
							<th width='30%'>一卡通号</th>
							<th width='30%'>姓名</th>
							<th width='40%'>所在部门</th>
						</tr>
					</table>
				</li>
				<li class='mui-table-view-cell content-list' v-cloak v-for="(value,index) in listInfo" @click="returnBack(value.bh)">

					<table class='tab' width='100%' v-cloak>
						<tr>
							<td width='30%'>{{value.bh}}</td>
							<td width='30%'>{{value.xm}}</td>
							<td width='40%'>{{value.bm.trim().toUpperCase()}}</td>
						</tr>
					</table>
				</li>
			</ul>

		</div>
		<footer class="mui-bar mui-bar-footer">
			<button class="mui-btn mui-btn-block mui-btn-blue" type="button" @click="query">查询
      </button>
		</footer>
	</div>
</template>

<script>
	import { mapActions } from 'vuex'

	export default {

		mounted() {

			this.setTitleData();
			this.preMountData();
		},
		data() {
			return {
				deptUrl: "/json/dinguser_comm_getDeptInfor",
				getPersonListUrl: "/json/dinguser_comm_getPersonListByNameOrDeptName",
				personName: "",
				deptName: "",
				listInfo: [],
				deptList: [], //一卡通部门信息,
				showLoading: false
			}
		},
		computed: {
			path() {
				return this.comMethods.projectPath();
			}
		},
		methods: {
			...mapActions('person', [
				'savePersonYKTAction'
			]),
			returnBack(val) {
				this.savePersonYKTAction({
					personYKT: val
				})
				this.$router.go(-1);
			},
			preMountData() {
				this.showLoading = true;
				var $this = this;
				this.$ajax.get(this.path + this.deptUrl)
					.then(function(response) {
						var data = response.data;
						if(data.success) {
							$this.deptList = data.obj;
						}
						else {
							mui.alert(data.msg, '提示', function() {
								$this.$router.go(-1);
							});
						}
					})
					.catch(function(error) {
						alert(error);
					}).then(function() {
						$this.showLoading = false;
					});
			},
			query() {
				//加延迟，以防数据在未变动前执行，如自动完成输入，当还在处于匹配状态时，点击按钮，就会出现数据更新不及时
				setTimeout(() => {
					var name = this.personName;
					var deptname = this.deptName.deptname ? this.deptName.deptname : "";
					if(name.trim().length == 0 && deptname.trim().length == 0) {
						mui.alert("数据量过大,请重新筛选！");
						return;
					}
					this.showLoading = true;
					var $this = this;
					this.$ajax.get(this.path + this.getPersonListUrl, {
							params: {
								name: name,
								deptname: deptname
							}
						})
						.then(function(response) {
							var data = response.data;
							if(data.success) {
								$this.listInfo = data.obj;
							}
							else {

								mui.alert(data.msg, '提示');
								$this.listInfo = [];
							}
						})
						.catch(function(error) {
							alert(error);
							$this.listInfo = [];
						}).then(function() {
							$this.showLoading = false;
						});
				}, 500);
			},
			setTitleData() {

				dd.biz.navigation.setTitle({
					title: '人员定位查询',
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

		},
		beforeRouteEnter(to, from, next) {
			//不能获取this
			// 设置下一个路由的 meta
			// to.meta.keepAlive = true;  // 让 A 缓存，即不刷新
			next();
		},
		beforeRouteLeave(to, from, next) {
			//    to.meta.keepAlive = true;
			next();
		}
	}
</script>
<style scoped>
	.tab>tr {
		text-align: center;
		vertical-align: middle;
		height: 0.8rem;
	}
	
	.tab {
		background: white;
	}
</style>