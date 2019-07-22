import sql from './sql.js';
import config from './config.js'
export default {
	name: 'AreaCheck',
	activated() {
		this.pk_ckuser = this.$store.state.home.userInfo.pk_psnbasdoc;
		this.pk_ckdept = this.$store.state.home.userInfo.pk_deptdoc;
		this.preMounted()
	},
	data() {
		return {
			pk_ckuser: "",
			pk_ckdept: "",
			showLoading: false,
			menulist: ["查询最近一次记录"],
			dropShow: false,
			checkContent: [],
			remark: "",
			areaInfo: {}
		}
	},
	beforeRouteLeave(to, from, next) {
		//alert(to.name)
		if(to.name === 'home') {
			this.reset();
		}
		next();
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
				title: $this.$route.meta.title,
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
					}
					/*, {
										"id": "1", //字符串
										"iconId": "add", //字符串，图标命名
										"text": "更多"
									}*/
				],
				onSuccess: function(data) {
					switch(data.id) {
						case '0':
							$this.dropShow = false;
							$this.scan();
							break;
						case '1':
							$this.dropShow = !$this.dropShow;
							break;
						default:
							break;
					}
				},
				onFail: function(err) {}
			});
		},
		menuSelected(val) {
			this.dropShow = false;
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
					var pk = data.text;
					var url = $this.path + config.Url.scan;
					$this.showLoading = true; //显示加载
					let params = sql.scanData(pk)
					$this.$ajax.get(url, {
						params
					}).then(function(response) {
						var data = response.data;
						if(data.success) {
							$this.areaInfo = data.obj[0]
							$this.timedCount_getCheckContent()
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
				onFail: function(err) {}
			});
		},
		getCheckContent() {
			var $this = this;
			$this.showLoading = true; //显示加载
			var url = $this.path + config.Url.scan;
			let params = sql.contentData($this.areaInfo.pk_area)
			$this.$ajax.get(url, {
				params
			}).then(function(response) {
				var data = response.data;
				if(data.success) {
					$this.checkContent = data.obj
					//设置每个项的选择状态，默认0，
					$this.checkContent.forEach(function(value, index) {
						value.selectVal = 0
					});
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
		timedCount_getCheckContent() {
			var t = setTimeout(this.timedCount_getCheckContent, 200)
			if(!this.showLoading) {
				clearTimeout(t)
				this.getCheckContent();
			}
		},
		reset() {
			this.checkContent.splice(0)
			this.remark = ""
			this.areaInfo = {}
		},
		submitData() {
			this.checkContent = JSON.parse(JSON.stringify(this.checkContent))
			this.showLoading = true;
			var url = this.path + config.Url.submit;
			var $this = this;
			let impdata = {
				pk_area: $this.areaInfo.pk_area,
				pk_checkcontent: [],
				ts: $this.comMethods.formatDate(1),
				operator: $this.pk_ckuser,
				remark: this.remark
			}
			this.checkContent.forEach(function(value, index) {
				if(value.selectVal != 0) {
					impdata.pk_checkcontent.push(value.pk_checkcontent)
				}
			});
			let params = sql.submitData(impdata)
			this.$ajax.post(url, params).then(function(response) {
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
				$this.showLoading = false;
			});
		},
		query() {
			//			this.showLoading = true;
			//			var url = this.path + this.queryUrl;
			//			var $this = this;
			/*this.$ajax.get(url, {
				params: {
					equipPK: this.pk_equip
				}
			}).then(function(response) {
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
			}).catch(function(error) {
				alert(error);
			}).then(function() {
				$this.showLoading = false;
			});*/
		}
	}
}