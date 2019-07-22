<template>
	<div>

		<moon-loading v-show="constant.showLoading" position-el="body"></moon-loading>
		<div class="mui-card">
			<div class='mui-card-content'>
				<div class='mycard_heard' v-show="show_title">
					<table>
						<thead>
							<tr>
								<th width='20%'> 奖惩信息</th>
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
			</div>
			<table class="total" width="100%">
				<thead style="border-bottom: 1px solid black; ">
					<tr>
						<th width='40%'>类别</th>
						<th width="">次数</th>
						<th width='40%'>合计金额</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td colspan=3>
							<table class="total" width="100%" @click="showList('reward')" :style="rewardStyle">
								<tr>
									<th width='40%' style="text-align:center;">奖励</th>
									<td v-text="reward_time">&nbsp;</td>
									<td v-text="reward_total" width='40%'>&nbsp;</td>
								</tr>
							</table>
						</td>
					</tr>
					<tr>
						<td colspan=3>
							<table width="100%" @click="showList('mulct')" :style="mulctStyle">
								<tr>
									<th width='40%' style="text-align:center;">惩罚</th>
									<td v-text="mulct_time">&nbsp;</td>
									<td v-text="mulct_total" width='40%'>&nbsp;</td>
								</tr>
							</table>
						</td>
					</tr>
				</tbody>
			</table>
			<div style="height: 10px;">

			</div>
			<ul class="mui-table-view" v-show="rewarShow||mulctShow">
				<div v-for="(value,index) in filterData">
					<div v-if="filterTypeIndex.indexOf(index)!=-1">
						<span v-if="value.type.indexOf('JHGYX')!=-1" style="font-size: large; font-weight: bold;"> &nbsp;&nbsp;违反计划高压线:{{filterTypeNum[filterType.indexOf("JHGYX")]}} 次 </span>
						<span v-if="value.type.indexOf('JDGYX')!=-1" style="font-size: large; font-weight: bold;"> &nbsp;&nbsp;违反精度高压线:{{filterTypeNum[filterType.indexOf("JDGYX")]}} 次 </span>
						<span v-if="value.type.indexOf('JDGL')!=-1" style="font-size: large; font-weight: bold;"> &nbsp;&nbsp;精度管理违章:{{filterTypeNum[filterType.indexOf("JDGL")]}} 次 </span>
						<span v-if="value.type.indexOf('RKTZ')!=-1" style="font-size: large; font-weight: bold;">&nbsp;&nbsp;入库处罚单:{{filterTypeNum[filterType.indexOf("RKTZ")]}} 次 </span>
						<span v-if="value.type.indexOf('QCGLGYX')!=-1" style="font-size: large; font-weight: bold;">&nbsp;&nbsp;违反质量管理高压线 :{{filterTypeNum[filterType.indexOf("QCGLGYX")]}} 次  </span>
						<span v-if="value.type.indexOf('ZLGYX')!=-1" style="font-size: large; font-weight: bold;"> &nbsp;&nbsp;违反质量高压线:{{filterTypeNum[filterType.indexOf("ZLGYX")]}} 次 </span>
						<span v-if="value.type.indexOf('AH4S')!=-1" style="font-size: large; font-weight: bold;"> &nbsp;&nbsp;安环4S处罚单:{{filterTypeNum[filterType.indexOf("AH4S")]}} 次 </span>
						<span v-if="value.type.indexOf('AHGYX')!=-1" style="font-size: large; font-weight: bold;">&nbsp;&nbsp;违反安环高压线:{{filterTypeNum[filterType.indexOf("AHGYX")]}} 次 </span>
						<span v-if="value.type.indexOf('QCJL')!=-1" style="font-size: large; font-weight: bold;"> &nbsp;&nbsp;QC奖励:{{filterTypeNum[filterType.indexOf("QCJL")]}} 次 </span>
						<span v-if="value.type.indexOf('JHGLGYX')!=-1" style="font-size: large; font-weight: bold;"> &nbsp;&nbsp;违反计划管理高压线:{{filterTypeNum[filterType.indexOf("JHGLGYX")]}} 次 </span>
					</div>
					<li class='mui-table-view-cell mui-collapse'>
						<a class='mui-navigate-right' style='width: 100%;'>单据号：{{value.billcode}}</a>
						<div class='mui-collapse-content'>
							<table class='tab'>
								<tr>
									<th width='40%'>单据号:</th>
									<td>{{value.billcode}}</td>
								</tr>
								<tr>
									<th width='40%'>项目名称:</th>
									<td>{{value.jobname}}</td>
								</tr>
								<tr>
									<th width='40%'>奖惩缘由:</th>
									<td>{{value.billhead}}</td>
								</tr>
								<tr>
									<th width='40%'>奖惩依据:</th>
									<td>{{value.yiju}}</td>
								</tr>
								<tr>
									<th width='40%'>罚金:</th>
									<td>{{value.mulct}}</td>
								</tr>
								<tr>
									<th width='40%'>奖金:</th>
									<td>{{value.reward}}</td>
								</tr>
								<tr>
									<th width='40%'>审核状态:</th>
									<td>{{value.appstatus}}</td>
								</tr>
								<tr>
									<th width='40%'>奖惩类型:</th>
									<td>{{value.type}}</td>
								</tr>
								<tr>
									<th width='40%'>日期:</th>
									<td>{{value.createdate}}</td>
								</tr>
							</table>
						</div>
					</li>
				</div>
			</ul>

		</div>
	</div>
</template>

<script>
	export default {
		props: {
			psnbasdoc: {
				type: String,
				default: ""
			},
			show_title: {
				type: Boolean,
				default: true
			}
		},
		watch: {
			psnbasdoc(val) {
				this.constant.pk_psnbasdoc = this.psnbasdoc;
				this.preMounted();
			},
			filterData(val) {
				this.filterType.splice(0);
				this.filterTypeIndex.splice(0);
				this.filterTypeNum.splice(0);
				val.filter(function(value, index) {
					if(this.filterType.indexOf(value.type) == -1) {
						this.filterType.push(value.type)
						this.filterTypeIndex.push(index)
					}
				}.bind(this));
				this.filterTypeIndex.filter(function(value, index) {
					if(index != 0) {
						this.filterTypeNum.push(value - this.filterTypeIndex[index - 1])
					}
				}.bind(this))
				this.filterTypeNum.push(val.length - this.filterTypeIndex[this.filterTypeIndex.length - 1])

			},
			begTime(val, old) {
				if(old && this.constant.pk_psnbasdoc) {
					this.preMounted();
				}
			},
			endTime(val, old) {
				if(old && this.constant.pk_psnbasdoc) {
					this.preMounted();
				}
			}
		},
		mounted() {
			this.endTime = this.comMethods.formatDate(new Date());
			let y = parseInt(this.endTime.split("-")[0]);
			let m = parseInt(this.endTime.split("-")[1]);
			this.begTime = this.comMethods.formatDate(new Date(y, m - 4, 1))
		},
		data() {
			return {
				constant: {
					showLoading: false, //显示加载
					preMountURL: "/json/dinguser_comm_getBonous",
					pk_psnbasdoc: ""
				},
				reward_time: 0,
				reward_total: 0,
				mulct_total: 0,
				mulct_time: 0,
				infor: [],
				filteArg: "",
				rewardStyle: "",
				mulctStyle: "",
				rewarShow: false,
				mulctShow: false,
				filterType: [],
				filterTypeIndex: [],
				filterTypeNum: [],
				begTime: "",
				endTime: ""
			}
		},
		computed: {
			path() {
				return this.comMethods.projectPath();
			},
			filterData() {
				if(this.filteArg) {
					let arr = this.infor.filter(function(value) {
						return value[this.filteArg] != '0'
					}.bind(this))
					let allzearo = this.infor.filter(function(value) {
						return value.reward == '0' && value.mulct == '0'
					}.bind(this))
					return this.filteArg == "mulct" ? arr.concat(allzearo) : arr
				}
				else
					return []
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
			showList(val) {
				this.filteArg = val;

				if(val == "reward") {
					this.rewarShow = !this.rewarShow;
					this.mulctShow = false;
					if(this.rewarShow)
						this.rewardStyle = {
							"background": "pink"
						}
					else
						this.rewardStyle = {
							"background": "white"
						}
					this.mulctStyle = {
						"background": "white"
					}
				}
				else {
					this.rewardStyle = {
						"background": "white"
					}

					this.mulctShow = !this.mulctShow;
					this.rewarShow = false;
					if(this.mulctShow)
						this.mulctStyle = {
							"background": "#F4AC92"
						}
					else
						this.mulctStyle = {
							"background": "white"
						}
				}
			},

			preMounted() {
				this.constant.showLoading = true;
				this.reward_time = 0;
				this.reward_total = 0;
				this.mulct_total = 0;
				this.mulct_time = 0;
				var url = this.path + this.constant.preMountURL;
				var $this = this;
				this.$ajax.get(url, {
						params: {
							psnbasdoc: this.constant.pk_psnbasdoc,
							begtime: this.begTime,
							endtime: this.endTime
						}
					})
					.then(function(response) {
						var data = response.data;
						if(data.success) {
							$this.infor = data.obj;
							$this.infor.forEach(function(value) {
								if(value.reward != '0') {
									$this.reward_time += 1;
									$this.reward_total = $this.reward_total + parseInt(value.reward)
								}
								else {
									$this.mulct_time += 1;
									$this.mulct_total = $this.mulct_total + parseInt(value.mulct)
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
		}
	}
</script>

<style scoped>
	.tab th,
	.tab td {
		text-indent: 1rem;
		height: 3rem;
		border-bottom: 1px solid gray;
	}
	
	.tab table {
		background: pink;
	}
	
	.total tr {
		text-align: center;
		vertical-align: middle;
		height: 4rem;
	}
	
	.total {
		border-bottom: 1px solid black;
	}
</style>