<template>
	<div>
		<table class='content'>
			<tr>
				<th colspan="3">请输入车牌</th>
			</tr>
			<tr>
				<td style="width: 13%;text-align: left;">
					<input type="text" @blur="showFist=false" @click="fistClick" v-model="fistVal" readonly="readonly" />
				</td>
				<td style="width: 13%;">
					<input type="text" @blur="showSecond=false" @click="secondClick" v-model="secondVal" readonly="readonly"
					/>
				</td>
				<td style="width: 60%;">
					<input type="text" v-model="thirdVal" placeholder="填写号码" />
				</td>
			</tr>
		</table>

		<table class="character">
			<tr v-for="n in rows_fistName" v-show="showFist">
				<td :class="{character_td_fist :index==0,character_td_other:index!=0 }" width="40px" @click="fistChoice(index+(n-1)*rows_num)"
				 v-for="(value,index) in fistName.slice((n-1)*rows_num,(n-1)*rows_num+rows_num)">{{value}}
				</td>
			</tr>
			<tr v-for="n in rws_second" v-show="showSecond">
				<td :class="{character_td_fist :index==0,character_td_other:index!=0 }" width="40px" @click="secondChoice(index+(n-1)*rows_num)"
				 v-for="(value,index) in second.slice((n-1)*rows_num,(n-1)*rows_num+rows_num)">{{value}}
				</td>
			</tr>
		</table>

		<table class='tabLayout' style=" margin-left:0;  width:100%;">
			<tr>
				<td style="text-align: center; height: 1rem" @click="queryById">
					<p class="queryStyle"> 输入查询</p>
				</td>
			</tr>
			<tr>
				<td style="height: 3rem">
					<moon-upload-image v-model="base64Image" @click.native="onlyPic()" array-type="base64"></moon-upload-image>
				</td>
			</tr>
		</table>
		<table class='tabLayout' v-show="info.carid">
			<tr>
				<td width="30%">车牌号码:</td>
				<td>
					<input type="text" v-model="info.carid" placeholder="查询获取数据" readonly="readonly">
				</td>
			</tr>
			<tr>
				<td width="30%">车主姓名:</td>
				<td>
					<input type="text" v-model="info.carowner" placeholder="查询获取数据" readonly="readonly">
				</td>
			</tr>
			<tr>
				<td width="30%">隶属部门:</td>
				<td>
					<input type="text" v-model="info.ownerdept" placeholder="查询获取数据" readonly="readonly">
				</td>
			</tr>
			<tr>
				<td width="30%">工作职位:</td>
				<td>
					<input type="text" v-model="info.ownerjob" placeholder="查询获取数据" readonly="readonly">
				</td>
			</tr>
			<tr>
				<td width="30%">联系电话:</td>
				<td>
					<input type="text" v-model="info.ownertelephone" placeholder="查询获取数据" readonly="readonly">
				</td>
			</tr>
		</table>
		<moon-loading v-show="showLoading" position-el="body"></moon-loading>
	</div>
</template>

<script>
	export default {
		mounted() {

			dd.biz.navigation.setTitle({
				//接收全局变量title
				title: '车辆查询',
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
		},
		data() {
			return {
				fistName: ["京", "沪", "浙", "苏", "粤", "鲁", "晋", "冀",
					"豫", "川", "渝", "辽", "吉", "黑", "皖", "鄂",
					"津", "贵", "云", "桂", "琼", "青", "新", "藏",
					"蒙", "宁", "甘", "陕", "闽", "赣", "湘"
				],
				second: ["A", "B", "C", "D", "E", "F", "G", "H",
					"J", "K", "L", "M", "N", "O", "P", "Q",
					"R", "S", "T", "U", "V", "W", "X", "Y",
					"Z"
				],
				fistVal: "苏",
				secondVal: "M",
				showFist: false,
				showSecond: false,
				pageH: document.body.clientHeight,
				queryByIdUrl: "/json/dinguser_comm_getCarInfoById",
				showLoading: false,
				thirdVal: "",
				info: {},
				base64Image: [],
				queryByPicUrl: "/json/dinguser_comm_getCarInfoByPic"
			}
		},
		watch: {
			last(val) {
				if(val.length > 0 && val.split(",")[1]) {
					this.queryByPic(val.split(",")[1])
				}
			}
		},
		methods: {
			onlyPic() {
				this.base64Image.splice(0)
				this.info = {}
			},
			queryById() {
				if(!this.thirdVal) {
					mui.alert("车牌号后面几位不能为空！")
					return;
				}
				this.onlyPic();
				var url = this.path + this.queryByIdUrl;
				this.showLoading = true;
				var $this = this;
				this.$ajax.post(url, {
						carId: this.fistVal + this.secondVal + this.thirdVal
					})
					.then(function(response) {
						var data = response.data;
						if(data.success) {
							$this.info = data.obj[0]
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
			},
			queryByPic(val) {
				var url = this.path + this.queryByPicUrl;
				this.showLoading = true;
				var $this = this;
				this.$ajax.post(url, {
						carPic: val,
						//百度AI
						secretkey:"DgZupQkOyVVPMkqG8GSbZoGYHZs4gnhS",
						appid:"15420115",
						appkey:"8Xuyo1QvjVyYQGBm0tH859YL"
					})
					.then(function(response) {
						var data = response.data;

						if(data.success) {
							var carInfor = data.obj;
							$this.info.carid = data.msg;
							if(carInfor.success) {
								$this.info = carInfor.obj[0];
							}
							else {
								mui.alert(carInfor.msg, '提示')
							}
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
			},
			fistClick() {
				this.showSecond = false
				if(this.pageH > document.body.clientHeight) {
					setTimeout(function() {
						this.showFist = !this.showFist;
					}.bind(this), 350)
				}
				else {
					this.showFist = !this.showFist;
				}
			},
			secondClick() {
				this.showFist = false
				if(this.pageH > document.body.clientHeight) {
					setTimeout(function() {
						this.showSecond = !this.showSecond;
					}.bind(this), 350)
				}
				else {
					this.showSecond = !this.showSecond;
				}
			},
			fistChoice(index) {
				this.fistVal = this.fistName[index]
			},
			secondChoice(index) {
				this.secondVal = this.second[index]
			}
		},
		computed: {
			last() {
				return this.base64Image[this.base64Image.length - 1]
			},
			path() {
				return this.comMethods.projectPath();
			},
			rows_fistName() {
				return Math.ceil(this.fistName.length / this.rows_num)
			},
			rows_num() {
				var screenWidth = window.screen.width;
				return Math.floor(screenWidth / 48)
			},
			rws_second() {
				return Math.ceil(this.second.length / this.rows_num)
			}
		}
	}
</script>

<style scoped>
	.content td input {
		height: 3rem;
		font-size: 20px;
	}
	
	.content th {
		height: 3rem;
		font-size: 20px;
	}
	
	.character {
		text-align: center;
		position: fixed;
		bottom: 0px;
		border-collapse: separate;
		border-spacing: 0px 20px;
		width: 100%;
		background: white;
	}
	
	.character td {
		height: 40px;
	}
	
	.character_td_fist {
		border: 1px solid #D0D0D0;
	}
	
	.character_td_other {
		border-top: 1px solid #D0D0D0;
		border-right: 1px solid #D0D0D0;
		border-bottom: 1px solid #D0D0D0;
	}
	
	.moon-upLoadImg>>>.moon-upLoadImg_ready_p {
		margin-left: 39%;
		font-size: 20px;
	}
	
	.moon-upLoadImg>>>.moon-upLoadImg_ready_p:before {
		content: "拍照查询";
	}
	
	.queryStyle {
		font-family: '宋体';
		font-size: 20px;
		color: black;
	}
</style>