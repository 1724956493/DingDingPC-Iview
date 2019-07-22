<template>
	<div>
		<moon-loading v-show="constant.showLoading" position-el="body"></moon-loading>
		<div class="mui-content">
			<table class='tabLayout'>
				<tr>
					<td width="30%">设备名称:</td>
					<td>
						<input type="text" placeholder="查询获取数据" readonly="readonly">
					</td>
				</tr>
				<tr>
					<td>设备编号:</td>
					<td>
						<input type="text" placeholder="查询获取数据" readonly="readonly">
					</td>
				</tr>
				<tr>
					<td>设备规格:</td>
					<td>
						<input type="text" placeholder="查询获取数据" readonly="readonly">
					</td>
				</tr>
				<tr>
					<td>设备型号:</td>
					<td>
						<input type="text" placeholder="查询获取数据" readonly="readonly">
					</td>
				</tr>
				<tr>
					<td>现场识别码:</td>
					<td>
						<input type="text" placeholder="查询获取数据" readonly="readonly">
					</td>
				</tr>
				<tr>
					<td>故障时间:</td>
					<td>
						<input type="text" placeholder="点这选取日期" readonly="readonly">
					</td>
				</tr>
				<tr>
					<td>报修时间:</td>
					<td>
						<input type="text" placeholder="点这选取日期" readonly="readonly">
					</td>
				</tr>
				<tr>
					<td>申请人:</td>
					<td>
						<input type="text" placeholder="查询获取数据" readonly="readonly">
					</td>
				</tr>
				<tr v-show="pageType == 0">
					<td>申请人电话:</td>
					<td>
						<input type="text" placeholder="查询获取数据" readonly="readonly">
					</td>
				</tr>
				<tr>
					<td colspan="2">
						<moon-upload-image v-model="initData.base64Image" array-type="base64"></moon-upload-image>
					</td>
				</tr>
				<tr>
					<td>
						推送：
					</td>
					<td>
					</td>
				</tr>
				<tr>
					<td colspan='2'>
						<textarea style="border: none" name="cknote" rows="5" placeholder="故障说明(必填)：" v-model="initData.cknote"></textarea>
					</td>
				</tr>

			</table>
		</div>

		<footer class="mui-bar mui-bar-footer">
			<button @click="submit()" class="mui-btn mui-btn-block mui-btn-blue" type="button">提交 </button>
		</footer>

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
	import index from "./index"
	export default index
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