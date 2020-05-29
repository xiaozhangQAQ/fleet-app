<template>
	<view style="margin-bottom: 220upx;">
		<view class="content">
			<view class="cell_title">
				申请信息
			</view>
			<view class="form_listbox">
				<view class="form_list_item">
					<view class="form_list_item_content">
						<view class="form_list_item_content-title">
							车牌号
						</view>
						<view class="form_list_item_content-extra">
							<view class="form_list_item_content-extra-text">
								{{datas.licenseNo || '-'}}
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
								{{datas.repairType || '-'}}
							</view>
						</view>
					</view>
				</view>
				<view class="form_list_item">
					<view class="form_list_item_content">
						<view class="form_list_item_content-title">
							上次保养里程
						</view>
						<view class="form_list_item_content-extra">
							<view class="form_list_item_content-extra-text">
								{{datas.lastTimeMileage}}
							</view>
						</view>
					</view>
				</view>
				<view class="form_list_item">
					<view class="form_list_item_content">
						<view class="form_list_item_content-title">
							本次保养里程
						</view>
						<view class="form_list_item_content-extra">
							<view class="form_list_item_content-extra-text">
								{{datas.mileage}}
							</view>
						</view>
					</view>
				</view>
				<view class="form_list_item">
					<view class="form_list_item_content">
						<view class="form_list_item_content-title">
							维保时间
						</view>
						<view class="form_list_item_content-extra">
							<view class="form_list_item_content-extra-text">
								{{datas.repairTime || '-'}}
							</view>
						</view>
					</view>
				</view>
				<view class="form_list_item">
					<view class="form_list_item_content">
						<view class="form_list_item_content-title">
							维保原因
						</view>
						<view class="form_list_item_content-extra">
							<view class="form_list_item_content-extra-text">
								{{datas.repairReason || '-'}}
							</view>
						</view>
					</view>
				</view>
			</view>
				
			<view class="cell_title">
				申请维保信息
			</view>
			<view class="form_listbox">
				<view class="form_list_item" v-for="(item,index) in datas.applyProject" :key="index">
					<view class="form_list_item_content">
						<view class="form_list_item_content-title">
							{{item.repairProject}}
						</view>
						<view class="form_list_item_content-extra">
							<view class="form_list_item_content-extra-text">
								{{item.cost}}
							</view>
						</view>
					</view>
				</view>
				<view class="form_list_item">
					<view class="form_list_item_content">
						<view class="form_list_item_content-title">
							预估费用(元)
						</view>
						<view class="form_list_item_content-extra">
							<view class="form_list_item_content-extra-text">
								{{datas.estimateCost}}
							</view>
						</view>
					</view>
				</view>
				<view class="form_list_item">
					<view class="form_list_item_content">
						<view class="form_list_item_content-title">
							申请人
						</view>
						<view class="form_list_item_content-extra">
							<view class="form_list_item_content-extra-text">
								{{datas.driverName || '-'}}
							</view>
						</view>
					</view>
				</view>
			</view> 	
			
			<view class="form_listbox">
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
		</view>
		<view class="form_putbtn">
			<button type="primary" @click="upto" hover-class="none">提交</button>
		</view>
	</view>
</template>

<script>
	import {waitHandleAuditDetail,waitHandleSubmit} from '@/api/api.js'
	export default {
		data() {
			return {
				sh:'',//是否通过
				shArr:['通过','不通过'],//是否通过选择组
				datas:{},
				accountId:'',
				wbId:'',
				ideal:''
			};
		},
		onLoad(opts){
			this.wbId = opts.id;
			this.accountId = opts.accountId;
		},
		onShow(){
			this.initData();
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
						title:'请选择是否通过',
						icon:'none'
					})
					return;
				}
				let shIndex = this.sh == '通过'?'1':'2';
				uni.showLoading({
				    title: '提交中',
					mask:true
				});
				waitHandleSubmit({id:this.wbId,accountId:this.accountId,auditStatus:shIndex,auditOpinion:this.ideal}).then(res=>{			
					uni.showToast({
						title:'提交成功',
						success:function(){
							setTimeout(function () {
							    uni.navigateBack()
							}, 500);
						}
					})
				})
			},
			initData(){
				waitHandleAuditDetail({id:this.wbId}).then(res=>{
					this.datas = res.data;
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
