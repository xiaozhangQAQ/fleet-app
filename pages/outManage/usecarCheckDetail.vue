<template>
	<view class="content">
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
							{{detdata.enterpriseOrgName || '-'}}
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
							{{detdata.orgName || '-'}}
						</view>
					</view>
				</view>
			</view>
			<view class="form_list_item">
				<view class="form_list_item_content">
					<view class="form_list_item_content-title">
						用车人
					</view>
					<view class="form_list_item_content-extra">
						<view class="form_list_item_content-extra-text">
							{{detdata.contactPerson || '-'}}
						</view>
					</view>
				</view>
			</view>
			<view class="form_list_item">
				<view class="form_list_item_content">
					<view class="form_list_item_content-title">
						联系方式
					</view>
					<view class="form_list_item_content-extra">
						<view class="form_list_item_content-extra-text">
							{{detdata.contactPhone || '-'}}
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
							{{detdata.personCount || '-'}}
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
						<view class="form_list_item_content-extra-text" v-if="detdata.selfDriverFlag == '0'">
							非自驾
						</view>
						<view class="form_list_item_content-extra-text" v-if="detdata.selfDriverFlag == '1'">
							自驾
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
							{{detdata.applyCarType || '-'}}
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
							{{detdata.startTime || '-'}}
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
							{{detdata.endTime || '-'}}
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
							{{detdata.departure || '-'}}
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
							{{detdata.destination || '-'}}
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
							{{detdata.reason || '-'}}
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
							{{detdata.remark || '-'}}
						</view>
					</view>
				</view>
			</view>
			<view class="form_list_item">
				<view class="form_list_item_content">
					<view class="form_list_item_content-title">
						附件
					</view>
					<view class="form_list_item_content-extra">
						<view class="form_list_item_content-extra-text">
							{{detdata.reason || '-'}}
						</view>
					</view>
				</view>
			</view>
	    </view> 		
		<view class="form_listbox" style="margin-bottom: 220upx;">
			<view class="form_list_item">
				<view class="form_list_item_content">
					<view class="form_list_item_content-title" style="font-size: 32upx;color: #333;font-weight: bold;">
						审核结果
					</view>
					<view class="form_list_item_content-extra">
						<picker mode="selector" :range="shArr" @change="bindSH">
							<view class="form_list_item_content-picker">
								<input type="text" v-model="sh" placeholder="请选择是否通过审核" class="form_list_item_content-extra-input" disabled/>
								<uni-icons size="18" color="#BBBBBD" class="form_list_item_content-extra-icon" type="arrowright"></uni-icons>
						    </view>
						</picker>
					</view>
				</view>
			</view>
			<view class="form_list_item-fj">
				<view class="form_list_item-fj-title" style="font-size: 32upx;color: #333;font-weight: bold;">
					审核意见
				</view>
				<view class="form_list_item-fj-img" style="height: 200upx;">
					<textarea placeholder="请输入审核意见..." style="font-size: 28upx;height: 100%;" v-model="ideal"/>
				</view>
			</view>
		</view>	
		
		<view class="form_putbtn">
			<button type="primary" @click="upto" hover-class="none">提交</button>
		</view>
	</view>
</template>

<script>
	import {approvalDetail,approvaSsubmit} from '@/api/api.js'
	export default {
		data() {
			return {
				sh:'',//是否通过
				shArr:['通过','不通过'],//是否通过选择组
				detdata:{},
				accountId:'',
				fkOrderId:'',
				ideal:''
			};
		},
		onLoad(opts){
			this.accountId = opts.accountId;
			this.fkOrderId = opts.orderId;		
		},
		onShow(){
			this.initData(this.accountId,this.fkOrderId);
		},
		methods:{
			bindSH:function(e){//车辆级别
			    const _this = this;
			    this.shArr.forEach(function(item,index){
					if(index == e.detail.value){
						_this.sh = item;
					}
				})
			
			},
			upto(){//提交
			    if(this.sh == ''){
					uni.showToast({
						title:'请选择是否通过'
					})
					return;
				}
				let shIndex = this.sh == '通过'?'1':'0';
				approvaSsubmit({accountId:this.accountId,fkOrderId:this.fkOrderId,approvalType:'1',approvalResult:shIndex,approvalOpinion:this.ideal}).then(res=>{
					uni.navigateBack()
				})
			},
			initData(accountId,fkOrderId){
				approvalDetail({accountId:accountId,orderId:fkOrderId}).then(res=>{
					this.detdata = res.data;
				})
			}
		}
	}
</script>

<style lang="less">
.content{
	padding: 20upx;
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

.form_putbtn{
	position: fixed;
	bottom: 0;
	width: 100%;
	padding: 60rpx 20upx;
	background-color: #fff;
	left: 0;
	z-index: 10;
}
</style>
