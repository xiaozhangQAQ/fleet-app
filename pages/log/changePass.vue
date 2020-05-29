<template>
	<view class="content">
		<view class="login_title">
		  修改密码
		</view>
		<view class="login_form">
			<view class="login_form_item">
				<view class="login_form_label">
					旧密码
				</view>
				<input password="true" v-model="oldPassword" class="login_form_input" placeholder="请输入旧密码"/>
			</view>
			<view class="login_form_item">
				<view class="login_form_label">
					新密码
				</view>
				<input password="true" v-model="newPassword" class="login_form_input" placeholder="请输入新密码"/>
			</view>
			<view class="login_form_item">
				<view class="login_form_label">
					确认新密码
				</view>
				<input password="true" v-model="newPasswordAgain" class="login_form_input" placeholder="请再次输入旧密码"/>
			</view>
			<view class="form_putbtn">
				<button type="primary" @click="upto" hover-class="none">保存</button>
			</view>
		</view>
	</view>
</template>

<script>
	import {changePassword} from '../../api/api.js'
	import {  
	     mapState  
	    } from 'vuex'; 
    export default{
		computed: mapState(['userInfo']),
		data(){
			return{
				oldPassword:'',
				newPassword:'',
				newPasswordAgain:''
			}
		},
		methods:{
			upto(){
				if(this.newPassword != this.newPasswordAgain){
					uni.showToast({
						title:'请确认两次输入的新密码是否相同',
						icon:"none"
					})
					return;
				}
				changePassword({driverId:this.userInfo.accountId,oldPassword:this.oldPassword,newPassword:this.oldPassword}).then(res=>{
					uni.showToast({
						title:'修改成功'
					})
					uni.navigateBack()
				}).
				catch(err=>{
					uni.showToast({
						title:'修改失败'
					})
				})
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
				display: flex;
				margin-bottom: 20upx;
				align-items:center;
				.login_form_input{
					height: 100%;
					// padding: 0 30upx;
					flex: 1;
					font-size: 30upx;
				}
				.login_form_label{
					font-weight: bold;
					font-size: 30upx;
					color: #222;
					padding-right: 30upx;
				}
			}
		}
</style>
