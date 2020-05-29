<template>
	<view class="content">
		<view class="login_title">
			忘记密码
		</view>
		<view class="login_form">
			<view class="login_form_item">
				<input type="number" v-model="contactPhone" class="login_form_input" placeholder="请输入帐号"/>
			</view>
			<view class="login_form_item">
				<input type="text" v-model="code" class="login_form_input" placeholder="请输入验证码" style="padding: 0 120upx 0 30upx;"/>
				<view class="login_form_item_label">
					<button type="primary" @click="sendSms" v-if="!isSend">获取验证码</button>
					<button type="primary" v-if="isSend" style="color: #999;background-color: #fff;border: 1px solid #eee;"><text>{{seconds}}</text>秒后重新获取</button>
				</view>
			</view>
			<view class="login_form_item">
				<input :password="showPassword" placeholder="请输入新密码" v-model="newPassword" class="login_form_input" style="padding: 0 120upx 0 30upx;"/>
				<view class="login_form_item-icon" @click="changePassword">
					<image src="../../static/icon/icon_log_eyeclose.png" v-if="showPassword"></image>
					<image src="../../static/icon/icon_log_eyeon.png" v-else></image>
				</view>
			</view>
			<view class="login_form_item">
				<input :password="showPassword1" v-model="newPasswordAgain" placeholder="请再次输入确认密码" class="login_form_input" style="padding: 0 120upx 0 30upx;"/>
				<view class="login_form_item-icon" @click="changePassword1">
					<image src="../../static/icon/icon_log_eyeclose.png" v-if="showPassword1"></image>
					<image src="../../static/icon/icon_log_eyeon.png" v-else></image>
				</view>
			</view>
			<view class="form_putbtn">
				<button type="primary" @click="upto" hover-class="none">完成</button>
			</view>
		</view>
	</view>
</template>

<script>
	import {getSmsVerificationCode,smsResetPassword} from '../../api/api.js'
    export default{
		data(){
			return{
				showPassword:true,
				showPassword1:true,
				newPassword:'',
				newPasswordAgain:'',
				contactPhone:'',
				code:'',
				isSend:false,
				seconds: 60
			}
		},
		methods:{
			changePassword: function() {
			    this.showPassword = !this.showPassword;
			},
			changePassword1: function() {
			    this.showPassword1 = !this.showPassword1;
			},
			sendSms(){
				if(this.contactPhone == ''){
					uni.showToast({
						title:'请输入真实的手机号码！',
						icon:"none"
					})
					return;
				}
				this.isSend = true;
				let s = this.seconds;
				getSmsVerificationCode({contactPhone:this.contactPhone}).then(res=>{
					console.log(res)
				})
				this.countDown(s);
				let timer = null;
				const _this = this;
				timer = setInterval(() => {
					s--;
					if (s <= 0) {
						clearInterval(timer);
						_this.isSend = false;
						return
					}
					this.countDown(s)
				}, 1000)
			},
			upto(){
				if(this.newPassword != this.newPasswordAgain){
					uni.showToast({
						title:'请确认两次输入的新密码是否相同',
						icon:"none"
					})
					return;
				}
				smsResetPassword({contactPhone:this.contactPhone,code:this.code,newPassword:this.newPassword}).then(res=>{
					uni.showToast({
						title:'修改成功'
					})
					uni.redirectTo({
						url: './login'
					});
				})
			},
			countDown(s){	
				if (s > 0) {
					this.seconds = s;
				}else {
					clearInterval(timer)
				}
				if (s < 10) {
					this.seconds = '0' + s;
				}
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
				// background-color: #F4F5F6;
				border-bottom: 1px solid #B9B9B9;
				// border-radius: 10upx;
				position: relative;
				margin-bottom: 20upx;
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
				.login_form_item_label{
					position: absolute;
					right: 40upx;
					top: 26upx;
					z-index: 10;
					button{
						font-size: 26upx;
						height: 56upx;
						background-color: #5C75FF;
						color: #fff;
						line-height: 56upx;
						border-radius: 30upx;
					}
				}
			}
			.login_form_forget{
				text-align: right;
				font-size: 28upx;
				color: #222222;
				width: 100%;
				font-weight: bold;
				background-color: #5C75FF;
			}
		}
</style>
