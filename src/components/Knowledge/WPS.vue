<template>
	<div class="mui-content">
		<div class="mui-input-row">
			<label class="mui-navigate-right"><b>材质：</b></label>
			<select v-model="initData.caizhi">
				<option>S+S</option>
				<option>S+CMn</option>
				<option>CMn+CMn</option>
			</select>
		</div>
		<div class="mui-input-row">
			<label class="mui-navigate-right"><b>焊接位置：</b></label>
			<select v-model="initData.weizhi">
				<option v-for="(value,index) in weizhi_list" :value="value">{{value}}</option>
			</select>

		</div>
		<div class="mui-input-row">
			<label class="mui-navigate-right"><b>焊道：</b></label>
			<select v-model="initData.handao">
				<option v-for="(value,index) in handao_list" :value="value">{{value}}</option>
			</select>
		</div>
		<div class="mui-input-row">
			<label><b>电流A:</b></label>
			<input v-model="dianliu" type="text" readonly="readonly">
		</div>
		<div class="mui-input-row">
			<label><b>电压V:</b></label>
			<input v-model="initData.dianya" ype="text" readonly="readonly">
		</div>
		<div class="mui-input-row">
			<label><b>速度cm/min:</b></label>
			<input v-model="initData.sudu" type="text" readonly="readonly">
		</div>
		<div class="mui-input-row">
			<label><b>层温℃:</b></label>
			<input v-model="initData.cengwen" type="text" readonly="readonly">
		</div>
		<div class="mui-input-row">
			<label><b>层厚mm:</b></label>
			<input v-model="initData.cenghou" type="text" readonly="readonly">
		</div>
	</div>
</template>

<script>
	export default {
		mounted() {
		 
			dd.biz.navigation.setTitle({
				//接收全局变量title
				title: 'WPS焊接参数查询',
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
				constant: {
					wps: [{
							"层厚mm": "＜4",
							"层温℃": "＜116",
							"材质": "S+S",
							"电流A": "117~140",
							"电压V": "23~25",
							"焊道": "打底",
							"速度从cm/min": "7~9",
							"焊接位置": "平 (D)"
						},
						{
							"层厚mm": "＜4",
							"层温℃": "＜116",
							"材质": "S+S",
							"电流A": "126~150",
							"电压V": "25~27",
							"焊道": "填充",
							"速度从cm/min": "13~35",
							"焊接位置": "平(D)"
						},
						{
							"层厚mm": "＜4",
							"层温℃": "＜116",
							"材质": "S+S",
							"电流A": "130~160",
							"电压V": "25~27",
							"焊道": "盖面",
							"速度从cm/min": "13~34",
							"焊接位置": "平(D)"
						},
						{
							"层厚mm": "＜4",
							"层温℃": "＜105",
							"材质": "S+S",
							"电流A": "117~140",
							"电压V": "25~27",
							"焊道": "打底",
							"速度从cm/min": "9~11",
							"焊接位置": "横(X)"
						},
						{
							"层厚mm": "＜4",
							"层温℃": "＜105",
							"材质": "S+S",
							"电流A": "126~160",
							"电压V": "26~29",
							"焊道": "填+盖",
							"速度从cm/min": "19~60",
							"焊接位置": "横 (X)"
						},
						{
							"层厚mm": "＜4",
							"层温℃": "＜116",
							"材质": "S+S",
							"电流A": "117~140",
							"电压V": "23~25",
							"焊道": "打底",
							"速度从cm/min": "5~6",
							"焊接位置": "立(Vu)"
						},
						{
							"层厚mm": "＜4",
							"层温℃": "＜116",
							"材质": "S+S",
							"电流A": "126~150",
							"电压V": "25~27",
							"焊道": "填充",
							"速度从cm/min": "6~10",
							"焊接位置": "立(Vu)"
						},
						{
							"层厚mm": "＜4",
							"层温℃": "＜116",
							"材质": "S+S",
							"电流A": "108~130",
							"电压V": "25~27",
							"焊道": "盖面",
							"速度从cm/min": "6~8",
							"焊接位置": "立(Vu)"
						},
						{
							"层厚mm": "＜4",
							"层温℃": "＜99",
							"材质": "S+S",
							"电流A": "117~143",
							"电压V": "24~26",
							"焊道": "打底",
							"速度从cm/min": "12~14",
							"焊接位置": "仰(O)"
						},
						{
							"层厚mm": "＜4",
							"层温℃": "＜99",
							"材质": "S+S",
							"电流A": "130~160",
							"电压V": "25~29",
							"焊道": "填充",
							"速度从cm/min": "17~27",
							"焊接位置": "仰(O)"
						},
						{
							"层厚mm": "＜4",
							"层温℃": "＜99",
							"材质": "S+S",
							"电流A": "125~150",
							"电压V": "24~27",
							"焊道": "盖面",
							"速度从cm/min": "14~23",
							"焊接位置": "仰(O)"
						},
						{
							"层厚mm": "＜4",
							"层温℃": "＜99",
							"材质": "S+CMn",
							"电流A": "110~130",
							"电压V": "22~24",
							"焊道": "打底",
							"速度从cm/min": "7~10",
							"焊接位置": "平(D)"
						},
						{
							"层厚mm": "＜4",
							"层温℃": "＜99",
							"材质": "S+CMn",
							"电流A": "126~165",
							"电压V": "23~27",
							"焊道": "填充",
							"速度从cm/min": "13~31",
							"焊接位置": "平(D)"
						},
						{
							"层厚mm": "＜4",
							"层温℃": "＜99",
							"材质": "S+CMn",
							"电流A": "135~165",
							"电压V": "24~26",
							"焊道": "盖面",
							"速度从cm/min": "10~20",
							"焊接位置": "平(D)"
						},
						{
							"层厚mm": "＜4",
							"层温℃": "＜106",
							"材质": "S+CMn",
							"电流A": "100~121",
							"电压V": "22~24",
							"焊道": "打底",
							"速度从cm/min": "8~10",
							"焊接位置": "横(X)"
						},
						{
							"层厚mm": "＜4",
							"层温℃": "＜106",
							"材质": "S+CMn",
							"电流A": "126~160",
							"电压V": "27~30",
							"焊道": "填+盖",
							"速度从cm/min": "17~49",
							"焊接位置": "横(X)"
						},
						{
							"层厚mm": "＜4",
							"层温℃": "＜99",
							"材质": "S+CMn",
							"电流A": "110~130",
							"电压V": "22~24",
							"焊道": "打底",
							"速度从cm/min": "6~10",
							"焊接位置": "立(Vu)"
						},
						{
							"层厚mm": "＜4",
							"层温℃": "＜99",
							"材质": "S+CMn",
							"电流A": "126~165",
							"电压V": "23~27",
							"焊道": "填充",
							"速度从cm/min": "8~12",
							"焊接位置": "立(Vu)"
						},
						{
							"层厚mm": "＜4",
							"层温℃": "＜99",
							"材质": "S+CMn",
							"电流A": "135~165",
							"电压V": "24~26",
							"焊道": "盖面",
							"速度从cm/min": "7~9",
							"焊接位置": "立(Vu)"
						},
						{
							"层厚mm": "＜4",
							"层温℃": "＜99",
							"材质": "S+CMn",
							"电流A": "100~120",
							"电压V": "23~25",
							"焊道": "打底",
							"速度从cm/min": "15~18",
							"焊接位置": "仰(O)"
						},
						{
							"层厚mm": "＜4",
							"层温℃": "＜99",
							"材质": "S+CMn",
							"电流A": "120~160",
							"电压V": "24~28",
							"焊道": "填充",
							"速度从cm/min": "18~33",
							"焊接位置": "仰(O)"
						},
						{
							"层厚mm": "＜4",
							"层温℃": "＜99",
							"材质": "S+CMn",
							"电流A": "126~156",
							"电压V": "25~28",
							"焊道": "盖面",
							"速度从cm/min": "20~31",
							"焊接位置": "仰(O)"
						},
						{
							"材质": "CMn+CMn",
							"电流A": "170~200A",
							"电压V": "25~30V",
							"焊道": "打底焊",
							"焊接位置": "平焊"
						},
						{
							"材质": "CMn+CMn",
							"电流A": "180~220A",
							"电压V": "28~30V",
							"焊道": "填充\\盖面",
							"焊接位置": "平焊"
						},
						{
							"材质": "CMn+CMn",
							"电流A": "140~180A",
							"电压V": "25~30V",
							"焊道": "打底焊",
							"焊接位置": "横焊"
						},
						{
							"材质": "CMn+CMn",
							"电流A": "160~210A",
							"电压V": "27~30V",
							"焊道": "填充\\盖面",
							"焊接位置": "横焊"
						},
						{
							"材质": "CMn+CMn",
							"电流A": "140~170A",
							"电压V": "25~28V",
							"焊道": "打底焊",
							"焊接位置": "立焊"
						},
						{
							"材质": "CMn+CMn",
							"电流A": "160~210A",
							"电压V": "27~30V",
							"焊道": "填充\\盖面",
							"焊接位置": "立焊"
						},
						{
							"材质": "CMn+CMn",
							"电流A": "160~190A",
							"电压V": "23~29V",
							"焊道": "打底焊",
							"焊接位置": "仰焊"
						},
						{
							"材质": "CMn+CMn",
							"电流A": "170~190A",
							"电压V": "25~30V",
							"焊道": "填充\\盖面",
							"焊接位置": "仰焊"
						}
					]
				},
				initData: {
					caizhi: "S+S",
					weizhi: "",
					handao: "",
					dianya: "",
					sudu: "",
					cengwen: "",
					cenghou: ""
				}
			}
		},
		computed: {
			formatData() {
				//去空格
				return JSON.parse(JSON.stringify(this.constant.wps).replace(/\s/g, ""));
			},
			weizhi_list() {
				var item = {}
				this.formatData.forEach(function(value, index) {
					if(value["材质"] === this.initData.caizhi) {
						item[value["焊接位置"]] = value["焊接位置"];
					}
				}.bind(this))
				this.initData.weizhi = Object.keys(item)[0];
				return item
			},
			handao_list() {
				var item = {}
				this.formatData.forEach(function(value, index) {
					if(value["材质"] === this.initData.caizhi && value["焊接位置"] === this.initData.weizhi) {
						item[value["焊道"]] = value["焊道"];
					}
				}.bind(this))
				this.initData.handao = Object.keys(item)[0];
				return item
			},
			dianliu() {
				var item = this.formatData.filter(function(value, index) {
					if(value["材质"] === this.initData.caizhi && value["焊接位置"] === this.initData.weizhi && value[
							"焊道"] == this.initData.handao) {
						return true
					}
					else return false
				}.bind(this))
				this.initData.dianya = item[0]["电压V"]
				this.initData.sudu = item[0]["速度从cm/min"]
				this.initData.cengwen = item[0]["层温℃"]
				this.initData.cenghou = item[0]["层厚mm"]
				return item[0]["电流A"]
			}
		}
	}
</script>

<style scoped>
	.mui-input-row label {
		width: 40%;
	}
	
	.mui-input-row label~input,
	.mui-input-row label~select {
		width: 60%;
	}
</style>