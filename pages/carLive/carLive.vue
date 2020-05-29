<template>
	
	<web-view :src="url"></web-view>
</template>

<script>
import {mapState} from 'vuex';
let baseUrl = '';
if(process.env.NODE_ENV === 'development'){
	//#ifndef H5
	baseUrl = 'https://test.icarplus.net';//除h5端外
	//#endif
}else{
   //#ifndef H5
   baseUrl = 'https://jywx.icarplus.net';
   //#endif
}
export default{
	data(){
		return{
			url:""
		}
	},
	onLoad(options) {
		// let lat = decodeURIComponent(options.lat);
		// let lng = decodeURIComponent(options.lng);
		let lat = options.lat;
		let lng = options.lng;
		let userPhone = this.userInfo.contactPhone;
		console.log(baseUrl)
		this.url = `${baseUrl}/rescueWeixin/icarRescue/icarLivePage?lat=${lat}&lng=${lng}&userPhone=${userPhone}`;
		console.log('this.url==',this.url)
	},
	computed:{
		...mapState(['userInfo'])
	}
}
</script>

<style>
</style>
