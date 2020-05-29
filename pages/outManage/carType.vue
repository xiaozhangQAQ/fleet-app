<template>
	<view class="content">
		<view class="header_navbar" :style="{height:navHeight}">
			<uni-nav-bar statusBar="true" background-color="#fff">
				<view slot="left">
					<uni-icons type="back" size="24" @click ="backs"></uni-icons>
				</view>
				<view class="input-view">
					<uni-icons class="input-uni-icon" type="search" size="22" color="#666666" />
					<input confirm-type="search" class="nav-bar-input" type="text" placeholder="输入车牌号" @confirm="confirm">
				</view>
				
			</uni-nav-bar>
		</view>	
		<view class="apply_box" :style="{paddingTop:navHeight}">
			<block v-if="totalNum">
				<view class="carType_body" v-for="(i,e) in data" :key="e" @click="getCarType(i)">
					<view class="carType_body_item">
						{{i.licenseNo}}
					</view>
					<view class="carType_body_item">
						{{i.carLevelName}}
					</view>
					<view class="carType_body_item">
						{{i.carName}}
					</view>
				</view>
			</block>
			<uni-load-more :status="upStatus" v-if="showLoadMore"/>
			<block v-if="isnull">
				<view class="tt-nullbox">
				  <view class="tt-nullbox-img">
					<image src="../../static/null_order.png" alt=""></image>
				  </view>
				  <view class="tt-nullbox-info">这里空空如也，去逛逛吧~</view>
				</view>
			</block>
		</view>	
	</view>
</template>

<script>
	
	import {uniLoadMore} from '@/components/uni-load-more/uni-load-more.vue'
	import {uniNavBar} from '@/components/uni-nav-bar/uni-nav-bar1.vue'
	import {uniIcons} from '@/components/uni-icons/uni-icons.vue'
	import {carModelList,carList,dispatchNewCarList} from '@/api/api.js'
	import {
	    mapState 
	} from 'vuex'; 
	export default {
		computed: mapState(['userInfo']),
		components:{
			uniLoadMore,uniNavBar,uniIcons
		},
		data() {
			return {
				opts:{},
				data:[],
				navHeight:getApp().globalData.navBarHeight,
				upStatus: "loading",//加载状态文字
				showLoadMore: false,//显示加载更多
				isnull:false,//是否为空
				pageNum:0,//页数 第一次加载自动加1
				pageSize:20,//每页显示数据
				max: 0,//当前已加载数据数
				totalNum:0,//总数
			};
		},
		onLoad(opts){
			 this.opts = opts;
		},
		onShow(){
			this.initData();
		},
		onUnload() {
			this.max = 0,
			this.data = [],
			this.upStatus = "loading",
			this.showLoadMore = false;
		},
		onReachBottom() {
			
			if (this.max >= this.totalNum) {
				this.upStatus = "noMore!"
				return;
			}
			this.showLoadMore = true;
			setTimeout(() => {
				this.setDate();
			}, 300);
		},
		onPullDownRefresh() {
			uni.stopPullDownRefresh();
		},
		methods: {
			backs(){ //返回
				uni.navigateBack();
			},
			getCarType(data){ //选择车型后返回
			    this.getCarSet(data);
				uni.navigateBack();
			},
			getCarSet(data){ //触发上一页面getPreData方法 回传参数
				let pages = getCurrentPages();
				let prevPage = pages[pages.length - 2];  //上一个页面
				prevPage.$vm.getPreData(data);
			},
			initData(){
				this.pageNum = 0;
				this.max = 0;
				this.data = [];
				this.showLoadMore = true;
				this.isnull = false;
				this.upStatus = "loading"
				setTimeout(() => {			
					this.setDate();
					
				}, 300);
			},
			setDate() {
				this.max += this.pageSize;
				this.pageNum += 1;
				let requests,datas={};
				if(this.opts.type == 'order'){
					requests = carList;
					datas = {page:this.pageNum,limit:this.pageSize,accountId:this.opts.accountId,orderId:this.opts.orderId};
				}else if(this.opts.type == 'newOrder'){
					requests = dispatchNewCarList;
					datas = {page:this.pageNum,limit:this.pageSize,accountId:this.opts.accountId,startTime:this.opts.startTime,endTime:this.opts.endTime};
				}
				
				requests(datas).then(res=>{
					var newdata = [];
					this.totalNum = res.total;			
					if(res.data){
						newdata=res.data;
						this.data = this.data.concat(newdata);
						this.isnull = false;
						if (this.max >= this.totalNum) {
							this.upStatus = "noMore!"
						}
					}else{
						this.showLoadMore = false;
						this.isnull = true;
					}	
					uni.stopPullDownRefresh();
				})
				
			}
		}
	}
</script>

<style lang="less">
	page{
		width: 100%;
		height: 100%;
	}
	.content{
		height: 100%;
		width: 100%;
		display: flex;
		flex-direction: column;
	}
	.header_navbar{
	    position: fixed;
		top: 0;
		// background-color: #fff;
		z-index: 10;
		overflow: hidden;
	}
	.apply_box{
		padding-top: 130upx;
	}
	.tt-nullbox{
		display: flex;
		background-color: rgba(255,255,255,0);
		flex-direction: column;
		align-items: center;
		padding: 100upx 0;
		.tt-nullbox-img{
			padding: 56upx;
			image{
				width: 300upx;
				height: 216upx;
			}
		}
		.tt-nullbox-info{
			color: #B0B0B0;
			font-size: 28upx;
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
	
	.carType_body{
		width: 100%;
		display: flex;
		background-color: #fff;
		padding: 0 20upx;
		position: relative;
		.carType_body_item{
			flex: 1;
			font-size: 14px;
			padding: 35upx 0;
		}		
		&::after{
			content: '';
			width: 100%;
			height: 1px;
			background: #eee;
			bottom: 0;
			position: absolute;
		}
	}
</style>
