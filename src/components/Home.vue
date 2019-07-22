<template>
	<div id="home">
		<moon-loading v-show="showLoading" position-el="body"></moon-loading> 
			<nav class="mui-bar mui-bar-tab mui-foot">
				<a id="mui-bar-fist" class="mui-tab-item mui-active" href="#work-desk">
					<span class="mui-icon mui-icon-home"></span> <span class="mui-tab-label">工作台</span>
				</a>
				<a id="mui-bar-two" class="mui-tab-item" href="#bonus-penalty"> <span class="mui-icon mui-icon-search"></span> <span class="mui-tab-label">个人信息</span>
				</a>
			</nav>
	 
		<div class="mui-content">
			<div id="work-desk" class="mui-control-content mui-active">

				<div class='mui-card' v-for="(value,index) in menuCard" v-cloak>
					<div class='mui-card-content'>
						<div class='mycard_heard' v-text="value.menuname"></div>
						<div class='mycard_body' v-for="(value2,index2) in value.child">
							<div>
								<button @click="routerLink(value2.action)">
                  <img :src="'images/'+(index+1)*index2+'.png'"/>
                </button>
								<p v-text="value2.menuname"></p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div id="bonus-penalty" class="mui-control-content">
				<div class='mui-card' id="macRepair" v-show="false">
					<div class='mui-card-content'>
						<div class='mycard_heard'>设备报修</div>
						<div class='mycard_body'>
							<div>
								<button @click="routerLink('/')">
                  <img src="'images/8.png'"/>
                </button>
								<p>设备维修申请</p>
							</div>
							<div>
								<a href="contents/EquipmentMaintenance/Apply/QueryMyApply.jsp?dd_nav_bgcolor=FF5E97F6"><img src='images/8.png' />
									</button>
									<p>我的申请</p>
								</a>
							</div>
							<div>
								<a href="contents/EquipmentMaintenance/ProcessApply/ProcessApply.jsp?dd_nav_bgcolor=FF5E97F6">
									<img src='images/8.png' />
									</button>
									<p>查询和处理申请</p>
								</a>
							</div>

						</div>
					</div>
				</div>
				<div class='mui-card'>
					<div class='mui-card-content'>
						<div class='mycard_heard'>奖惩查询</div>
						<div class='mycard_body'>
							<div>
								<button @click="routerLink('/QueryBonus')">
                  <img src='images/1.png'/>
                </button>
								<p>奖惩</p>
							</div>
						</div>
					</div>
				</div>
			</div>

		</div>
	</div>

</template>

<script>
	import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'

	export default {
		name: 'Home',
		mounted: function() {},
		activated: function() {
			let $this = this;
			dd.biz.navigation.setLeft({
				control: true, //是否控制点击事件，true 控制，false 不控制， 默认false
				text: '', //控制显示文本，空字符串表示显示默认文本
				onSuccess: function(result) {
					if($this.$route.name == 'home') {
						dd.biz.navigation.close({
							onSuccess: function(result) {},
							onFail: function(err) {}
						})
					}
					else {
						$this.$router.go(-1)
					}
				},
				onFail: function(err) {}
			});
			dd.biz.navigation.setRight({
				show: true, //控制按钮显示， true 显示， false 隐藏， 默认true
				control: true, //是否控制点击事件，true 控制，false 不控制， 默认false
				text: '刷新', //控制显示文本，空字符串表示显示默认文本
				onSuccess: function(result) {
					window.location.reload();
				},
				onFail: function(err) {}
			});
			dd.runtime.info({
				onSuccess: function(info) {
					logger.e('runtime info: ' + JSON.stringify(info));
				},
				onFail: function(err) {
					logger.e('fail: ' + JSON.stringify(err));

				}
			});
			//关闭下拉刷新
			dd.ui.pullToRefresh.disable();
			//动态生成
			var userName = this.userInfo.user_name;
			if(userName) {
				dd.biz.navigation.setTitle({
					title: "用户：   " + userName
				});
			}
		},
		data() {
			return {
				dingUserUrl: '/json/dinguser_comm_getDingUser',
				menuCard: "",
				showLoading: false
			}
		},

		methods: {
			routerLink(path) {
				if(path == '/Reform') {
					this.$router.push({
						name: 'Reform',
						params: {
							operatePK: this.userInfo.pk_deptdoc,
							status: "dept"
						}
					})
				}
				else {
					this.$router.push({
						path: path
					});
				}
			},
			...mapActions('home', ['saveUserInfoAction'])
		},
		computed: {
			...mapState('home', {
				code: 'powerCode'
			}),
			...mapState('home', ['userInfo', 'dingID']),
			/*方法二
			code() {
			   //从状态信息中提取免登权限代码
			   return this.$store.state.home.powerCode;
			 },
			   menuCard() {
			    //从状态信息中提取菜单列表
			    return this.$store.state.home.menuCard;
			  },
			 userInfo() {
			  //从状态信息中提取用户信息
			  return this.$store.state.home.userInfo;
			}
			  */
			path() {

				return this.comMethods.projectPath();
			},
			test() {
				return JSON.stringify(this.userInfo);
			}
		},
		beforeRouteEnter(to, from, next) {
			//不能获取this
			// 设置下一个路由的 meta
			// to.meta.keepAlive = true;  // 让 A 缓存，即不刷新
			next();
		},
		beforeRouteLeave(to, from, next) {
			// 可以获取this
			// 设置下一个路由的 meta
			//  to.meta.keepAlive =false;  // 让 A 缓存，即不刷新
			next();
		},
		watch: {
			//当code获取到后，进行后台交互
			code: function(val) {
				var $this = this;
				//与后台交互式显示加载蒙版
				this.showLoading = true;
				this.$ajax.get(this.path + this.dingUserUrl, {
						params: {
							code: val,
							dingID: this.dingID
						}
					})
					.then(function(response) {
						var data = response.data;
						if(data.success) {
							//将用户信息存入状态信息中
							$this.saveUserInfoAction({
								userInfo: data.obj.userInfo
							});
							$this.menuCard = data.obj.menus;
						}
						else {

							if(data.obj && data.obj.userInfo) {
								$this.saveUserInfoAction({
									userInfo: data.obj.userInfo
								});
							}
							mui.alert(data.msg, '提示');
						}
					})
					.catch(function(error) {
						alert(error);
					}).then(function() {
						$this.showLoading = false;
					});

			},
			// 当userInfo获取到后更改页面标题
			userInfo(val) {
				dd.biz.navigation.setTitle({
					title: "用户：   " + val.user_name
				});

			}

		}
	}
</script>