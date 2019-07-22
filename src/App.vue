<template>
	<div id="app">
		<transition name='fade' mode='out-in' appear>
			<keep-alive>
				<router-view v-if="$route.meta.keepAlive">
				</router-view>
			</keep-alive>
		</transition>
		<transition name='fade' mode='out-in' appear>
			<router-view v-if="!$route.meta.keepAlive">
			</router-view>
		</transition>
	</div>
</template>
<script>
	export default {
		name: 'App'
	}
</script>

<style>
	#app {
		height: 100%;
		background: white;
	}
	
	.fade-enter-active,
	.fade-leave-active
	.fade-appear-active {
		transition: all .5s ease;
	}
	
	.fade-enter,
	.fade-appear,
	.fade-leave-active {
		opacity: 0;
		transform: translateX(20px)
	}
</style>