<template>
	<view class="content">
		<view class="list_box">
			<uni-list>
				<uni-list-item title="人脸照片采集" rightText="待完善"/>
				<uni-list-item title="密码修改" @click="toChangPass"/>
			</uni-list>
		</view>
		<view class="list_box">
			<uni-list>
				<uni-list-item title="用户指南"/>
				<uni-list-item title="版本更新"/>
				<uni-list-item title="法律条款和隐私策略" />
				<uni-list-item title="关于"/>
			</uni-list>
		</view>
		<view class="outbtn">
			<button type="primary" @click="out">退出登录</button>
		</view>
	</view>
</template>

<script> 
    import uniList from '@/components/uni-list/uni-list.vue'
    import uniListItem from '@/components/uni-list-item/uni-list-item.vue'
	import {userLogout} from '../../api/api.js'
	import {
	        mapMutations,mapState 
	    } from 'vuex';  
	export default {
		components: {uniList,uniListItem},
		computed: mapState(['userInfo']),
		data() {
			return {
				
			};
		},
		methods:{
			...mapMutations(['logout']),  
			toChangPass(){
				uni.navigateTo({
					url:'../log/changePass'
				})
			},
			out(){
				console.log(this.userInfo.accountId)
				userLogout({'accountId':this.userInfo.accountId}).then((res)=>{
					console.log(res)
					this.logout();
					uni.reLaunch({
					    url: '../log/login'
					});
				})
			}
		}
	}
</script>

<style lang="less">
  .list_box{
	  padding: 10upx 0;
  }
  .outbtn{
		padding: 100upx 30upx;
		button{
			height: 98upx;
			background:linear-gradient(180deg,rgba(255,117,117,1) 0%,rgba(255,89,89,1) 100%);
			color: #fff;
			Letter-spacing:10upx;
		}
	}
</style>
