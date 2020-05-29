<template>
	<view class="content">
		<view class="nav_tabbar">
			<view class="nav_tabbar_box">
				<view class="nav_tabbar-item" :class="actItem==0?'nav_tabbar-item-on':''" @click="changeItem(0)">
					任务信息
				</view>
				<view class="nav_tabbar-item" :class="actItem==1?'nav_tabbar-item-on':''" @click="changeItem(1)">
					过程信息
				</view>
				<view class="nav_tabbar-item" :class="actItem==2?'nav_tabbar-item-on':''" @click="changeItem(2)">
					费用信息
				</view>
			</view>		
		</view>
		<view class="content_box">
			<!-- 基本信息 -->
			<view class="" v-if="actItem==0">
				<view class="cell_title">
					用车信息
				</view>
				<view class="form_listbox">
					<view class="form_list_item">
						<view class="form_list_item_content">
							<view class="form_list_item_content-title">
								所属企业/组织
							</view>
							<view class="form_list_item_content-extra">
								<view class="form_list_item_content-extra-text">
									{{basedata.enterpriseOrgName||'--'}}
								</view>
							</view>
						</view>
					</view>
					<view class="form_list_item">
						<view class="form_list_item_content">
							<view class="form_list_item_content-title">
								用车部门/分支机构
							</view>
							<view class="form_list_item_content-extra">
								<view class="form_list_item_content-extra-text">
									{{basedata.orgName||'--'}}
								</view>
							</view>
						</view>
					</view>
					<view class="form_list_item">
						<view class="form_list_item_content">
							<view class="form_list_item_content-title">
								用车申请人
							</view>
							<view class="form_list_item_content-extra">
								<view class="form_list_item_content-extra-text">
									{{basedata.creater||'--'}}
								</view>
							</view>
						</view>
					</view>
					<view class="form_list_item">
						<view class="form_list_item_content">
							<view class="form_list_item_content-title">
								用车联系人
							</view>
							<view class="form_list_item_content-extra">
								<view class="form_list_item_content-extra-text">
									{{basedata.contactPerson||'--'}}
								</view>
							</view>
						</view>
					</view>
					<view class="form_list_item">
						<view class="form_list_item_content">
							<view class="form_list_item_content-title">
								联系人电话
							</view>
							<view class="form_list_item_content-extra">
								<view class="form_list_item_content-extra-text">
									{{basedata.contactPhone||'--'}}
								</view>
							</view>
						</view>
					</view>
					<view class="form_list_item">
						<view class="form_list_item_content">
							<view class="form_list_item_content-title">
								乘车人数
							</view>
							<view class="form_list_item_content-extra">
								<view class="form_list_item_content-extra-text">
									{{basedata.personCount||'--'}}
								</view>
							</view>
						</view>
					</view>
					<view class="form_list_item">
						<view class="form_list_item_content">
							<view class="form_list_item_content-title">
								是否自驾
							</view>
							<view class="form_list_item_content-extra">
								<view class="form_list_item_content-extra-text" v-if="basedata.selfDriverFlag=='0'">
									非自驾
								</view>
								<view class="form_list_item_content-extra-text" v-else-if="basedata.selfDriverFlag=='1'">
									自驾
								</view>
								<view class="form_list_item_content-extra-text" v-else>
									--
								</view>
							</view>
						</view>
					</view>
					<view class="form_list_item">
						<view class="form_list_item_content">
							<view class="form_list_item_content-title">
								车辆级别
							</view>
							<view class="form_list_item_content-extra">
								<view class="form_list_item_content-extra-text">
									{{basedata.applyCarTypeName||'--'}}
								</view>
							</view>
						</view>
					</view>
					<view class="form_list_item">
						<view class="form_list_item_content">
							<view class="form_list_item_content-title">
								预计用车时间
							</view>
							<view class="form_list_item_content-extra">
								<view class="form_list_item_content-extra-text">
									{{basedata.startTime||'--'}}
								</view>
							</view>
						</view>
					</view>
					<view class="form_list_item">
						<view class="form_list_item_content">
							<view class="form_list_item_content-title">
								预计还车时间
							</view>
							<view class="form_list_item_content-extra">
								<view class="form_list_item_content-extra-text">
									{{basedata.endTime||'--'}}
								</view>
							</view>
						</view>
					</view>
					<view class="form_list_item">
						<view class="form_list_item_content">
							<view class="form_list_item_content-title">
								实际用车时间
							</view>
							<view class="form_list_item_content-extra">
								<view class="form_list_item_content-extra-text">
									{{basedata.goTime||'--'}}
								</view>
							</view>
						</view>
					</view>
					<view class="form_list_item">
						<view class="form_list_item_content">
							<view class="form_list_item_content-title">
								实际还车时间
							</view>
							<view class="form_list_item_content-extra">
								<view class="form_list_item_content-extra-text">
									{{basedata.overTime||'--'}}
								</view>
							</view>
						</view>
					</view>
					<view class="form_list_item">
						<view class="form_list_item_content">
							<view class="form_list_item_content-title">
								出发地
							</view>
							<view class="form_list_item_content-extra">
								<view class="form_list_item_content-extra-text">
									{{basedata.departure||'--'}}
								</view>
							</view>
						</view>
					</view>
					<view class="form_list_item">
						<view class="form_list_item_content">
							<view class="form_list_item_content-title">
								目的地
							</view>
							<view class="form_list_item_content-extra">
								<view class="form_list_item_content-extra-text">
									{{basedata.destination||'--'}}
								</view>
							</view>
						</view>
					</view>
					<view class="form_list_item">
						<view class="form_list_item_content">
							<view class="form_list_item_content-title">
								用车事由
							</view>
							<view class="form_list_item_content-extra">
								<view class="form_list_item_content-extra-text">
									{{basedata.reason||'--'}}
								</view>
							</view>
						</view>
					</view>
					<view class="form_list_item">
						<view class="form_list_item_content">
							<view class="form_list_item_content-title">
								备注
							</view>
							<view class="form_list_item_content-extra">
								<view class="form_list_item_content-extra-text">
									{{basedata.remark||'--'}}
								</view>
							</view>
						</view>
					</view>
				</view> 
				
				<!-- <view class="cell_title" v-if="basedata.attachIdUrl">
					附件
				</view>		 -->
				<view class="form_listbox" v-if="basedata.attachIdUrl.length>0">
					<view class="form_list_item" style="padding: 20upx 30upx;">
						附件
				    </view>		
					<view class="form_list_item" v-for="(item,index) in basedata.attachIdUrl" :key="index">
						<view class="form_list_item_content">
							<view class="form_list_item_content-title" style="flex: 1;padding-right: 0;">
								{{item.match(/attachId\/(\S*)/)[1]}}
							</view>
							<view class="form_list_item_content-extra" style="flex: initial;padding-left: 20upx;">
								<view class="form_list_item_content-extra-text" @click="lookImg(index)">
									查看
								</view>
							</view>
						</view>
					</view>
				</view>	
				
				<view class="cell_title">
					指派信息
				</view>		
				<view class="form_listbox">
					<view class="form_list_item">
						<view class="form_list_item_content">
							<view class="form_list_item_content-title">
								车型
							</view>
							<view class="form_list_item_content-extra">
								<view class="form_list_item_content-extra-text">
									{{basedata.carName||'--'}}
								</view>
							</view>
						</view>
					</view>
					<view class="form_list_item">
						<view class="form_list_item_content">
							<view class="form_list_item_content-title">
								车牌号
							</view>
							<view class="form_list_item_content-extra">
								<view class="form_list_item_content-extra-text">
									{{basedata.licenseNo||'--'}}
								</view>
							</view>
						</view>
					</view>
					<view class="form_list_item">
						<view class="form_list_item_content">
							<view class="form_list_item_content-title">
								司机
							</view>
							<view class="form_list_item_content-extra">
								<view class="form_list_item_content-extra-text">
									{{basedata.driverName||'--'}}
								</view>
							</view>
						</view>
					</view>
				</view>	
			</view>
			<!-- 过程信息 -->
			<view class="" v-if="actItem==1">
				<view class="" style="padding-right: 20%;">
					<uni-steps :options="processdata" direction="column" :active="0" :hascontent="true">
					</uni-steps>
				</view>
			</view>
			<!-- 费用信息 -->
			<view class="" v-if="actItem==2" style="margin-top: 20upx;">
				<view class="form_listbox">
					<view class="form_listbox">
						<view class="form_list_item">
							<view class="form_list_item_content">
								<view class="form_list_item_content-title">
									所属企业/组织
								</view>
								<view class="form_list_item_content-extra">
									<view class="form_list_item_content-extra-text">
										{{costdata.orgEnterpriseName||'-'}}
									</view>
								</view>
							</view>
							<view class="form_list_item_content">
								<view class="form_list_item_content-title">
									用车部门/分支机构
								</view>
								<view class="form_list_item_content-extra">
									<view class="form_list_item_content-extra-text">
										{{costdata.orgName || '-'}}
									</view>
								</view>
							</view>
							<view class="form_list_item_content">
								<view class="form_list_item_content-title">
									停车费（元）
								</view>
								<view class="form_list_item_content-extra">
									<view class="form_list_item_content-extra-text">
										{{costdata.parkingCharge || '-'}}
									</view>
								</view>
							</view>
							<view class="form_list_item_content">
								<view class="form_list_item_content-title">
									公务卡油电费（元）
								</view>
								<view class="form_list_item_content-extra">
									<view class="form_list_item_content-extra-text">
										{{costdata.cardOilElectricCharge || '-'}}
									</view>
								</view>
							</view>
							<view class="form_list_item_content">
								<view class="form_list_item_content-title">
									卡号
								</view>
								<view class="form_list_item_content-extra">
									<view class="form_list_item_content-extra-text">
										{{costdata.cardNumber || '-'}}
									</view>
								</view>
							</view>
							<view class="form_list_item_content">
								<view class="form_list_item_content-title">
									非公务卡油电费（元）
								</view>
								<view class="form_list_item_content-extra">
									<view class="form_list_item_content-extra-text">
										{{costdata.claimingCharge || '-'}}
									</view>
								</view>
							</view>
							<view class="form_list_item_content">
								<view class="form_list_item_content-title">
									加油/充电地点
								</view>
								<view class="form_list_item_content-extra">
									<view class="form_list_item_content-extra-text">
										{{costdata.refuelAddress || '-'}}
									</view>
								</view>
							</view>
							<view class="form_list_item_content">
								<view class="form_list_item_content-title">
									其他费用（元）
								</view>
								<view class="form_list_item_content-extra">
									<view class="form_list_item_content-extra-text">
										{{costdata.otherCharge || '-'}}
									</view>
								</view>
							</view>
							<view class="form_list_item_content">
								<view class="form_list_item_content-title">
									费用合计（元）
								</view>
								<view class="form_list_item_content-extra">
									<view class="form_list_item_content-extra-text">
										{{costdata.totalCharge || '-'}}
									</view>
								</view>
							</view>
						</view>
					</view>  	
			    </view>  			
			</view>
		</view>
	</view>
</template>

<script>
	import {orderDetail,approvalDetail,dispatchDetail} from '@/api/api.js'
	import uniSteps from '@/components/uni-steps/uni-steps.vue' //跟官网不同有改动
	import {
	    mapState 
	} from 'vuex'; 
	export default {
		computed: mapState(['userInfo']),
		components: {uniSteps},
		data() {
			return {
				actItem:0, //0为用车信息，1为过程信息，2为费用信息
				basedata:{},//任务信息
				processdata:[],//过程信息
				costdata:{}//费用信息
			}
		},
		onLoad(opts){
			console.log(opts)
			this.initData(opts.id,opts.path);
		},
		methods: {
			initData(id,path){
				// let requests,datas={};
				// if(path == 'order'){ //用车申请详情接口
				// 	requests = orderDetail;
				// 	datas = {id:id};
				// }else if(path == 'approval'){
				// 	requests = approvalDetail;
				// 	datas = {accountId:this.userInfo.accountId,orderId:id}
				// }else if(path == 'dispatch'){
				// 	requests = dispatchDetail;
				// 	datas = {accountId:this.userInfo.accountId,orderId:id}
				// }
				// console.log(requests,datas)
				// requests(datas).then(res=>{
				// 	this.basedata = res.data.order;
				// 	this.processdata = res.data.orderProcessLt;
				// })
				console.log(id)
				orderDetail({id}).then(res=>{
					this.basedata = res.data.order;
					this.processdata = res.data.orderProcessLt;
					this.costdata = res.data.orderCharge;
				})
				
				
			},
			changeItem(index){
				if(index == this.actItem){
					return false;
				}else{
					this.actItem = index;
				}
			},
			lookImg(index){//查看图片
			    let previewList = this.basedata.attachIdUrl;
				uni.previewImage({
				    urls: previewList,
					current:previewList[index],
					indicator:'default'
				});
			}
		}
	}
</script>

<style lang="less">
	page{
		height: 100%;
		width: 100%;
	}
.content{
	padding: 0 20upx;
	height: 100%;
	display: flex;
	flex-direction: column;
}
.cell_title{
	font-size: 30upx;
	color: #222;
	padding: 20upx 0;
	font-weight: 500;
}
.form_listbox{
	margin-bottom: 20upx;
}
.form_listbox .form_list_item::after{
	height: 0;
}
.nav_tabbar{	
	padding: 40upx 0;
	width: 100%;
	.nav_tabbar_box{
		display: flex;
		height: 66upx;
		background-color: #fff;
		border-radius: 60upx;
		.nav_tabbar-item{
			flex: 1;
			font-size: 28upx;
			color: #5C75FF;
			height: 100%;
			line-height: 66upx;
			text-align: center;
			width: 100%;
			background-color: #fff;
			border-radius: 60upx;
			&.nav_tabbar-item-on{
				background-color: #5C75FF;
				color: #fff;
			}
		}
	}	
}
// .form_table{
// 	background-color: #fff;
// 	border-radius: 20upx;
// 	margin-bottom: 20upx;
// 	.form_table_head{
// 		display: flex;
// 		height: 80upx;
// 		align-items: center;
// 		justify-content: center;
// 		overflow: hidden;
// 		border-bottom: 1px solid #EEEEEE;
// 		.form_table_head-item{
// 			flex: 1;
// 			text-align: center;
// 			padding: 0 10upx;
// 			font-size: 26upx;
// 			color: #616162;
// 		}
// 	}
// 	.form_table_body{
// 		.form_table_body-item{
// 			display: flex;
// 			height: 80upx;
// 			align-items: center;
// 			justify-content: center;
// 			overflow: hidden;
// 			.form_table_body-item-inner{
// 				flex: 1;
// 				text-align: center;
// 				padding: 0 10upx;
// 				font-size: 22upx;
// 				color: #616162;
// 			}
// 		}
// 	}
// }
.content_box{
	flex: 1;
	overflow-y: auto;
	margin-bottom: 20upx;
}
</style>
