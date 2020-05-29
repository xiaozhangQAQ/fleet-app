<template>
	<view class="content">
		<!-- <view class="header_navbar" :style="{height:navHeight}">
			<uni-nav-bar title="用车申请列表" statusBar="true" background-color="#fff">
				<view slot="left">
					<uni-icons type="back" size="24" @click ="backs"></uni-icons>
				</view>
				<view slot="left" style="margin-left: 40upx;">
					<uni-icons type="plus" size="24" @click="toAdd"></uni-icons>
				</view>
			</uni-nav-bar>
		</view>	 -->
		<view class="apply_box">
			<block v-if="totalNum">
				<view class="apply_item" v-for="(item,index) in data" :key="index" @click="toDet(item)">
					<view class="apply_item_box">
						<view class="apply_item_header">
							<view class="apply_item_header-l">
								<view class="apply_item_header-bage" v-if="item.selfDriverFlag == '1'">
									自驾
								</view>
								<view class="apply_item_header-bage" v-else>
									非自驾
								</view>
								<text>{{item.orderNo}}</text>
							</view>
							<view class="apply_item_header-r">
								{{item.orderStatusName}}
							</view>
						</view>
						<view class="apply_item_content">
							<view class="apply_item_content_l">
								<view class="apply_item_addr">
									<view class="apply_item_addr-name">
										{{item.departure}}
									</view>
									<view class="apply_item_addr-time">
										{{item.startTime}}
									</view>
								</view>
								<view class="apply_item_addr">
									<view class="apply_item_addr-name">
										{{item.destination}}
									</view>
									<view class="apply_item_addr-time">
										{{item.endTime}}
									</view>
								</view>
							</view>
							<!-- <view class="apply_item_content_r">
								<text>{{item.orderStatusName}}</text>
							</view> -->
						</view>
						<view class="apply_item_det" v-if="item.reason">
							用车事由: {{item.reason}}
						</view>
						<view class="apply_item_bottom">
							<view class="apply_item_bottom_l">
								<view class="apply_item_bottom-item" v-if="item.selfDriverFlag != '1'">
									<image src="../../static/icon/icon_user1.png"></image><text class="apply_item_bottom-item-username">{{item.contactPerson}}</text>
								</view>
								<view class="apply_item_bottom-item" @click.stop="phone(item.contactPhone)" v-if="item.selfDriverFlag != '1'">
									<image src="../../static/icon/icon_phone.png"></image><text style="color:#707AC9;">联系司机</text>
								</view>
							</view>
							<view class="apply_item_bottom_r">
								<button type="primary" class="apply_item-btn apply_item-btn-qx" @click.stop="orderCancels(item.id)" v-if="checkUp(item,'1') == 0?false:true">取消</button>
								<button type="primary" class="apply_item-btn apply_item-btn-up" @click.stop="orderUpAgains(item.id)" v-if="checkUp(item,'2') == 0?false:true">重新申请</button>
								<button type="primary" class="apply_item-btn apply_item-btn-qx" @click.stop="orderDepart(item.id)" v-if="checkUp(item,'3') == 0?false:true">发车登记</button>
								<button type="primary" class="apply_item-btn apply_item-btn-up" @click.stop="orderReturn(item.id)" v-if="checkUp(item,'4') == 0?false:true">收车入库</button>
								<button type="primary" class="apply_item-btn apply_item-btn-qx" @click.stop="orderUpLoadAgain(item)" v-if="checkUp(item,'5') == 0?false:true">重新上传</button>
								<button type="primary" class="apply_item-btn apply_item-btn-qx" @click.stop="orderUpLoad(item)" v-if="checkUp(item,'6') == 0?false:true">上传费用</button>
							</view>					
						</view>
					</view>
				</view>
			</block>
			<uni-load-more :status="upStatus" v-if="showLoadMore"/>
			<block v-if="isnull">
				<view class="tt-nullbox">
				  <view class="tt-nullbox-img">
					<image src="../../static/null_order.png" alt=""></image>
				  </view>
				  <view class="tt-nullbox-info">没有数据</view>
				</view>
			</block>
		</view>	
	</view>
</template>

<script>
	
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue'
	// import {uniNavBar} from '@/components/uni-nav-bar/uni-nav-bar.vue'
	import uniIcons from '@/components/uni-icons/uni-icons.vue'
	import {orderFacadeList,orderCancel} from '@/api/api.js'
	import {
	    mapState 
	} from 'vuex'; 
	export default {
		computed: mapState(['userInfo']),
		components:{
			uniLoadMore,uniIcons
		},
		data() {
			return {
				data:[],
				navHeight:getApp().globalData.navBarHeight,
				upStatus: "loading",//加载状态文字
				showLoadMore: false,//显示加载更多
				isnull:false,//是否为空
				pageNum:0,//页数 第一次加载自动加1
				pageSize:10,//每页显示数据
				max: 0,//当前已加载数据数
				totalNum:0//总数
			};
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
			toAdd(){ //添加
				uni.navigateTo({
					url:'./applyAdd'
				})
			},
			toDet(item){ //详情
			   if(item.orderStatus == '06'){ //任务执行中
			       uni.navigateTo({
			       	url:'./orderExecuting?id='+item.id
			       })
				   return false;
			   }
				uni.navigateTo({
					url:'./orderDetail?id='+item.id
				})
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
				orderFacadeList({page:this.pageNum,accountId:this.userInfo.accountId}).then(res=>{
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
				
			},
			phone(call){
				if(call == ''){
					return;
				}
				uni.showModal({
				    title: '提示',
				    content: call,
				    success: function (res) {
				        if (res.confirm) {
				           uni.makePhoneCall({
				               phoneNumber: call
				           });
				        }
				    }
				});
			},
			retailStore(id){
				uni.navigateTo({
					url:"../reseller/distributionDetails?id="+id,
				})
			},
			orderCancels(id){ //取消按钮
			    const _this = this; 
			    uni.showModal({
			    	title: '提示',
					content: '是否取消订单',
					success: function (res) {
						if (res.confirm) {
							orderCancel({accountId:_this.userInfo.accountId,fkOrderId:id}).then(res=>{
								let pages = getCurrentPages();
								let curPage = pages[pages.length - 1];  //当前页面
								curPage.onShow();//刷新当前页
							})
						}
					}
			    })		
			},
			orderUpAgains(id){ //重新申请
				uni.navigateTo({
					url:'./applyAdd?id='+id
				})
			},
			orderDepart(id){ //发车登记
				uni.navigateTo({
					url:'./departureRegist?id='+id+'&type=depart'
				})
			},
			orderReturn(id){ //发车登记
				uni.navigateTo({
					url:'./departureRegist?id='+id+'&type=return'
				})
			},
			orderUpLoad(item){//上传费用
				uni.navigateTo({
					url:'./costUpload?id='+item.id+'&licenseNo='+item.licenseNo
				})
			},
			orderUpLoadAgain(item){ //重新上传
				uni.navigateTo({
					url:'./costUpload?id='+item.id+'&licenseNo='+item.licenseNo+'&type=depart'
				})
			},
			checkUp(item,status){ //返回值 0 不显示 1显示
				//1为取消按钮 2为重新申请 3为发车登记 4为收车入库 5为重新上传 6上传费用
				let statusArr = [];
				if(['13','12','11','08','05','042','041','03','02','01'].indexOf(item.orderStatus) != -1){
					if(item.orderStatus == '11'){
						statusArr = statusArr.concat(['2']);
					}
					if(item.orderStatus == '042'){
						if(item.executeSendReceiveFlag == '1'){
							statusArr = statusArr.concat(['3']);
						}
					}	
					statusArr = statusArr.concat(['1']);
				}else if(item.orderStatus == '06'){
					if(item.executeSendReceiveFlag == '1'){
						if(item.selfDriverFlag == "1"){
							statusArr = statusArr.concat(['4']);
						}			
					}
				}else if(item.orderStatus == '07'){
					if(item.selfDriverFlag == '1'){
						if(item.executeChargeFlag == '1'){
							if(item.settlementStatus =='2'){
								statusArr = statusArr.concat(['5']);
							}else{
								statusArr = statusArr.concat(['6']);
							}				
						}
					}				
				} 
				
				return statusArr.indexOf(status) == -1?0:1;
				// return false;
				// if(['13','12','11','08','06','05','042','041','03','02','01'].indexOf(item.orderStatus) != -1){
				// 	return ['1'];
				// }
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
		// padding-top: 130upx;
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
	.apply_item .apply_item_box .apply_item_bottom .apply_item_bottom_r{
		.apply_item-btn-qx{
			color: #FF6666;
			&::after{
				border-color: #FF6666;
			}
		}
		.apply_item-btn-up{
			color: #FFCF4C;
			&::after{
				border-color: #FFCF4C;
			}
		}
	}
	
</style>
