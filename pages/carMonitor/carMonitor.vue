<template>
	<view class="content">
		<view class="header_navbar" :style="{height:navHeight}">
			<uni-nav-bar statusBar="true" background-color="#fff">
				<view slot="left">
					<uni-icons type="back" size="24" @click ="backs"></uni-icons>
				</view>
				<view class="input-view">
					<uni-icons class="input-uni-icon" type="search" size="22" color="#666666" />
					<input confirm-type="search" class="nav-bar-input" type="text" placeholder="输入车牌号" disabled @click="toSearch">
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
			<view class="car_data" v-if="shoeDet">
				<view class="">车牌号：{{carInfo.licenseNo || ''}}</view>
				<view class="">状态：{{carInfo.carRunStatus || ''}}({{carInfo.speed}}公里/小时)</view>
				<view class="">驾驶员：{{carInfo.driverName || ''}}</view>
				<view class="">联系电话：{{carInfo.phoneNo || ''}}</view>
				<button class="btn" type="" @click="toDet">追踪轨迹查询</button>
			</view>
			<view class="car_sum">
				<view class="item">
					<image src="../../static/icon/icon_onLine.png" mode=""></image>
					<view class="text">
						<text class="txt1">{{carJk}}</text>
						<text class="txt2">监控车辆</text>
					</view>
				</view>
				<view class="item">
					<image src="../../static/icon/icon_onLine.png" mode=""></image>
					<view class="text">
						<text class="txt1">{{carOnline}}</text>
						<text class="txt2">在线车辆</text>
					</view>
				</view>
				<view class="item">
					<image src="../../static/icon/icon_outLine.png" mode=""></image>
					<view class="text">
						<text class="txt1">{{carUnline}}</text>
						<text class="txt2">离线车辆</text>
					</view>
				</view>
			</view>
		</view>	
	</view>
</template>

<script>
	import {uniIcons} from '@/components/uni-icons/uni-icons.vue'
	import {uniNavBar} from '@/components/uni-nav-bar/uni-nav-bar1.vue'
	import  {getAllCarLocation,getCarslikeLicenseNo,getCarInfoByLicenseNo} from "@/api/api.js"
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
			navHeight:getApp().globalData.navBarHeight,
			carJk:'',
			carOnline:'',
			carUnline:'',
			carInfo:{
				licenseNo:'',
				carRunStatus:'',
				speed:0,
				driverName:'',
				phoneNo:''
			},
			shoeDet:false,
			// location:'',
			latitude:'20.04422',
			longitude:'110.19989',
			showMap:false,
			markers:[{
				id:'1',
				latitude:'20.04422',
				longitude:'110.19989',
				iconPath:`../../static/icon/icon_outLine.png`,
				width:20,
				heigth:50
			}]
		}
	},
	onLoad(){
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
		toSearch(){
			uni.navigateTo({
				url:'./carSearch'
			})
		},
		toDet(){//跳转详情页
			let str = './trail?licenseNo='+encodeURIComponent(this.carInfo.licenseNo);
			uni.navigateTo({
				url:str
			})
		},
		getPreData(data){ //从carSearch回传参数 车辆id
			const _this = this;
			_this.carInfo.carRunStatus = data.carRunStatus;
			_this.carInfo.licenseNo = data.licenseNo;
			_this.carInfo.carRunStatus = data.mapRunStatus;
			_this.carInfo.driverName = data.driverName;
			_this.carInfo.phoneNo = data.phoneNo;
			_this.shoeDet = true;
			console.log(data)
		},
		initData(){
			getAllCarLocation({orgId:this.userInfo.orgId}).then(res=>{
				this.carJk = res.data.carCount;
				this.carUnline = res.data.outCount;
				this.carOnline = res.data.onCount;
				let arr = [];
				res.data.location.map((val,index)=>{
					// if(val.lat &&val.lon){
						arr.push({
							latitude:String(val.lat),
							longitude:String(val.lon),
							iconPath:`../../static/icon/${val.mapRunStatus=='0'?'icon_onLine':'icon_outLine'}.png`,
							width:20,
							heigth:50,
							id:val.licenseNo
						});
					// }
				})
				this.markers = arr;
				this.showMap = true;
				console.log(this.markers)
				
			})
		},
		getCar(e){
			console.log('e');
			console.log(e.markerId);
			this.shoeDet = true;
			getCarInfoByLicenseNo({licenseNo:e.markerId,orgId:this.userInfo.orgId}).then(res=>{
				console.log(res.data);
				this.carInfo.licenseNo = res.data.licenseNo;
				if(res.data.runStatus=='0'){//	;0-静止  1-行驶  5-离线
					this.carInfo.carRunStatus = '静止';
				}else if(res.data.runStatus=='1'){
					this.carInfo.carRunStatus = '行驶';
				}else{
					this.carInfo.carRunStatus = '离线';
				}
			
				this.carInfo.speed = res.data.speed;
				this.carInfo.driverName = res.data.driverName || '无';
				this.carInfo.phoneNo = res.data.phoneNo || '无';
				console.log(this.carInfo);
			})
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
	.btn{
		background: #5C75FF;
		color: #fff;
	}
}
.car_sum{
	.fixed-lb();
	.size(100%,98rpx);
	.flex(space-around);
	background-color: #fff;
	.item{
		.flex();
		image{
			.size(35rpx,36rpx);
		}
		.text{
			.flex-col();
			margin-left: 15rpx;
			.txt1{
				.font(32rpx,#222,38rpx);
			}
			.txt2{
				margin-top: 8rpx;
				.font(22rpx,#B9B9B9,26rpx);
			}
			
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
