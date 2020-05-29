<template>
	<view class="content">
		<view class="user_header">
			<view class="user_info">
				<view class="user_info-img">
					<image src="../../static/icon/icon_user.png"></image>
				</view>
				<view class="user_info-inner">
					<view class="user_info-user">
						<!-- <view v-if="!user" class="user_info-name">xxx</view> -->
						<view class="user_info-name">{{userInfo.realName}}</view>
						<view class="user_info-user-det">{{userInfo.orgName}}</view>
					</view>
				</view>
			</view>
			<view class="user_act">
			  <image src="../../static/icon/icon_edit.png" @click="toSet"></image>
			</view>
		</view>
		<view class="banner">
			<swiper class="banner_swiper" indicator-dots='true' autoplay='true' indicator-color="rgba(255,255,255,0.5)" indicator-active-color="#fff">
				<swiper-item v-for="(i,e) in banner" :key="e">
					<view class="swiper-item uni-bg-red" style="background-color: #eee;height: 100%;border-radius: 10upx;overflow: hidden;">
						<image :src="i.imgUrl" style="width: 100%;height: 100%;"></image>
					</view>
				</swiper-item>
				
			</swiper>
		</view>
		<!-- 出行管理 -->
		<view class="user_nav">
			<view class="user_nav-box">
				<view class="user_nav-header">
					<text class="user_nav-header-l">出行管理</text>
				</view>
				<view class="nav_gird">
					<uni-grid :column="4" :show-border="false" :square="false">
						<uni-grid-item v-for="(item, index) in cxdatas" :key="index" text="12" v-if="item.show">
							<view class="nav_gird-item" @click="toPath(item)">
								<image :src="item.image" class="image" mode="scaleToFill" />
								<text class="text">{{ item.text }}</text>
								<!-- <view v-if="item.badge" class="grid-dot">
									<uni-badge :text="item.badge" type="warning"/>
								</view> -->
							</view>						
						</uni-grid-item>
					</uni-grid>
					<!-- <view v-for="(item, index) in cxdatas" :key="index" text="12" v-if="item.show">
						<text class="text" @click="toPath(item)">{{ item.text }}</text>
					</view> -->
					
				</view>
			</view>		
		</view>
		<!-- 车务管理 -->
		<view class="user_nav">
			<view class="user_nav-box">
				<view class="user_nav-header">
					<text class="user_nav-header-l">车务管理</text>
				</view>
				<view class="nav_gird">
					<uni-grid :column="4" :show-border="false" :square="false">
						<uni-grid-item v-for="(item, index) in cwdatas" :key="index" text="12" v-if="item.show">
							<view class="nav_gird-item" @click="toPath(item)">
								<image :src="item.image" class="image" mode="scaleToFill" />
								<text class="text">{{ item.text }}</text>
							</view>		
						</uni-grid-item>
					</uni-grid>
				</view>
			</view>		
		</view>
		<!-- 其它 -->
		<view class="user_nav" style="margin-bottom: 40upx;">
			<view class="user_nav-box">
				<view class="user_nav-header">
					<text class="user_nav-header-l">其它</text>
				</view>
				<view class="nav_gird">
					<uni-grid :column="4" :show-border="false" :square="false">
						<uni-grid-item v-for="(item, index) in qtdatas" :key="index" text="12">
							<view class="nav_gird-item" @click="toPath(item)">
								<image :src="item.image" class="image" mode="scaleToFill" />
								<text class="text">{{ item.text }}</text>
							</view>		
						</uni-grid-item>
					</uni-grid>
				</view>
			</view>		
		</view>
	</view>
</template>

<script>
	import uniGrid from "@/components/uni-grid/uni-grid.vue"
	import uniGridItem from "@/components/uni-grid-item/uni-grid-item.vue"
	import uniIcons from "@/components/uni-icons/uni-icons.vue"
	import uniBadge from "@/components/uni-badge/uni-badge.vue"
	// import uniList from '@/components/uni-list/uni-list.vue'
	// import uniListItem from '@/components/uni-list-item/uni-list-item.vue'
	import {
	    mapState,mapMutations  
	} from 'vuex';  
	import {getAllCount} from '@/api/api.js'
	
	export default {
		components: {uniGrid,uniGridItem,uniIcons,uniBadge},
		computed: mapState(['userInfo','loginToken']),
		data() {
			return {
				banner:[],
				cxdatas:[{
						image: '/static/icon/icon_index_ycsq.png',
						text: '申请用车',
						textCode:'A1',
						path:'../outManage/applyList',
						show:false,
						badge:''
					},{
						image: '/static/icon/icon_index_ycsh.png',
						text: '用车审核',
						textCode:'A2',
						path:'../outManage/usecarCheck',
						show:false,
						badge:''
					},{
						image: '/static/icon/icon_index_ddzp.png',
						text: '调度指派',
						textCode:'A3',
						path:'../outManage/dispatchAppoint',
						show:false,
						badge:''
					},{
						image: '/static/icon/icon_index_ddsh.png',
						text: '调度审核',
						textCode:'A4',
						path:'../outManage/dispathAudit',
						show:false,
						badge:''
					},{
						image: '/static/icon/icon_index_fysh.png',
						text: '费用审核',
						textCode:'A5',
						path:'../outManage/dispathCost',
						show:false,
						badge:''
					},
					{
						image: '/static/icon/icon_index_dd.png',
						text: '历史订单',
						textCode:'A6',
						path:'../outManage/oldRecord',
						show:false,
						badge:''
					},
					{
						image: '/static/icon/icon_index_xcpc.png',
						text: '新增派车',
						textCode:'A7',
						path:'../outManage/newAddOrder',
						show:false,
						badge:''
					},
					{
						image: '/static/icon/icon_cxtj.png',
						text: '出行统计',
						textCode:'A8',
						path:'../carServiceManage/statistical/statistical',
						show:false,
						badge:''
					}
				],
				cwdatas:[{
						image: '/static/icon/icon_index_jk.png',
						text: '车辆监控',
						textCode:'B1',
						path:'../carMonitor/carMonitor',
						show:false
					},{
						image: '/static/icon/icon_index_wbsh.png',
						text: '维保审核',
						textCode:'B3',
						path:'../carServiceManage/maintenance/maintenance',
						show:false
					},{
						image: '/static/icon/icon_index_sjtx.png',
						text: '告警提醒',
						textCode:'B4',
						path:'../carServiceManage/carAlarm/carAlarm',
						show:false
					}
				],
				qtdatas:[{
						image: '/static/icon/icon_index_csh.png',
						text: '车生活',
						path:'',
						show:true
					},{
						image: '/static/icon/icon_index_lxkf.png',
						text: '联系客服',
						path:'',
						show:true
					}
				]
			}
		},
		// onLoad() {
		// 	console.log('adyCallback')
		// 	this.userInfoReadyCallback = (userInfo)=>{
		// 		this.login(userInfo); 
		// 		console.log('触发userInfoReadyCallback')
		// 	}
		// },
		onShow() {
			const _this = this;
			_this.getBanner();
			if(_this.loginToken != '' && _this.loginToken != undefined){
				_this.checkItem(_this.userInfo.orderFuncCode,_this.userInfo.carFuncCode);
				_this.getItemNum();
			}
			
	      //判断loginToken是否存在 存在则是登录状态 不存在则是未登录状态		
   //        uni.getStorage({//获得保存在本地的用户信息
   //        	key: 'loginToken',  
   //        	success:(res) => {
			// 	console.log(res)
   //        		uni.getStorage({ //获取用户信息,loginToken存入vuex
   //        			key:'userInfo',
   //        			success:(data)=>{
   //        				_this.login({userInfo:data.data,loginToken:res.data});	
			// 			_this.checkItem(data.data.orderFuncCode,data.data.carFuncCode);
			// 			_this.getItemNum();
			// 			_this.getBanner();
   //        			}
   //        		})
   //        	},
			// fail:()=>{
			// 	uni.showModal({
			// 	  title:'未登录',
			// 	  content: '您当前未登录，需要登录后才能继续',
			// 	  showCancel: false,
			// 	  success: (res) => {
			// 		uni.reLaunch({
			// 			url: '../log/login'
			// 		});  
			// 	  }
			// 	}) 
			// }
   //        }); 
	},
	
	methods: {
	  ...mapMutations(['login']),
	  toSet(){
		uni.navigateTo({
			url:'../set/set'
		})  
	  },
	  toPath(e) {
		let path = e.path;		
		if(path != ''){
			uni.navigateTo({
				url:path
			})
		}else if(e.text == '联系客服'){
			uni.showModal({
				title: '确定拨打客服电话吗?',
				content: '客服热线: 400-',
				success: function (res) {
					if (res.confirm) {
						if (res.confirm) {
						   uni.makePhoneCall({
						       phoneNumber: '400-'
						   });
						}
					}
				}
			});
		}else if(e.text == '车生活'){
			// uni.getLocation().then(({latitude,longitude})=>{
			// 	uni.navigateTo({
			// 		url:`/pages/carLive/carLive?lat=${latitude}&lng=${longitude}`
			// 	})
			// },err=>uni.showToast({title:'获取位置出错',icon:'none'}));
			uni.getLocation({
			    type: 'wgs84',
			    success: function (res) {
			        // console.log('当前位置的经度：' + res.longitude);
			        // console.log('当前位置的纬度：' + res.latitude);
					uni.navigateTo({
						url:`/pages/carLive/carLive?lat=${res.latitude}&lng=${res.longitude}`
					})
			    },
				fail:function(err){
					uni.showToast({title:'获取位置出错',icon:'none'})
				}
			});
		} 
	  },
      checkItem(orderFuncCode,carFuncCode){ //过滤出行管理功能和车务管理功能
      
		const _this = this;
		// console.log(orderFuncCode)
		if(orderFuncCode.length){
			console.log('bb')
			this.cxdatas.forEach(function(i,e){
				if(orderFuncCode.split(",").includes(i.textCode)){
					// console.log(_this.cxdatas[e])
					_this.cxdatas[e].show = true;
				}else{
					_this.cxdatas[e].show = false;
			    }
			    
			}) 
		}
		if(carFuncCode){
			this.cwdatas.forEach(function(i,e){
				if(carFuncCode.split(",").includes(i.textCode)){
					_this.cwdatas[e].show = true;
				}else{
					_this.cwdatas[e].show = false
			    }
			    
			}) 
		}
		
	  },
	  // 获取各个指标接口
	  getItemNum(){
		  const _this = this;
		  getAllCount({accountId:_this.userInfo.accountId}).then(res=>{
			  _this.cxdatas.forEach(function(i,e){				  				 
				if(i.textCode == 'A2'){//用车审核条数
				  _this.cxdatas[e].badge = res.data.approvalCount
				}else if(i.textCode == 'A3'){//调度指派条数
				  _this.cxdatas[e].badge = res.data.dispatchCount
				}else if(i.textCode == 'A4'){//调度审核条数
				  _this.cxdatas[e].badge = res.data.dispatchApprovalCount
				}else if(i.textCode == 'A5'){//费用审核条数
				  _this.cxdatas[e].badge = res.data.chargeCount
				}
			  })
		  })		
	  },
		//获取轮播图
		getBanner(){
			const _this = this;
			_this.banner = [];
			uni.request({
				url:'https://test.icarplus.net/httpApi/advertisementApiFacade/getSwiperPictureListForERescue',
				method:'POST',
				data: {"subId":"carLife"},
				header:{"Content-Type":"application/x-www-form-urlencoded"},
				success(res) {
					res.data.data.forEach(function(i,e){
						_this.banner.push(i);
					})
				
				}
			}) 		
		}
	}
}
</script>

<style lang="less">
	.user_header{
		padding:40upx 30upx;
		display: flex;
		align-items: center;
		.user_info{
			flex: 1;
			display: flex;
			align-items: center;
			.user_info-img{
				width: 120upx;
				height: 120upx;
				border-radius: 50%;
				border: 2px solid #fff;
				image{
					width: 100%;
					height: 100%;
				}
			}
			.user_info-inner{
				flex: 1;
				padding: 0 20upx;
				.user_info-name{
					font-size: 32upx;
					color: #333;
					font-weight: bold;
					word-break: break-all;
					display: -webkit-box;
					overflow: hidden;
					text-overflow: ellipsis;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 1;
					margin-bottom: 15upx;
				}
				.user_info-user-det{
					font-size: 24upx;
					color: #999999;
				}
			}
		}
		.user_act{
			padding: 0 10px;
			image{
				width: 70upx;
				height: 70upx;
			}
		}
	}
	.banner{
		padding: 20upx 30upx;
		.banner_swiper{
			height: 270upx;
			border-radius: 10upx;
		}
	}
	
	.user_nav{
		padding: 10upx 30upx;
		.user_nav-box{
			background-color: #fff;
			border-radius: 10upx;
			.user_nav-header{
				padding: 20upx 30upx;
				display: flex;
				justify-content: space-between;
				color: #333333;
				font-weight: bold;
				// border-bottom: 1px solid #EEEEEE;
				.user_nav-header-l{	
					font-size: 30upx;
				}
				.user_nav-header-r{
					font-size: 24upx;
				}
			}
			.nav_gird-item{
				display: flex;
				flex-direction: column;
				align-items: center;
			}
			.uni-badge-warning{
				background-color: #FFC53E;
			}
		}
	}
</style>
