// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
import { mapMutations } from 'vuex' 
import axios from 'axios' 
Vue.prototype.$ajax = axios; 
Vue.config.productionTip = false
import MyComponents from './assets/MyComponents/MyComponents';
import './assets/MyComponents/MyComponents.css'
import './assets/css/comm.css';
import './assets/css/checkBoxRadio.css';
import "./assets/css/cardStyle.css";
import FastClick from 'fastclick';
import gallery from 'img-vuer';
import animate from 'animate.css'
Vue.use(gallery)

FastClick.attach(document.body)
Vue.use(MyComponents); 
//获取当前页面路径 
let pageUrl = window.document.location.href;  
axios.get(new Vue().comMethods.projectPath() + '/json/dinguser_alibaba_getConfig', {
	params: {
		pageUrl: pageUrl.split("#")[0]
	}
}).then(function(response) {
	var _config = response.data;
	dd.config({
		agentId: _config.agentid,
		corpId: _config.corpId,
		timeStamp: _config.timeStamp,
		nonceStr: _config.nonceStr,
		signature: _config.signature,
		jsApiList: ['runtime.info', 'biz.contact.choose', 'device.notification.confirm',
			'device.notification.alert', 'device.notification.prompt', 'biz.ding.post',
			'biz.util.openLink', 'biz.util.open', 'biz.chat.openSingleChat',
			'biz.chat.pickConversation', 'biz.contact.choose', 'biz.user.get',
			'biz.chat.chooseConversationByCorpId'
		]
	});
	dd.ready(function() {
		new Vue({
			el: '#app',
			router,
			store,
			// render: h => h(App),
			beforeMount() {
				var $this = this;
				dd.runtime.permission.requestAuthCode({
					corpId: _config.corpId,
					onSuccess: function(info) {
						$this.savePowerCode({
							powerCode: info.code
						});
					},
					onFail: function(err) {
						mui.alert("未能获取到钉钉权限,请重试！", '错误代码:0001', function() {});
					}
				});
				dd.biz.user.get({
					onSuccess: function(info) {
						$this.saveDingID({
							dingID: info.emplId
						});
					},
					onFail: function(err) {
						alert(JSON.stringify(err));
					}
				});
			},
			components: {
				App
			},
			template: '<App/>',
			methods: { ...mapMutations('home', ['savePowerCode', 'saveDingID'])
			}
		});
	});
	dd.error(function(err) {
		alert('dd error: ' + JSON.stringify(err));
	});
}).catch(function(error) {}).then(function() {});