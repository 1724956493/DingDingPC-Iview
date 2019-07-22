import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import PersonIntegratedInfor from '@/components/PersonManage/PersonIntegratedInfor'
import EnergyInspections from '@/components/PersonManage/EnergyInspections'
import QueryByPosition from '@/components/PersonManage/comm/QueryByPosition'
import QualityInspections from '@/components/PersonManage/QualityInspections'
import SaveInspections from '@/components/PersonManage/SaveInspections'
import QueryCertificate from '@/components/PersonManage/comm/QueryCertificate'
import QueryBreakDetail from '@/components/PersonManage/comm/QueryBreakDetail'
import Reform from '@/components/PersonManage/comm/Reform'
import EquipBaseInfor from '@/components/EquipManage/EquipBaseInfor'
import EquipMaintain from '@/components/EquipManage/EquipMaintain/EquipMaintain'
import EquipMaintQuery from '@/components/EquipManage/EquipMaintain/EquipMaintQuery'
import WPS from '@/components/Knowledge/WPS'
import Cars from '@/components/Knowledge/Cars'
import QueryBonus from '@/components/QueryBonus/QueryBonus'
Vue.use(Router)
export default new Router({
	routes: [
		//生产环境下，把默认路径设置为HOME
		{
			path: '/',
			name: 'home',
			component: Home,
			meta: {
				keepAlive: true // 需要被缓存
			}
		},
		/*{
		  path: '/',
		  name: 'EnergyInspections',
		  component: EnergyInspections
		},*/
		{
			path: '/home',
			name: 'home',
			component: Home,
			meta: {
				keepAlive: true // 需要被缓存
			}
		}, {
			path: '/EnergyInspections',
			name: 'EnergyInspections',
			component: EnergyInspections,
			meta: {
				keepAlive: true // 需要被缓存
			}
		}, {
			path: '/QualityInspections',
			name: 'QualityInspections',
			component: QualityInspections,
			meta: {
				keepAlive: true // 需要被缓存
			}
		}, {
			path: '/SaveInspections',
			name: 'SaveInspections',
			component: SaveInspections,
			meta: {
				keepAlive: true // 需要被缓存
			}
		}, {
			path: '/PersonIntegratedInfor',
			name: 'PersonIntegratedInfor',
			component: PersonIntegratedInfor,
			meta: {
				keepAlive: false // 需要被缓存
			}
		}, {
			path: '/QueryByPosition',
			name: 'QueryByPosition',
			component: QueryByPosition,
			meta: {
				keepAlive: false // 需要被缓存
			}
		}, {
			path: '/QueryCertificate/:pk_psndoc',
			name: 'QueryCertificate',
			component: QueryCertificate,
			meta: {
				keepAlive: false // 需要被缓存
			}
		}, {
			path: '/QueryBreakDetail/:pk_psndoc/:pageType',
			name: 'QueryBreakDetail',
			component: QueryBreakDetail,
			meta: {
				keepAlive: false // 需要被缓存
			}
		}, {
			path: '/Reform',
			name: 'Reform',
			component: Reform,
			meta: {
				keepAlive: false // 需要被缓存
			}
		}, {
			path: '/EquipBaseInfor',
			name: 'EquipBaseInfor',
			component: EquipBaseInfor,
			meta: {
				keepAlive: false // 需要被缓存
			}
		}, {
			path: '/EquipMaintain/:type',
			name: 'EquipMaintain',
			component: EquipMaintain,
			meta: {
				keepAlive: true // 需要被缓存
			}
		}, {
			path: '/EquipMaintQuery',
			name: 'EquipMaintQuery',
			component: EquipMaintQuery,
			meta: {
				keepAlive: false
			}
		}, {
			path: '/WPS',
			name: 'WPS',
			component: WPS,
			meta: {
				keepAlive: false
			}
		}, {
			path: '/Cars',
			name: 'Cars',
			component: Cars,
			meta: {
				keepAlive: false
			}
		}, {
			path: '/QueryBonus',
			name: 'QueryBonus',
			component: QueryBonus,
			meta: {
				keepAlive: true
			}
		}, {
			path: '/AreaCheck',
			name: 'AreaCheck', 
			component: () =>
				import('@/components/SecurityManage/AreaManage/AreaCheck/AreaCheck.vue'),
			meta: {
				keepAlive: true,
				title:'场地巡检',
			}
		} 
	]
})