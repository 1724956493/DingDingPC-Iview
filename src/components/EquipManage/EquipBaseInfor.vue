<template>
	<div class="mui-content">

		<moon-loading v-show="constant.showLoading" position-el="body"></moon-loading>
		<div class="mui-input-group">
			<div class="mui-input-row">
				<label>设备名称:</label> <input v-model="initData.equip_name" type="text" placeholder="扫描获取数据" readonly="readonly">
			</div>
			<div class="mui-input-row">
				<label>设备编号:</label> <input v-model="initData.equip_code" type="text" placeholder="扫描获取数据" readonly="readonly">
			</div>
			<div class="mui-input-row">
				<label>设备规格:</label> <input v-model="initData.model" type="text" placeholder="扫描获取数据" readonly="readonly">
			</div>
			<div class="mui-input-row">
				<label>设备型号:</label> <input v-model="initData.spec" type="text" placeholder="扫描获取数据" readonly="readonly">
			</div>
			<div class="mui-input-row">
				<label>隶属部门:</label> <input v-model="initData.equipdeptname" type="text" placeholder="扫描获取数据" readonly="readonly">
			</div>
			<div class="mui-input-row">
				<label>使用场地:</label> <input v-model="initData.equiplocatname" type="text" placeholder="扫描获取数据" readonly="readonly">
			</div>
			<div class="mui-input-row">
				<label>使用部门:</label> <input v-model="initData.equipusedeptname" type="text" placeholder="扫描获取数据"
				 readonly="readonly">
			</div>
			<div class="mui-input-row">
				<label>现场识别码:</label> <input v-model="initData.localid" type="text" placeholder="扫描获取数据" readonly="readonly">
			</div>
			<div class="mui-input-row">
				<label>入厂日期:</label> <input v-model="initData.start_used_date" type="text" placeholder="扫描获取数据" readonly="readonly">
			</div>
			<div class="mui-input-row">
				<label>设备状态:</label> <input v-model="initData.usedstatus" type="text" placeholder="扫描获取数据" readonly="readonly">
			</div>
			<div class="mui-input-row">
				<label>公司:</label> <input v-model="initData.equipcorp" type="text" placeholder="扫描获取数据" readonly="readonly">
			</div>

		</div>
	</div>
</template>

<script>
	export default {
		mounted() {
			this.perMounted()
		},
		computed: {
			path() {
				return this.comMethods.projectPath();
			}
		},
		data() {
			return {
				constant: {
					preMountUrl: "/json/dinguser_equipManage_getBaseInfor",
					showLoading: false
				},
				initData: {
					equip_code: "",
					equip_name: "",
					equipcorp: "",
					equipdeptname: "",
					equiplocatname: "",
					equipusedeptname: "",
					localid: "",
					model: "",
					pk_category: "",
					spec: "",
					pk_equip: "",
					start_used_date: "",
					usedstatus: ""
				}
			}
		},
		methods: {
			perMounted() {
				var $this = this;
				dd.biz.navigation.setTitle({
					//接收全局变量title
					title: '设备基本信息查询',
					onSuccess: function(data) {},
					onFail: function(err) {
						log.e(JSON.stringify(err));
					}
				});
				//设置导航栏右侧
				dd.biz.navigation.setMenu({
					backgroundColor: "#ADD8E6",
					textColor: "#ADD8E611",
					items: [{
						"id": "0", //字符串
						"iconId": "scan", //字符串，图标命名
						"text": "查询"
					}],
					onSuccess: function(data) {
						if(data.id == 0) {
							$this.scan();
						}
					},
					onFail: function(err) {}
				});
			},
			scan() {
				var $this = this;
				dd.biz.util.scan({
					type: "all",
					onSuccess: function(data) {
						var getdata = data.text;
						var url = $this.path + $this.constant.preMountUrl;
						$this.constant.showLoading = true; //显示加载 
						$this.$ajax.get(url, {
								params: {
									equipPK: getdata
								}
							})
							.then(function(response) {
								var data = response.data;
								if(data.success) {
									$this.initData = data.obj[0];
								}
								else {
									mui.alert(data.msg, '提示');
								}
							})
							.catch(function(error) {
								 alert(error);
							}).then(function() {
								$this.constant.showLoading = false;
							});
					},
					onFail: function(err) {}
				});
			}

		}
	}
</script>

<style>

</style>