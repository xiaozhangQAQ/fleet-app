<template>
	<view class="content">
		<view class="login_title">
			欢迎登录
		</view>
		<view class="login_form">
			<view class="login_form_item">
				<input type="text" v-model="accountName" class="login_form_input" placeholder="请输入帐号"/>
			</view>
			<view class="login_form_item" style="margin-bottom: 20upx;">
				<input :password="showPassword" placeholder="请输入密码" v-model="accountPassword" class="login_form_input" style="padding: 0 120upx 0 30upx;"/>
				<view class="login_form_item-icon" @click="changePassword">
					<image src="../../static/icon/icon_log_eyeclose.png" v-if="showPassword"></image>
					<image src="../../static/icon/icon_log_eyeon.png" v-else></image>
				</view>
			</view>
			<view class="login_form_forget">
			   <navigator url="./forgetPass">忘记密码</navigator>	
			</view>
			<view class="form_putbtn">
				<button type="primary" @click="upto" hover-class="none">登录</button>
			</view>
		</view>
	</view>
</template>

<script>
	import {userLogin} from '../../api/api.js'
	import {  
	        mapMutations,mapState  
	    } from 'vuex';  
    export default{
		computed: mapState(['userInfo']),
		data(){
			return{
				showPassword:true,
				accountName:'',
				accountPassword:''
			}
		},
		onShow: function() {
			//#ifdef MP-WEIXIN
				uni.hideHomeButton()
			//#endif
		},
		methods:{
			...mapMutations(['login']),  
			upto(){	
				const _this = this;
				userLogin({'accountName':this.accountName,'accountPassword':this.accountPassword}).then((data)=>{
                    if(data.orgSpecialFlag == '1'){
                    	uni.showToast({
                    		title:'帐号不符合!',
                    		icon:'none'
                    	})
                    	return;
                    }		
					this.login({userInfo:data,loginToken:data.loginToken});
					uni.redirectTo({
						url:'../index/index'
					})	
				}).
				catch(err=>{
					_this.isloading = false;
				})
			// 	this.login({name:'aa',
			// img:'bb'});  
			    
			},
			changePassword: function() {
			    this.showPassword = !this.showPassword;
			}
		}
	}
</script>

<style lang="less">
	page{
		background-color: #fff;
	}
	.login_title{
			font-size: 60upx;
			color: #222;
			padding:120upx 56upx;
			font-weight: bold;
			font-family:PingFang SC;
		}
		.login_form{
			padding: 0 60upx;
			.login_form_item{
				width: 100%;
				height: 100upx;
				background-color: #F4F5F6;
				border-radius: 10upx;
				position: relative;
				margin-bottom: 40upx;
				.login_form_input{
					height: 100%;
					padding: 0 30upx;
					font-size: 30upx;
				}
				.login_form_item-icon{
					position: absolute;
					right: 40upx;
					top: 26upx;
					z-index: 10;
					image{
						width: 35upx;
						height: 27upx;
					}
				}
			}
			.login_form_forget{
				text-align: right;
				font-size: 28upx;
				color: #222222;
				width: 100%;
				font-weight: bold;
			}
		}
</style>
