<template>
	<view class="content">
		<view class="depart_item" v-for="(item,index) in datas" :key="index" @click="getDepart(item)">
			{{item.name}}
		</view>
	</view>
</template>

<script>
	import {getOrgList} from '@/api/api.js'
	import {
	    mapState 
	} from 'vuex'; 
	export default {
		computed: mapState(['userInfo']),
		data() {
			return {
				datas:[]
			};
		},
		onLoad(){
			getOrgList({orgId:this.userInfo.orgId}).then(res=>{
				this.datas = res.data;
			})
		},
		methods:{
			getDepart(item){
				let pages = getCurrentPages();
				let prevPage = pages[pages.length - 2];  //上一个页面
				console.log(prevPage)
				prevPage.$vm.getPreData(item);
				uni.navigateBack();
			}
		}
	}
</script>

<style lang="less">
.depart_item{
	padding: 20upx;
	font-size: 28upx;
	color: #333;
	background-color: #fff;
}
</style>
