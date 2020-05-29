<script>
	// import user from 'tool/user.js'
	import {
	    mapMutations  
	} from 'vuex';  
	export default {
		onLaunch:function() { 
			console.log('onLaunch')
			const _this = this;
		    let logintoken =  uni.getStorageSync('loginToken');
			
			if(logintoken){
				let userInfo = uni.getStorageSync('userInfo');
				console.log(userInfo)
				if(userInfo){
					_this.login({userInfo:userInfo,loginToken:logintoken})
				}
			}else{
				uni.showModal({
				  title:'未登录',
				  content: '您当前未登录，需要登录后才能继续',
				  showCancel: false,
				  success: (res) => {
					uni.reLaunch({
						url: '../log/login'
					});  
				  }
				}) 
			}
			//判断loginToken是否存在 存在则是登录状态 不存在则是未登录状态
			// uni.getStorageSync({//获得保存在本地的用户信息
			// 	key: 'loginToken',  
			// 	success:(res) => {
			// 				console.log(res)
			// 		uni.getStorage({ //获取用户信息,loginToken存入vuex
			// 			key:'userInfo',
			// 			success:(data)=>{
			// 				_this.login({userInfo:data.data,loginToken:res.data});	
			// 			}
			// 		})
			// 	},
			// 	fail:()=>{
			// 		uni.showModal({
			// 		  title:'未登录',
			// 		  content: '您当前未登录，需要登录后才能继续',
			// 		  showCancel: false,
			// 		  success: (res) => {
			// 			uni.reLaunch({
			// 				url: '../log/login'
			// 			});  
			// 		  }
			// 		}) 
			// 	}
			// }); 
						
			// let userData = await user.wxLogin();
			// console.log(userData)
			// if (this.userInfoReadyCallback) {
			// 	this.userInfoReadyCallback(userData)
			// }
			// if(userData.loginFlag == "1"){//已经登录
			// 	this.$store.commit('login',userData);
			// 	if (this.userInfoReadyCallback) {
			// 		this.userInfoReadyCallback(userData)
			// 	}
			// }else{//未登录
			// 	console.log('wwwdl')
			// 	uni.reLaunch({
			// 		url:'/pages/log/login'
			// 	})
			// }
			
		},
		onShow: function() {
			console.log('aa')
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods:{
			...mapMutations(['login']),
			// async login(){
			// 	console.log('fff0000000')
			// 	let userInfo = await user.wxLogin();
			// 	console.log(userInfo)
			// }
		},
		globalData:{
			navBarHeight: (uni.getSystemInfoSync().statusBarHeight*2+90)+'rpx' //自定义导航高度
		}
	}
</script>

<style lang="less">
	/*每个页面公共css */
	@import "style/main.less";
	view{
		box-sizing: border-box;
	}
</style>
