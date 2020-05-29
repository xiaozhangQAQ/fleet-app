<template>
	<view class="content">	
		<view class="apply_box">
			<block v-if="totalNum">
				<view class="apply_item" v-for="(item,index) in data" :key="index" @click.stop="toDet(item)">
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
							<view class="apply_item_header-r" v-if="item.approvalResult == '0'">
								驳回
							</view>
							<view class="apply_item_header-r" v-else-if="item.approvalResult == '1'">
								审核通过
							</view>
							<view class="apply_item_header-r" v-else-if="item.orderStatusName">
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
						<!-- <view class="apply_item_bottom">
							<view class="apply_item_bottom_l">
								<view class="apply_item_bottom-item">
									<image src="../../static/icon/icon_user1.png"></image><text>{{item.contactPerson}}</text>
								</view>
								<view class="apply_item_bottom-item" @click.stop="phone(item.contactPhone)">
									<image src="../../static/icon/icon_phone.png"></image><text style="color:#707AC9;">联系司机</text>
								</view>
							</view>
							<view class="apply_item_bottom_r">
								<button type="primary" class="apply_item-btn apply_item-btn-fc">发车登记</button>
								<button type="primary" class="apply_item-btn apply_item-btn-qx">取消</button>
							</view>					
						</view> -->
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
	/*
	*公用历史列表页面:
	* 传入参数path区分详情页：订单历史(order)，用车审核历史(approval)，用车指派历史(dispatch)，调度审核历史(audit) ,费用审核历史(cost)
	*/
	import {uniLoadMore} from '@/components/uni-load-more/uni-load-more.vue'
	import {uniNavBar} from '@/components/uni-nav-bar/uni-nav-bar.vue'
	import {uniIcons} from '@/components/uni-icons/uni-icons.vue'
	import {orderHistoryList,approvalHistory,dispatchHistory,dispatchApprovalHistory,chargeCusHistoryList} from '@/api/api.js'
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
				data:[],
				path:'',//历史分类：历史订单，用车审核历史，用车指派历史
				title:'历史订单',//标题
				upStatus: "loading",//加载状态文字
				showLoadMore: false,//显示加载更多
				isnull:false,//是否为空
				pageNum:0,//页数 第一次加载自动加1
				pageSize:10,//每页显示数据
				max: 0,//当前已加载数据数
				totalNum:0,//总数
			};
		},
		onLoad(opts) {
			console.log(opts)
			this.opts = opts.path?opts.path:'';	
			if(opts.path == 'approval'){
				this.title = '历史审核'
			}else if(opts.path == 'dispatch'){
				this.title = '指派记录'
			}else if(opts.path == 'audit'){
				this.title = '历史审核'
			}else if(opts.path == 'cost'){
				this.title = '历史审批'
			}else{
				this.title = '历史记录'
			}
			
			uni.setNavigationBarTitle({
			    title: this.title
			});
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
			toDet(item){ //详情
			    if(this.path == 'cost'){
					uni.navigateTo({
						url:'./orderDetail?id='+item.fkOrderId
					})
					return;
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
				let requests;
				if(this.path == ''){ //申请历史订单接口
					requests = orderHistoryList;
				}else if(this.path == 'approval'){//用车审核历史订单接口
					requests = approvalHistory;
				}else if(this.path == 'dispatch'){//调度指派历史订单接口
					requests = dispatchHistory;
				}else if(this.path == 'audit'){//调度指派历史订单接口
					requests = dispatchApprovalHistory;
				}else if(this.path == 'cost'){//审批费用历史订单接口
					requests = chargeCusHistoryList;
				}
				requests({page:this.pageNum,accountId:this.userInfo.accountId}).then(res=>{
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
			retailStore(id){
				uni.navigateTo({
					url:"../reseller/distributionDetails?id="+id,
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
</style>
