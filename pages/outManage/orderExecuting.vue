<template>
	<view class="content">
		<view class="header_navbar">
			<uni-nav-bar title="执行中" statusBar="true" background-color="#fff">
				<view slot="left">
					<uni-icons type="back" size="24" @click ="backs"></uni-icons>
				</view>
				<view slot="left" style="margin-left: 40upx;z-index: 10;">
					<view style="font-size: 14px;color: #09BB07;width: 120upx;" @click="toDet">
						任务详情
					</view>
				</view>
			</uni-nav-bar>
		</view>	
		<view>
			<map  class="maps"
			v-if="showMap"
			:latitude="latitude" 
			:longitude="longitude" 
			:scale="15"
			:markers="markers"
			@markertap="getCar"
			></map>
			<view class="car_data">
				<view class="car_data-box">
					<view class="car_data-box_l">
						<image src="../../static/icon/icon_user.png" class="user_img"></image>
						<view class="user_phone">
							<view>
								<!-- user -->
							</view>
							<image src="../../static/icon/icon_phone.png"></image><text>{{carInfo.contactPhone}}</text>
						</view>
					</view>
					<view class="car_data-box_r">
						<image src="../../static/icon/icon_phone.png"></image><text>任务执行中</text>
					</view>
				</view>
				<view class="car_data-bottom">
					<text>车型:{{carInfo.carName}}</text>
					<text>车牌号:{{carInfo.licenseNo}}</text>
				</view>
			</view>
		</view>	
	</view>
</template>

<script>
	import {uniIcons} from '@/components/uni-icons/uni-icons.vue'
	import {uniNavBar} from '@/components/uni-nav-bar/uni-nav-bar.vue'
	import  {courseOfOrder} from "@/api/api.js"
	import {
	    mapState 
	} from 'vuex'; 
export default {
	computed: mapState(['userInfo']),
	components:{
		uniNavBar,uniIcons
	},
	data(){
		return{
			opts:{},
			carInfo:{},
			// location:'',
			latitude:'20.04422',
			longitude:'110.19989',
			showMap:true
		}
	},
	onLoad(opts){
		this.opts = opts;
		
		/* 获取位置 */
		
		let that = this;
		uni.getLocation({
			type:'gcj02',
			success(res) {
				that.latitude = res.latitude;
				that.longitude = res.longitude;
				console.log(res.latitude)
				console.log(res.longitude)
			}
		})
	},
	onShow() {
		this.initData()
	},
	methods:{
		backs(){ //返回
			uni.navigateBack();
		},
		toDet(){//跳转详情页
			uni.navigateTo({
				url:'./orderDetail?id='+this.opts.id
			})
		},
		
		initData(){
			courseOfOrder({id:this.opts.id}).then(res=>{
				this.carInfo = res.data;
			})
		},
		getCar(e){
			// _this.shoeDet = true;
			// _this.carInfo = data;
		}
	}
	
}
</script>

<style lang="less">
@import  '../../style/min/minx.less';
.content{
	position: relative;
	.size(100vw,100vh);
}
.maps{
	.size(100vw,100vh);
}
.car_data{
	.fixed-lb(0,110rpx);
	.size(700rpx,auto);
	right: 0;
	margin: auto;
	background-color: #fff;
	padding: 20rpx;
	.radius(8rpx);
	view{
		padding: 13rpx 0;
		.font(30rpx);
	}
	.car_data-box{
		display: flex;
		justify-content: space-between;
		align-items: center;
		.car_data-box_l{
			display: flex;
			align-items: flex-end;
			.user_img{
				width: 100upx;
				height: 100upx;
				margin-right: 10upx;
			}
			.user_phone{
				image{
					width: 35upx;
					height: 35upx;
					position: relative;
					top: 5px;
					margin-right: 10upx;
				}
				text{
					font-size: 28upx;
				}
			}
		}
		.car_data-box_r{
			image{
				width: 35upx;
				height: 35upx;
				position: relative;
				top: 5px;
				margin-right: 10upx;
			}
			text{
				font-size: 28upx;
				color: rgb(213,153,107);
			}
		}
	}
	.car_data-bottom{
		padding: 40upx 0;
		text{
			font-size: 28upx;
			color: #999;
			margin-right: 40upx;
		}
	}
}
.input-view {
		/* #ifndef APP-PLUS-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		/* width: 500rpx;
*/
		flex: 1;
		background-color: #f8f8f8;
		height: 30px;
		border-radius: 15px;
		padding: 0 15px;
		flex-wrap: nowrap;
		margin: 7px 0;
		line-height: 30px;
		
		.input-uni-icon {
			line-height: 30px;
		}
			
		.nav-bar-input {
			height: 30px;
			line-height: 30px;
			/* #ifdef APP-PLUS-NVUE */
			width: 370rpx;
			/* #endif */
			padding: 0 5px;
			font-size: 28rpx;
			background-color: #f8f8f8;
		}
	}
	.uni-navbar__header-btns-left{
		width: 65rpx;
	}
</style>
