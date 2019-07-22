<template>
	<div class="mui-content" v-cloak>
		<div class="mui-input-group">
			<div class="mui-input-row">
				<label>场地名称:</label> <input v-model="areaInfo.name" type="text" placeholder="扫描获取数据" readonly="readonly">
			</div>
			<div style="text-align: center;margin-top:.9rem;" class="mui-input-row " v-show="checkContent.length>0">
				<span id="check_title" style="font-weight: bold;font-size: 1em;">检查项</span>
			</div>
			<table class="tabLayout">
				<tr v-for="(value,index) in checkContent">
					<td width="70%" style="margin:auto; font-size:17px;">{{index+1}}.{{value.checkcontent}}</td>
					<td>
						<select width="30%" style="margin:auto; font-size:17px;text-align: center " v-model="value.selectVal">
							<option value="0">达标</option>
							<option :value="value.pk_checkcontent">不达标</option>
						</select>
					</td>
				</tr>
			</table>

			<textarea style="border: none" rows="5" placeholder="备注：" v-model="remark" v-show="checkContent.length>0"></textarea>
		</div>
		<moon-loading v-show="showLoading" position-el="body"></moon-loading>
		<!--右上角弹出菜单-->
		<moon-dropdown v-model="dropShow">
			<ul class="moon-dropdown-ul">
				<li v-for="(value,index) in menulist" :key="index" @click="menuSelected(index)">
					<moon-icon name="moon-icon-fangdajing"></moon-icon>
					{{value}}
				</li>
			</ul>
		</moon-dropdown>
		<footer class="mui-bar mui-bar-footer" v-show="checkContent.length>0">
			<button @click="submitData" class="mui-btn mui-btn-block mui-btn-blue">提交</button>
		</footer>
	</div>
</template>

<script>
	import index from "./index"
	export default index
</script>
<style>

</style>
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