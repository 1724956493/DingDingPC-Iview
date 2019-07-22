<template>
	<div class="mui-content">
		<moon-loading v-show="showLoading" position-el="body"></moon-loading>
		<table class='tabLayout'>
			<tr>
				<td width="30%">违章类型:</td>
				<td colspan="2">
					<select v-model="breakSataus" style="padding:0px;  font-size:1.2rem ; margin-bottom: 0px;margin-left: 15px;width:90%">
						<option v-for="option in breakSatausArray" :value="option.value">{{option.text}}</option>
					</select>

				</td>
			</tr>
			<tr v-show="breakSataus == 0">
				<td width="30%">项目 号:</td>
				<td colspan="2">
					<moon-autocomplete-input style="height: 2.5rem" v-model="projectCode" :data="projectsData" placeholder="选择或输入数据"
					 show-content="jobname" max-list="4"></moon-autocomplete-input>
				</td>
			</tr>
			<tr>
				<td width="30%">开始时间:</td>
				<td colspan="2"><input name="beginTime" type="text" @click="selectTime" v-model="beginTime" placeholder="点这选取日期"
					 readonly="readonly"></td>
			</tr>
			<tr>
				<td width="30%">结束时间:</td>
				<td width="40%"><input name="endTime" type="text" @click="selectTime" v-model="endTime" placeholder="点这选取日期" readonly="readonly"></td>
				<td width="30%" style="text-align: center;">
					<button type="button" class="mui-btn mui-btn-primary mui-icon mui-icon-search" @click="search">查询</button>
				</td>
			</tr>
		</table>

		<div style="padding: 10px 10px;">
			<div id="segmentedControl" class="mui-segmented-control">
				<a class="mui-control-item mui-active" href="#item1">待整改</a>
				<a class="mui-control-item" href="#item2">已整改</a>
			</div>
		</div>

		<div id="item1" class="mui-control-content mui-active">
			<ul class="mui-table-view">
				<li class='li_reward mui-table-view-cell mui-collapse' v-for="(value,index) in newData.beforChange" v-cloak>
					<a class='mui-navigate-right' style='width: 100%;'>违章日期： {{value.create_time}}
					</a>
					<div class='mui-collapse-content'>
						<table class='tab'>
							<tr>
								<th width='40%'>违章类型:</th>
								<td>{{value.type==0?'质量巡检':value.type==1?'安环巡检':'能源巡检'}}</td>
							</tr>
							<tr>
								<th width='40%'>违章明细:</th>
								<td>{{value.wzlistname}}</td>
							</tr>
							<tr>
								<th width='40%'>违章备注:</th>
								<td>{{value.cknote}}</td>
							</tr>
							<tr>

								<th width='40%'>违章日期:</th>
								<td>{{value.create_time}}
								</td>
							</tr>
							<tr>
								<th width='40%'>违章图片:</th>
								<td>
									<span @click="showPicBreak(value)">
									{{ value.image.length==0?'未提交图片': !value.showBreakPic?'点击加载图片':"点击图片预览"}}
								</span>
								</td>
							</tr>
							<tr v-if='value.showBreakPic'>
								<td colspan="2">
									<img v-gallery:value.uuid v-for="(val,index) in value.image.split(',')" :src="path+'/upload/'+val" style="height:50px;width:50px;margin-left:5px;margin-top:5px">

								</td>
							</tr>
							<tr>
								<th width='40%'>待整改:</th>
								<td>
									<table width="100%">
										<tr>
											<td width='5%' style="border: 0px solid red"><input style="margin-top:0px" type="checkbox" :id="index" v-model="arr[index]" /></td>
											<td width='95%' style="border: 0px solid blue"><label :for="index" style="display: block;margin-left:-10px">整改</label>
											</td>
										</tr>
									</table>
								</td>
							</tr>
							<tr v-show="arr[index]">
								<td colspan="2">
									<moon-upload-image v-model="base64Image[index]" :key="beforChangeUuid[index]" array-type="base64"></moon-upload-image>
								</td>
							</tr>

							<tr v-show="base64Image[index].length>0&&arr[index]">
								<th colspan='2' style='border-left: 1px solid gray;border-right: 1px solid gray;'>
									<button type='button' class='mui-btn mui-btn-outlined' style='width:100%;border:0' @click="submit(index)">
                   					 提交整改
                 					 </button>
								</th>
							</tr>
						</table>
					</div>
				</li>
			</ul>
		</div>
		<div id="item2" class="mui-control-content">
			<ul class="mui-table-view">
				<li class='li_reward mui-table-view-cell mui-collapse' v-for="(value,index) in newData.Changed" v-cloak>
					<a class='mui-navigate-right' style='width: 100%;'>违章日期： {{value.create_time}}
					</a>
					<div class='mui-collapse-content'>
						<table class='tab'>
							<tr>
								<th width='40%'>违章类型:</th>
								<td>{{value.type==0?'质量巡检':value.type==1?'安环巡检':'能源巡检'}}</td>
							</tr>
							<tr>
								<th width='40%'>违章明细:</th>
								<td>{{value.wzlistname}}</td>
							</tr>
							<tr>
								<th width='40%'>违章图片:</th>
								<td>
									<span @click="showPicBreak(value)">
									{{ value.image.length==0?'未提交图片': !value.showBreakPic?'点击加载图片':"点击图片预览"}}
								</span>
								</td>
							</tr>
							<tr v-if='value.showBreakPic'>
								<td colspan="2">
									<img v-gallery:value.uuid v-for="(val,index) in value.image.split(',')" :src="path+'/upload/'+val" style="height:50px;width:50px;margin-left:5px;margin-top:5px">
								</td>
							</tr>
							<tr>
								<th width='40%'>违章备注:</th>
								<td>{{value.cknote}}</td>
							</tr>
							<tr>
								<th width='40%'>违章日期:</th>
								<td>{{value.create_time}}</td>
							</tr>
							<tr>
								<th width='40%'>整改日期:</th>
								<td>{{value.def1}}</td>
							</tr>
							<tr>
								<th width='40%'>整改图片:</th>
								<td>
									<span @click="showPicReform(value)">
									{{ value.reformimage.length==0?'未提交图片': !value.showReformPic?'点击加载图片':"点击图片预览"}}
								</span>
								</td>
							</tr>
							<tr v-show='value.showReformPic'>
								<td colspan="2"> 
									<img v-gallery:value.uuid v-for="(val,index) in value.reformimage.split(',')" :src="path+'/upload/'+val"
									 style="height:50px;width:50px;margin-left:5px">
								</td>
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
			this.operatePK = this.$route.params.operatePK;
			this.queryStatus = this.$route.params.status;
			let title = this.queryStatus == "person" ? "负责人区域违章" : "本部门区域违章"
			dd.biz.navigation.setTitle({ //接收全局变量title
				title: title,
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

			this.endTime = this.comMethods.formatDate(new Date());
			this.beginTime = this.comMethods.getDateStr(-7);
			this.getProjectsData();
		},
		data() {
			return {
				searchUrl: "/json/dinguser_personManage_getBreakInforByOperator",
				submitUrl: "/json/dinguser_personManage_reformUpdate",
				getProjectUrl: '/json/dinguser_comm_getProjects',
				operatePK: "",
				arr: [],
				base64Image: [],
				getData: "",
				beginTime: "",
				endTime: "",
				showLoading: false,
				queryStatus: "",
				beforChangeUuid: [],
				breakSataus: -1,
				projectsData: [],
				projectCode: '',
				breakSatausArray: [{
					text: "全部",
					value: -1
				}, {
					text: "质量巡检",
					value: 0
				}, {
					text: "安环巡检",
					value: 1
				}, {
					text: "能源巡检",
					value: 2
				}]

			}
		},
		computed: {
			path() {
				return this.comMethods.projectPath();
			},
			newData: function() {
				var demo = {
					"beforChange": [],
					"Changed": []
				};
				this.beforChangeUuid = [];
				if(this.getData.length > 0) {
					this.getData.forEach(function(value, index) {
						value.create_time = this.comMethods.formatDate(value.create_time)
						value.indexP = index
						if(typeof value.cknote == "undefined") {
							value.cknote = "无";
						}
						if(value.reform == 0) {
							demo['beforChange'].push(value);
							this.beforChangeUuid.push(this.comMethods.guid())

						}
						else
							demo['Changed'].push(value);
					}.bind(this));
				}
				return demo
			}
		},
		methods: {
			showPicReform(value) {
				if(value.reformimage.length > 0)
					this.$set(this.getData[value.indexP], 'showReformPic', true)

			},
			showPicBreak(value) {
				if(value.image.length > 0)
					this.$set(this.getData[value.indexP], 'showBreakPic', true)
			},
			getProjectsData() {
				let $this = this;
				let url = this.path + this.getProjectUrl;
				this.showLoading = true;
				this.$ajax.get(url, {
					params: {
						projectType: '0001C110000000000DF7' // 当前用的是
					}
				}).then(function(response) {
					let data = response.data;
					if(data.success) {
						$this.projectsData = data.obj;
					}
				}).catch(function(error) {
					alert(error);
				}).then(function() {
					$this.showLoading = false; //关闭加载
				})
			},
			setInitData() {
				this.arr.splice(0);
				this.base64Image.splice(0);
				for(var i = 0; i < this.newData['beforChange'].length; i++) {
					this.arr.push(false);
					this.base64Image.push([]); //初始化图片数组
				}
			},
			selectTime: function(el) {
				var picker = new mui.DtPicker({
					type: 'date'
				});
				picker.show(function(rs) {
					if(el.target.name == "beginTime")
						this.beginTime = rs.text;
					if(el.target.name == "endTime")
						this.endTime = rs.text;
					picker.dispose();
				}.bind(this));
			},
			search: function() {
				if(this.beginTime > this.endTime) {
					mui.alert("开始时间不能大于结束时间，请重新选择时间", '提示');
					return;
				}

				var url = this.path + this.searchUrl;
				this.showLoading = true;
				var $this = this;
				this.$ajax.post(url, {
					pkpsndoc: this.operatePK,
					queryStatus: this.queryStatus,
					breakSataus: this.breakSataus,
					beginTime: this.beginTime,
					endTime: this.endTime,
					project: this.projectCode.pk_jobbasfil

				}).then(function(response) {
					var data = response.data;
					if(data.success) {
						$this.getData = data.obj;
						$this.setInitData();
					}
					else {
						mui.alert(data.msg, '提示');
					}
				}).catch(function(error) {
					alert(error);
				}).then(function() {
					$this.showLoading = false;
				});
			},
			submit: function(index) {
				//console.log(this.newData.beforChange[index].uuid)
				var submitData = {};
				var beforeData = this.newData.beforChange[index];
				beforeData.def1 = this.comMethods.formatDate(new Date());
				submitData.def1 = beforeData.def1;
				submitData.uuid = beforeData.uuid;
				submitData.reform = 1;
				submitData.reformimage = this.base64Image[index];
				if(submitData.reformimage.length == 0) {
					mui.alert('请选择上传图片');
					return;
				}
				if(submitData.reformimage.length > 2) {
					mui.alert('上传图片不得超过2张');
					return;
				}
				var url = this.path + this.submitUrl;
				var postData = JSON.stringify(submitData);
				this.showLoading = true;
				var $this = this;
				this.$ajax.post(url, {
					submitData: postData
				}).then(function(response) {
					var data = response.data;
					if(data.success) {
						mui.alert("提交成功", '提示');
						$this.search() //重新加载
						//更新所有依赖 this.newData.beforChange的数组
						/*	$this.arr.splice(index, 1);
							$this.base64Image.splice(index, 1);
							$this.beforChangeUuid.splice(index, 1);
							$this.newData.beforChange.splice(index, 1); //从未整改中移除数据 
							$this.newData.Changed.push(beforeData); //添加数据到已整改中*/
					}
					else {
						mui.alert(data.msg, '提示');
					}
				}).catch(function(error) {
					alert(error);
				}).then(function() {
					$this.showLoading = false;
				});
			}
		}
	}
</script>

<style>
	/* 全局样式 */
</style>
<style scoped>
	.moon-upLoadImg {
		margin-top: 15px;
		margin-left: -15px;
		margin-right: 18px;
	}
	
	.moon-upLoadImg>>>.moon-upLoadImg_ready_p {
		font-weight: bold;
	}
	
	.moon-upLoadImg>>>.moon-upLoadImg_ready_label {
		top: -2px;
		right: -3px;
	}
	
	.tab {
		width: 100%;
	}
	
	.tab>tr>th {
		width: 40%;
		border-bottom: 1px solid gray;
	}
	
	.tab>tr>td {
		text-indent: 1rem;
		/*border: 1px solid red;*/
		height: 3rem;
		width: 60%;
		border-bottom: 1px solid gray;
	}
	
	.mui-table-view-cell a span {
		font-size: 0.9rem;
	}
</style>