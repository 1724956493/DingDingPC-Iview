<template>
	<div> 
		<!--class="mui-bar mui-bar-footer"-->
		<footer class="mui-bar mui-foot">
			<button @click="submitData" class="mui-btn mui-btn-block mui-btn-blue">提交</button>
		</footer>
		<div class="mui-content" v-cloak>
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
					<label>现场识别码:</label> <input v-model="initData.localid" type="text" placeholder="扫描获取数据" readonly="readonly">
				</div>
				<div class="mui-input-row">
					<label>入厂日期:</label> <input v-model="initData.start_used_date" type="text" placeholder="扫描获取数据"
					 readonly="readonly">
				</div>
				<div class="mui-input-row">
					<label>设备状态:</label> <input v-model="initData.usedstatus" type="text" placeholder="扫描获取数据" readonly="readonly">
				</div>
				<div style="text-align: center;margin-top:.9rem;" class="mui-input-row " v-show="initData.checkContent.length>0">
					<span id="check_title" style="font-weight: bold;font-size: 1em;">{{constant.checktitle}}</span>
				</div>
				<table class="tabLayout">
					<tr v-for="(value,index) in initData.checkContent">
						<td width="70%" style="margin:auto; font-size:17px;">{{index+1}}.{{value.checkcontent}}</td>
						<td>
							<select width="30%" style="margin:auto; font-size:17px;text-align: center " v-model="initData.selectModel[index]">
								<option value="0">达标</option>
								<option :value="value.uuid">不达标</option>
							</select>
						</td>
					</tr>

				</table>

				<textarea style="border: none" rows="5" placeholder="备注：" v-model="initData.cknote" v-show="initData.checkContent.length>0"></textarea>
			</div>
			<moon-loading v-show="constant.showLoading" position-el="body"></moon-loading>
			<!--右上角弹出菜单-->
			<moon-dropdown v-model="constant.dropShow">
				<ul class="moon-dropdown-ul">
					<li v-for="(value,index) in constant.menulist" :key="index" @click="menuSelected(index)">
						<moon-icon name="moon-icon-fangdajing"></moon-icon>
						{{value}}
					</li>
				</ul>
			</moon-dropdown>
		</div>
	</div>
</template>

<script>
	export default {
		activated() {
			this.initData.pk_ckuser = this.$store.state.home.userInfo.pk_psnbasdoc;
			this.initData.pk_ckdept = this.$store.state.home.userInfo.pk_deptdoc;
			this.constant.checkType = this.$route.params.type;
			switch(this.constant.checkType) {
				case "deptcheck01":
					this.constant.checktitle = "一级保养检查项"
					break;
				case "deptcheck02":
					this.constant.checktitle = "设备部巡查检查项"
					break;
				case "dailycheck":
					this.constant.checktitle = "日常检查项"
					break;
				case "functioncheck":
					this.constant.checktitle = "职能一级保养检查项"
					break;
			}
			this.preMounted()
		},
		computed: {
			path() {
				return this.comMethods.projectPath();
			}

		},
		methods: {
			preMounted() {
				var $this = this;

				dd.biz.navigation.setTitle({
					title: '设备保养检查',
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
						"text": "扫描"
					}, {
						"id": "1", //字符串
						"iconId": "add", //字符串，图标命名
						"text": "更多"
					}],
					onSuccess: function(data) {
						switch(data.id) {
							case '0':
								$this.constant.dropShow = false;
								$this.scan();
								break;
							case '1':
								$this.constant.dropShow = !$this.constant.dropShow;
								break;
							default:
								break;
						}
					},
					onFail: function(err) {}
				});
			},
			menuSelected(val) {
				this.constant.dropShow = false;
				switch(val) {
					case 0:
						this.query();
						break;
					default:
						break;
				}
			},
			scan() {
				var $this = this;
				this.reset();
				dd.biz.util.scan({
					type: "all",
					onSuccess: function(data) {
						var getdata = data.text;
						var url = $this.path + $this.constant.preMountUrl;
						$this.constant.showLoading = true; //显示加载
						$this.$ajax.get(url, {
								params: {
									equipPK: getdata,
									checkType: $this.constant.checkType
								}
							})
							.then(function(response) {
								var data = response.data;
								if(data.success) {
									var baseInfor = data.obj.baseInfor;
									if(baseInfor.success) {
										Object.assign($this.initData, baseInfor.obj[0]);
										var checkContent = data.obj.checkContent;
										if(checkContent.success) {
											Object.assign($this.initData.checkContent, checkContent.obj);
											$this.initData.checkContent.forEach(function(value, index) {
												$this.initData.selectModel.push(0) //默认达标
												// $this.initData.selectModel.push(value.uuid)//默认不达标
											});
										}
										else {
											mui.alert(checkContent.msg, '提示');
										}
									}
									else {
										mui.alert(baseInfor.msg, '提示');
									}
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
			},
			reset() {
				var r = {
					equip_code: "",
					equip_name: "",
					localid: "",
					model: "",
					spec: "",
					pk_equip: "",
					cknote: "",
					checkContent: [],
					selectModel: []
				}
				Object.assign(this.initData, r)
			},
			submitData() {
				var json = this.initData;
				if(json.pk_ckuser.trim().length == 0) {
					mui.alert("获取用户信息失败，请返回重新登录")
					return;
				}
				if(json.pk_equip.trim().length == 0) {
					mui.alert("请先扫描获取设备信息！")
					return;
				}
				if(json.checkContent.length == 0) {
					mui.alert("数据库中没有此设备的点检项,请勿提交")
					return;
				}
				json.ck4sstatus = this.constant.checkType;
				json.ckcpstatus = this.initData.equip_name;
				json.ckstatus = [];
				this.initData.selectModel.forEach(function(value) {
					if(value != "0") {
						var val = {
							"contentId": value
						};
						json.ckstatus.push(val);
					}
				})
				this.constant.showLoading = true;
				var url = this.path + this.constant.submitUrl;
				var $this = this;
				this.$ajax.post(url, {
						submitJson: JSON.stringify(json)
					})
					.then(function(response) {
						var data = response.data;
						if(data.success) {
							mui.alert("提交成功！");
							$this.reset();
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
			query() {
				if(!this.initData.pk_equip) {
					mui.alert("请先扫描");
					return;
				}
				this.constant.showLoading = true;
				var url = this.path + this.constant.queryUrl;
				var $this = this;
				this.$ajax.get(url, {
						params: {
							equipPK: this.initData.pk_equip
						}
					})
					.then(function(response) {
						var data = response.data;
						if(data.success) {
							$this.$router.push({
								name: 'EquipMaintQuery',
								params: {
									initData: data.obj[0]
								}
							})
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
			}
		},
		data() {
			return {
				constant: {
					showLoading: false,
					menulist: ["查询最近一次记录"],
					dropShow: false,
					preMountUrl: "/json/dinguser_equipManage_equipMaintainMounted",
					checkType: "",
					checktitle: "",
					submitUrl: "/json/dinguser_equipManage_equipMaintainSubmit",
					queryUrl: "/json/dinguser_equipManage_equipMaintainQuery"

				},
				initData: {
					pk_ckuser: "",
					pk_ckdept: "",
					equip_code: "",
					equip_name: "",
					localid: "",
					start_used_date: "",
					usedstatus: "",
					model: "",
					spec: "",
					pk_equip: "",
					cknote: "",
					checkContent: [],
					selectModel: []
				}
			}
		},
		beforeRouteLeave(to, from, next) {
			//alert(to.name)
			if(to.name === 'home') {
				this.reset();
			}
			next();
		}
	}
</script>

<style scoped>
	.moon-dropdown-ul {
		/*去li前面的点*/
		list-style-type: none;
		/*li顶格*/
		padding: 0px;
		margin: 0px;
		position: relative;
		/*文字缩进*/
		text-indent: 0.5em;
	}
	
	.moon-dropdown-ul>li {
		border-bottom: 1px solid #D0D0D0;
		/**字母大写   capitalize首字母大写  uppercase大写 lowercase 小写*/
		text-transform: uppercase;
		height: 3rem;
		line-height: 3rem;
	}
</style>