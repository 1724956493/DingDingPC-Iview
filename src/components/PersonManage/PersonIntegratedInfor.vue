<template>
	<div>
		<moon-loading v-show="constant.showLoading" position-el="body"></moon-loading>

		<div class='mui-card'>
			<div class='mui-card-content'>
				<div class='mycard_heard'>人员基本信息</div>
				<div class='mycard_body'>
					<table class='tabLayout'>
						<tr>
							<td colspan="2" style=" border-bottom: 0px solid #D0D0D0; text-align: center">
								<img style="height:6rem;" :src="initData.headImg" />
							</td>
						</tr>
						<tr>
							<td>员工编号:</td>
							<td>
								<input type="text" placeholder="查询获取数据" readonly="readonly" v-model="initData.ykt">
							</td>
						</tr>
						<tr>
							<td width="30%">员工姓名:</td>
							<td>
								<input type="text" placeholder="查询获取数据" readonly="readonly" v-model="initData.name">
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
							<td>隶属部门:</td>
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
							<td>联系方式:</td>
							<td>
								<input type="text" placeholder="查询获取数据" readonly="readonly" v-model="initData.mobile">
							</td>
						</tr>
					</table>
				</div>
			</div>
		</div>
		<div class='mui-card'>
			<div class='mui-card-content'>
				<div class='mycard_heard'>职业证书</div>
				<ul class="mui-table-view">
					<li class="mui-table-view-cell" style="font-size: larger;font-style: initial;">合计拥有证书：{{certificateFist.length}}本
					</li>
					<li class='li_reward mui-table-view-cell mui-collapse' v-cloak v-for="(value,index) in certificateFist">
						<a class='mui-navigate-right' style='width: 100%;'>证书名称： {{value.certname}}</a>
						<div class='mui-collapse-content'>
							<table class='tab'>
								<tr>
									<th width='40%'>证件类别:</th>
									<td>{{value.certtype}}</td>
								</tr>
								<tr>
									<th width='40%'>证件编号:</th>
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
		</div>
		<div class="mui-card">
			<div class='mycard_heard'>焊工证书</div>
			<ul class="mui-table-view">
				<li class="mui-table-view-cell" style="font-size: larger;font-style: initial;">合计拥有证书：{{certificateSecond.length}}本
				</li>
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
		<div class='mui-card'>
			<div class='mui-card-content'>
				<div class='mycard_heard'>
					<table>
						<thead>
							<tr>
								<th width='20%'> 违章信息</th>
								<th style="text-align: right">
									<span @click="selectTime('beg')"> 
										 {{begTime}}
									</span> ~
									<span @click="selectTime('end')"> 
										 {{endTime}}
									</span>
								</th>

							</tr>
						</thead>
					</table>

				</div>

				<ul class="mui-table-view">
					<li class="mui-table-view-cell" style="font-size: larger;font-style: initial;">合计违章次数 ：{{total}} 次
					</li>
					<li class='li_reward mui-table-view-cell mui-collapse' v-for="(value,index) in filterDate">
						<a class='mui-navigate-right' style='width: 100%;'>违章类型: {{value.type}} , 违章日期：{{value.create_time}}</a>
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
								</tr>
								<tr>
									<th>违章类型:</th>
									<td>{{value.type}}</td>
								</tr>
							</table>
						</div>
					</li>
				</ul>

			</div>
		</div>

		<bonustemplate :psnbasdoc="pk_psnbasdoc"></bonustemplate>
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
	import bonustemplate from '../QueryBonus/QueryBonusComp.vue'

	export default {
		props: {
			selYkt: {
				type: String,
				default: ""
			}
		},
		mounted() {
			this.endTime = this.comMethods.formatDate(new Date());
			let y = parseInt(this.endTime.split("-")[0]);
			let m = parseInt(this.endTime.split("-")[1]);
			this.begTime = this.comMethods.formatDate(new Date(y, m - 4, 1))
			this.setTitleData();

		},
		data() {
			return {
				constant: {
					queryByOneCodeUrl: "/json/dinguser_presonManage_getPersonIntegratedInfor",
					queryByPkUrl: "/json/dinguser_personManage_getBreakInforByPkpsndocAll",
					showLoading: false, //显示加载
					menulist: ["定位查询"],
					dropShow: false
				},
				initData: {
					headImg: "images/1.png",
					name: "", //员工姓名
					ykt: "", //员工一卡通
					sex: "", //员工性别
					age: "", //员工年龄
					dept: "", //隶属部门
					usedept: "", //当前工作部门
					mobile: ""
				},
				breakDetail: [],
				certificate: [],
				pk_psnbasdoc: "",
				begTime: "",
				endTime: "",
				pk_psndoc: ""
			}
		},
		components: {
			bonustemplate
		},
		watch: {
			begTime(val, old) {
				if(old && this.pk_psndoc) {
					this.queryByPk();
				}
			},
			endTime(val, old) {
				if(old && this.pk_psndoc) {
					this.queryByPk();
				}
			},
			selYkt(val) {
				if(val) { 
					//当作为组件时，就显示本人的奖惩信息
					this.queryByOneCode(this.selYkt)
				}
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
			},
			...mapState('person', ['personYKT']),
			total() {
				return this.breakDetail.length;
			},
			filterDate() {
				//计算属性中使用过滤
				return this.breakDetail.filter(function(value) {
					value.create_time = this.comMethods.formatDate(value.create_time);
					switch(value.type) {
						case '0':
							value.type = "质量违章";
							break;
						case '1':
							value.type = "安环违章";
							break;
						case '2':
							value.type = "能源违章";
							break;
						default:
							break;
					}
					return true;
				}.bind(this))
			}

		},

		methods: {
			selectTime(el) {
				var picker = new mui.DtPicker({
					type: 'date'
				});
				picker.show(function(rs) {
					if(el == "beg")
						this.begTime = rs.text;
					if(el == "end")
						this.endTime = rs.text;
					picker.dispose();
				}.bind(this));
			},
			setTitleData() {
				//获取Vuex中Person空间里的人员一卡通
				var ykt = this.personYKT
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
					title: '人员信息综合查询',
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
					default:
						break;
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
			queryByPk() {
				this.constant.showLoading = true;
				var url = this.path + this.constant.queryByPkUrl;
				var $this = this;
				this.$ajax.get(url, {
						params: {
							pk_psndoc: this.pk_psndoc,
							beginTime: this.begTime,
							endTime: this.endTime
						}
					})
					.then(function(response) {
						var data = response.data;
						if(data.success) {
							if(data.success) {
								$this.breakDetail = data.obj;
							}
							else {
								// mui.alert(breakInfor.msg, '提示');
							}
						}
						else {
							//显示捕获错误信息
							mui.alert(data.msg, '提示');
							$this.breakDetail.splice(0)
						}
					})
					.catch(function(error) {
						alert(error);
					})
					.then(function() {
						$this.constant.showLoading = false;
					});

			},
			//通过一卡通查询数据
			queryByOneCode(onecode) {
				this.constant.showLoading = true;
				var url = this.path + this.constant.queryByOneCodeUrl;
				var $this = this;
				this.$ajax.get(url, {
						params: {
							onecode: onecode.trim(),
							beginTime: this.begTime,
							endTime: this.endTime
						}
					})
					.then(function(response) {
						var data = response.data;
						if(data.success) {
							var personBaseInfor = data.obj.PersonBaseInfor;
							if(personBaseInfor.success) {
								$this.initData = personBaseInfor.obj[0];
								$this.pk_psnbasdoc = personBaseInfor.obj[0].pk_psnbasdoc;
								$this.pk_psndoc = personBaseInfor.obj[0].pk_psndoc;
								var breakInfor = data.obj.BreakInfor;
								if(breakInfor.success) {
									$this.breakDetail = breakInfor.obj;
								}
								else {
									// mui.alert(breakInfor.msg, '提示');
								}
								var certificate = data.obj.Certificate;
								if(certificate.success) {
									$this.certificate = certificate.obj;
								}
								else {
									//  mui.alert(certificate.msg, '提示');
								}

							}
							else {
								mui.alert(personBaseInfor.msg, '提示');
							}

						}
						else {
							//显示捕获错误信息
							mui.alert(data.msg, '提示');
						}
					})
					.catch(function(error) {
						alert(error);
					})
					.then(function() {
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