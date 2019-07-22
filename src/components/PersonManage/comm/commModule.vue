<template>
	<div>
		<moon-loading v-show="constant.showLoading" position-el="body"></moon-loading>
		<footer class="mui-bar mui-foot">
			<button @click="submit()" class="mui-btn mui-btn-block mui-btn-blue" type="button">提交
      		</button>
		</footer>
		<div class="mui-content">
			<table class='tabLayout'>
				<tr>
					<td colspan="2" style=" border-bottom: 0px solid #D0D0D0; text-align: center">
						<img style="height:6rem;" :src="initData.headImg" />
					</td>
				</tr>
				<tr>
					<td width="30%">员工姓名:</td>
					<td>
						<input type="text" placeholder="查询获取数据" readonly="readonly" v-model="initData.name">
					</td>
				</tr>
				<tr>
					<td>员工编号:</td>
					<td>
						<input type="text" placeholder="查询获取数据" readonly="readonly" v-model="initData.ykt">
					</td>
				</tr>
				<tr>
					<td>性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别:</td>
					<td>
						<input type="text" placeholder="查询获取数据" readonly="readonly" v-model="initData.sex">
					</td>
				</tr>
				<tr>
					<td>年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;龄:</td>
					<td>
						<input type="text" placeholder="查询获取数据" readonly="readonly" v-model="initData.age">
					</td>
				</tr>
				<tr>
					<td>部门名称:</td>
					<td>
						<input type="text" placeholder="查询获取数据" readonly="readonly" v-model="initData.dept">
					</td>
				</tr>
				<tr>
					<td>工作部门:</td>
					<td>
						<input type="text" placeholder="查询获取数据" readonly="readonly" v-model="initData.usedept">
					</td>
				</tr>
				<tr>
					<td>员工信息:</td>
					<td>
						<table class="tabInner">
							<tr>
								<td width=40%>
									<input style="margin-top: 0px" type="radio" value="0" id="ok" v-model="initData.right" />
									<label for="ok">正确</label>
								</td>
								<td>
									<input style="margin-top: 0px" type="radio" value="1" id="no" v-model="initData.right" />
									<label for="no">错误</label>
								</td>
							</tr>
						</table>
					</td>
				</tr>
				<tr>
					<td>主管领导:</td>
					<td>
						<moon-autocomplete-input style="height: 2.5rem" v-model="initData.empleader" :data="constant.leadersData"
						 placeholder="选择或输入数据" show-content="psnname" max-list="4"></moon-autocomplete-input>
					</td>
				</tr>
				<tr v-show="pageType == 0">
					<td>项目 号:</td>
					<td>
						<moon-autocomplete-input style="height: 2.5rem" v-model="initData.project" :data="constant.projectsData"
						 placeholder="选择或输入数据" show-content="jobname" max-list="4"></moon-autocomplete-input>
					</td>
				</tr>
				<tr v-show="pageType == 0">
					<td>处罚单号:</td>
					<td>
						<input type="text" placeholder="请输入处罚单号" v-model="initData.def2">
					</td>
				</tr>
				<tr>
					<td>奖惩状态:</td>
					<td>
						<table class="tabInner">
							<tr>
								<td width=40%>
									<input style="margin-top: 0px" type="radio" value="合格" id="checkOk" v-model="initData.status" />
									<label for="checkOk">合格</label>
								</td>
								<td>
									<input style="margin-top: 0px" type="radio" value="违规" id="checkNo" v-model="initData.status" />
									<label for="checkNo">违规</label>
								</td>
							</tr>
						</table>
					</td>
				</tr>

				<tr v-show="showBreaks">
					<td colspan="2" style="text-align: center">
						<span style="font-weight: bold;font-size: larger;">违 规 项</span>
					</td>
				</tr>
				<tr v-show="showBreaks">
					<td colspan="2" style="text-align: left;">
						<ul class="mui-table-view " v-cloak v-for="(value,index) in constant.bonousData">
							<li class='mui-table-view-cell mui-collapse'>
								<a class='mui-navigate-right' href='#' v-text="value.wzname"></a>
								<div class='mui-collapse-content'>
									<table class="BonusList" width="100%">
										<tr v-for="(value2,index2) in value.child">
											<td width='5%'>
												<input style="margin-top:10px;margin-bottom:10px;" name='bonus' type='radio' :id="index+''+index2" :value="value2.uuid"
												 v-model="initData.bonus" />
											</td>
											<td width='95%'>
												<label style="display: block;margin-top:10px;margin-bottom:10px;margin-left:5px;" :for="index+''+index2">{{value2.wzlistname}}</label>
											</td>
										</tr>
									</table>
								</div>
							</li>
						</ul>
					</td>
				</tr>
				<tr>
					<td colspan="2">
						<moon-upload-image v-model="initData.base64Image" array-type="base64"></moon-upload-image>
					</td>
				</tr>
				<tr>
					<td colspan='2'>
						<textarea style="border: none" name="cknote" rows="5" placeholder="备注：" v-model="initData.cknote"></textarea>
					</td>
				</tr>

			</table>
		</div>

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
</template>

<script>
	import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'

	export default {
		name: 'commModule',
		activated() {
			this.setTitleData();
			if(!this.initData.operate) {
				this.initData.operate = this.$store.state.home.userInfo.pk_psndoc;
			}
		},
		mounted() {
			this.constant.pageType = this.pageType;
			this.constant.pageName = this.pageName;
			this.setTitleData();
			//从vuex获取数据
			this.initData.operate = this.$store.state.home.userInfo.pk_psndoc;
			this.preMountData();
		},
		props: ["pageType", "pageName"],
		data() {
			return {
				constant: {
					preMountUrl: "/json/dinguser_personManage_getMountedData",
					queryByOneCodeUrl: "/json/dinguser_comm_getPersonInfoByYKT",
					submitUrl: "/json/dinguser_personManage_submit",
					bonousData: "",
					dataSataus: true, //判断数据是否加载全
					pageType: "", //路由获取页面类型0质量1安环2设备
					pageName: "", //路由获取页面标题
					leadersData: [], //主管领导数据源
					projectsData: [], //项目数据源
					showLoading: false, //显示加载
					menulist: ["定位查询", "证书查询", "违章查询", "违章查询及整改"],
					dropShow: false

				},
				initData: {
					pk_psndoc: "", //员工PK
					operate: "", //登陆用户pk
					headImg: "images/1.png",
					name: "", //员工姓名
					ykt: "", //员工一卡通
					sex: "", //员工性别
					age: "", //员工年龄
					dept: "", //隶属部门
					usedept: "", //当前工作部门
					right: "0", //员工信息 0正确 1错误
					project: "", //项目号pk
					empleader: "", //主管领导PK
					status: "合格", //奖惩状态
					base64Image: [], //上传图片转Base64String
					bonus: "", //违章内容
					cknote: "", //备注,
					def2: "", //处罚单号
				}
			}
		},
		computed: {
			path() {
				return this.comMethods.projectPath();

			},
			...mapState('home', ['userInfo']),
			...mapState('person', ['personYKT']),
			showBreaks() {
				if(this.initData.status === "合格") {
					return false;
				}
				else {
					return true;
				}
			},
			submitData() {
				var json = JSON.parse(JSON.stringify(this.initData));
				json.empleader = json.empleader["uuid"] ? json.empleader["uuid"] : "";
				json.project = json.project["pk_jobbasfil"] ? json.project["pk_jobbasfil"] : "";
				json.type = this.constant.pageType;
				delete json.headImg;
				return json;
			}

		},
		methods: {
			setTitleData() {
				//获取Vuex中Person空间里的人员一卡通
				var ykt = this.personYKT;
				//判断是否直接执行查询人员信息
				if(ykt.length > 0) {
					this.queryByOneCode(ykt);
					//修改Vuex中Person空间里的人员一卡通
					this.savePersonYKTAction({
						personYKT: ""
					})
				}
				var $this = this;

				//设置导航栏右侧
				dd.biz.navigation.setMenu({
					backgroundColor: "#ADD8E6",
					textColor: "#ADD8E611",
					items: [{
						"id": "0", //字符串
						"iconId": "search", //字符串，图标命名
						"text": "查询"
					}, {
						"id": "1", //字符串
						"iconId": "add", //字符串，图标命名
						"text": "更多"
					}],
					onSuccess: function(data) {
						switch(data.id) {
							case '0':
								$this.constant.dropShow = false;
								$this.inputSearch();
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
				dd.biz.navigation.setTitle({
					title: $this.constant.pageName,
					onSuccess: function(data) {},
					onFail: function(err) {
						log.e(JSON.stringify(err));
					}
				});
			},
			...mapActions('person', [
				'savePersonYKTAction'
			]),
			menuSelected(val) {
				this.constant.dropShow = false;
				switch(val) {
					case 0:
						this.$router.push({
							name: 'QueryByPosition'
						});
						break;
					case 1:
						var pk_psndoc = this.initData.pk_psndoc;
						if(pk_psndoc && pk_psndoc.length > 0)
							this.$router.push({
								name: 'QueryCertificate',
								params: {
									pk_psndoc: pk_psndoc
								}
							});
						else
							mui.alert("请先获得人员信息！")
						break;
					case 2:
						var pk_psndoc = this.initData.pk_psndoc;
						var pageType = this.pageType;
						if(pk_psndoc && pk_psndoc.length > 0)
							this.$router.push({
								name: 'QueryBreakDetail',
								params: {
									pk_psndoc: pk_psndoc,
									pageType: pageType
								}
							});
						else
							mui.alert("请先获得人员信息！")
						break;
					case 3:
						var operatePK = this.initData.operate;
						if(operatePK && operatePK.length > 0)
							this.$router.push({
								name: 'Reform',
								params: {
									operatePK: operatePK,
									status: "person"
								}
							});
						else
							mui.alert("获取用户PK失败，请刷新或重新登陆！")
						break;
					default:
						break;
				}

			},
			//渲染前加载数据
			preMountData: function() {
				var $this = this;
				this.constant.showLoading = true; //显示加载
				this.$ajax.get(this.path + this.constant.preMountUrl, {
						params: {
							type: this.constant.pageType
						}
					}).then(function(response) {
						var data = response.data;
						if(data.success) {
							var leaders = data.obj.leaders;
							var ruleTree = data.obj.ruleTree;
							if(leaders.success) {
								$this.constant.leadersData = leaders.obj;
							}
							else {
								$this.constant.dataSataus = false;
								mui.alert(leaders.msg, '提示');
							}
							if(ruleTree.success) {
								$this.constant.bonousData = ruleTree.obj;
							}
							else {
								$this.constant.dataSataus = false;
								mui.alert(ruleTree.msg, '提示');
							}
							if($this.constant.pageType == 0) {
								var projects = data.obj.projects;
								if(projects.success) {
									$this.constant.projectsData = projects.obj;
								}
								else {
									$this.constant.dataSataus = false;
									mui.alert(projects.msg, '提示')
								}
							}

						}
						else {
							$this.constant.dataSataus = false;
							mui.alert(data.msg, '提示');
						}
					})
					.catch(function(error) {
						$this.constant.dataSataus = false;
						alert(error);
					}).then(function() {
						$this.constant.showLoading = false; //关闭加载
					});

				//如果初始数据加载失败则返回主页面，且不进行缓存
				if(!this.constant.dataSataus) {
					this.$router.go(-1);
				}
			},
			reset: function() {
				this.initData.base64Image.splice(0, this.initData.base64Image.length);
				var saveArray = this.initData.base64Image;
				this.initData = {
					operate: this.$store.state.home.userInfo.pk_psndoc, //登陆用户pk
					headImg: "images/1.png",
					name: "", //员工姓名
					ykt: "", //员工一卡通
					sex: "", //员工性别
					age: "", //员工年龄
					dept: "", //隶属部门
					usedept: "", //当前工作部门
					right: "0", //员工信息 0正确 1错误
					empleader: "", //主管领导PK
					project: "",
					status: "合格", //奖惩状态
					bonus: "", //违章内容
					cknote: "", //备注
					base64Image: saveArray
				}

			},
			//输入一卡通查询
			inputSearch: function() {
				var $this = this;
				mui.prompt('请输入被查询人的一卡通号', '', '输入查询', ['取消', '确定'], function(e) {
					if(e.index == 1) {
						$this.queryByOneCode(e.value);
					}
					else {

					}
				});
			},
			//通过一卡通查询数据
			queryByOneCode(onecode) {
				this.constant.showLoading = true;
				var $this = this;
				var url = this.path + this.constant.queryByOneCodeUrl;
				this.$ajax.get(url, {
						params: {
							// onecode: '321040297'
							onecode: onecode.trim()
						}
					})
					.then(function(response) {
						var data = response.data;
						if(data.success) {
							$this.initData = $this.addInitData($this.initData, data.obj[0])
						}
						else {
							//显示捕获错误信息
							mui.alert(data.msg, '提示', function() {
								$this.reset();
							});
						}
					})
					.catch(function(error) {
						alert(error);
					})
					.then(function() {
						$this.constant.showLoading = false;
					});
			},
			addInitData(initData, objData) {

				for(var key in objData) {

					initData[key] = objData[key];
				}
				return initData;
			},
			submit: function() {

				var json = this.submitData;
				if(json.base64Image.length > 2) {
					mui.alert("上传图片不得超过2张");
					return;
				}
				if(this.pageType == 1 && json.base64Image.length == 0) {
					mui.alert("请上传图片");
					return;
				}
				if(this.pageType == 1 && !json.cknote.trim()) {
					mui.alert("请填写备注");
					return;
				}
				if(json.status == "合格")
					json.bonus = "";
				else if(!(json.bonus && json.bonus.length > 1)) {
					mui.alert("请选择违规项");
					return;
				}
				if(!json.pk_psndoc || json.pk_psndoc === "") {
					mui.alert("请先输入并查询一卡通数据");
					return;
				}
				if(!json.empleader || json.empleader === "") {
					mui.alert("请选择主管领导");
					return;
				}
				if(!json.operate || json.operate === "") {
					mui.alert("未能获取到操作员PK,请重新进入页面");
					return;
				}
				if(json.status != "合格" && this.pageType == 0 && (!json.def2 || json.def2.trim().length == 0)) {
					mui.alert("请输入处罚单号");
					return;
				}
				this.constant.showLoading = true;
				var url = this.path + this.constant.submitUrl;
				var $this = this;
				this.$ajax.post(url, {
					submitJson: JSON.stringify(json)
				}).then(function(response) {
					var data = response.data;
					if(data.success) {
						mui.alert("提交成功！");
						$this.reset();
					}
					else {
						mui.alert(data.msg, '提示');
					}
				}).catch(function(error) {
					alert(error);
				}).then(function() {
					$this.constant.showLoading = false;
				});
			}
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
	
	.tabInner {
		margin-left: 5%;
		width: 95%;
	}
	
	.tabInner>tr>td {
		border-bottom: 0px solid #D0D0D0;
	}
	
	.BonusList>tr>td {
		/*text-indent: 1rem;//文字缩进*/
		text-align: left;
		border: 0px solid red;
		/*vertical-align:bottom; !*文字向下显示*!*/
		height: 2.5rem;
		border-bottom: 1px solid #D0D0D0;
		font-family: '宋体';
		font-size: 18px;
	}
</style>