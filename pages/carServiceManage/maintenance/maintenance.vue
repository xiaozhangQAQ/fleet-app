<template>
	<view class="content">
		<view class="header_navbar" :style="{height:navHeight}">
			<uni-nav-bar title="待审核" statusBar="true" background-color="#fff">
				<view slot="left">
					<uni-icons type="back" size="24" @click.stop ="backs"></uni-icons>
				</view>
				<view slot="left" style="margin-left: 40upx;z-index: 10;">
					<view style="font-size: 14px;color: #09BB07;width: 120upx;" @click.stop="toOld">
						审核记录
					</view>
				</view>
			</uni-nav-bar>
		</view>	
		<view class="apply_box" :style="{paddingTop:navHeight}">
			<block v-if="totalNum">
				<view class="apply_item" v-for="(item,index) in data" :key="index" @click.stop="toDet(item.id)">
					<view class="apply_item_box">
						<view class="apply_item_header">
							<view class="apply_item_header-l">
								<view class="">
									{{item.licenseNo}}
								</view>
								<text>{{item.createTime}}</text>
							</view>
							<view class="apply_item_header-r">
								{{item.repairStatus}}
							</view>
						</view>
						<view class="apply_item_content">
					         <view class="form_listbox">
					          	<view class="form_list_item">
					          		<view class="form_list_item_content">
					          			<view class="form_list_item_content-title">
					          				车型
					          			</view>
					          			<view class="form_list_item_content-extra">
					          				<view class="form_list_item_content-extra-text">
					          					{{item.carName || '-'}}
					          				</view>
					          			</view>
					          		</view>
					          	</view>
								<view class="form_list_item">
									<view class="form_list_item_content">
										<view class="form_list_item_content-title">
											维保类型
										</view>
										<view class="form_list_item_content-extra">
											<view class="form_list_item_content-extra-text">
												{{item.repairType || '-'}}
											</view>
										</view>
									</view>
								</view>
								<view class="form_list_item">
									<view class="form_list_item_content">
										<view class="form_list_item_content-title">
											保养时间
										</view>
										<view class="form_list_item_content-extra">
											<view class="form_list_item_content-extra-text">
												{{item.repairTime || '-'}}
											</view>
										</view>
									</view>
								</view>
								<view class="form_list_item">
									<view class="form_list_item_content">
										<view class="form_list_item_content-title">
											费用预估(元)
										</view>
										<view class="form_list_item_content-extra">
											<view class="form_list_item_content-extra-text">
												{{item.estimateCost || '-'}}
											</view>
										</view>
									</view>
								</view>
							</view>	
						</view>
						<view class="apply_item_det" v-if="item.reason">
							用车事由: {{item.reason}}
						</view>
						<view class="apply_item_bottom">
							<view class="apply_item_bottom_l">
								<view class="apply_item_bottom-item">
									<image src="../../../static/icon/icon_user1.png"></image><text>{{item.driverName}}</text>
								</view>
								<view class="apply_item_bottom-item" @click.stop="phone(item.contactPhone)">
									<image src="../../../static/icon/icon_phone.png"></image><text style="color:#707AC9;">联系司机</text>
								</view>
							</view>
							<view class="apply_item_bottom_r">
								<button type="primary" class="apply_item-btn apply_item-btn-fc" style="color: #A09E82;" @click.stop="toCheck(item.id)">审核</button>
							</view>					
						</view>
					</view>
				</view>
			</block>
			<uni-load-more :status="upStatus" v-if="showLoadMore"/>
			<block v-if="isnull">
				<view class="tt-nullbox">
				  <view class="tt-nullbox-img">
					<image src="../../../static/null_order.png" alt=""></image>
				  </view>
				  <view class="tt-nullbox-info">这里空空如也，去逛逛吧~</view>
				</view>
			</block>
		</view>	
	</view>
</template>

<script>
	
	import {uniLoadMore} from '@/components/uni-load-more/uni-load-more.vue'
	import {uniNavBar} from '@/components/uni-nav-bar/uni-nav-bar.vue'
	import {uniIcons} from '@/components/uni-icons/uni-icons.vue'
	import {waitHandleList} from '@/api/api.js'
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
				navHeight:getApp().globalData.navBarHeight,
				upStatus: "loading",//加载状态文字
				showLoadMore: false,//显示加载更多
				isnull:false,//是否为空
				pageNum:0,//页数 第一次加载自动加1
				pageSize:10,//每页显示数据
				max: 0,//当前已加载数据数
				totalNum:0,//总数
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
			toOld(){ //历史记录
				uni.navigateTo({
					url:'./maintenanceHistory'
				})
			},
			toDet(id){ //详情
				uni.navigateTo({
					url:'./maintenanceDetail?id='+id
				})
			},
			toCheck(id){//去审核
				uni.navigateTo({
					url:'./maintenanceCheck?id='+id+'&accountId='+this.userInfo.accountId
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
				waitHandleList({page:this.pageNum,accountId:this.userInfo.accountId,limit:this.pageSize}).then(res=>{
					var newdata = [];
					this.totalNum = res.total;
					if(res.data.length>0){
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
	
	.form_listbox{
		width: 100%;
	}
	.form_listbox .form_list_item::after{
		height: 0;
	}
</style>
