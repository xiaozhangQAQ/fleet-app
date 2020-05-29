<template>
	<view class="content">	
		<view class="apply_box">
			<block v-if="totalNum">
				<view class="apply_item" v-for="(item,index) in data" :key="index" @click="toDet(item)">
					<view class="apply_item--box">
						<view class="apply_item--title">
							<image src="../../../static/icon/icon_index_sjtx.png" mode=""></image> {{item.licenseNo}}
						</view>
						<view class="apply_item--det">
							{{item.alarmMsg}}
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
	/*
	*公用告警详情页:
	* 
	*/
	import {uniLoadMore} from '@/components/uni-load-more/uni-load-more.vue'
	import {uniNavBar} from '@/components/uni-nav-bar/uni-nav-bar.vue'
	import {uniIcons} from '@/components/uni-icons/uni-icons.vue'
	import {getCarAlarmList} from '@/api/api.js'
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
				remindType:'',
				title:'告警提醒',//标题
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
			this.title = opts.text;
			this.remindType = opts.code;
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
				uni.navigateTo({
					url:'./carAlarmDetail?armId='+item.alarmId+'&licenseNo='+item.licenseNo+'&remindType='+this.remindType+'&title='+this.title
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
				getCarAlarmList({page:this.pageNum,accountId:this.userInfo.accountId,limit:this.pageSize,remindType:this.remindType}).then(res=>{
					var newdata = [];
					this.totalNum = res.total;
					if(res.data){
						newdata=res.data;
						this.data = this.data.concat(newdata);
						this.isnull = false;
						if (this.max >= this.totalNum) {
							this.showLoadMore = false;
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
	.apply_item{
		.apply_item--box{
			background-color: #fff;
			border-radius: 10px;
		}
		.apply_item--title{
			font-size: 30upx;
			color: #000;
			font-weight: bold;
			padding: 20upx;
			image{
				width: 44upx;
				height: 38upx;
				margin-right: 20upx;
			}
		}
		.apply_item--det{
			color: #616162;
			font-size: 26upx;
			padding: 20upx;
		}
	}
</style>
