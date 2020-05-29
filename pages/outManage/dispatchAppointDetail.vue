<template>
	<view class="content">
		<view style="margin-bottom: 220upx;">
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
							<view class="form_list_item_content-extra-text" v-else>
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
			<view class="form_listbox">
				<view class="form_list_item">
					<view class="form_list_item_content">
						<view class="form_list_item_content-title" style="font-size: 30upx;color: #333;font-weight: bold;">
							指派信息
						</view>
					</view>
				</view>
				<view class="form_list_item">
					<view class="form_list_item_content">
						<view class="form_list_item_content-title">
							指派车辆
						</view>
						<view class="form_list_item_content-extra" @click="checkCar(detdata.id)">
							<input type="text" v-model="carNum" placeholder="请选择车牌号" class="form_list_item_content-extra-input" disabled/>
							<uni-icons size="18" color="#BBBBBD" class="form_list_item_content-extra-icon" type="arrowright"></uni-icons>
						</view>
					</view>
				</view>
				<view class="form_list_item">
					<view class="form_list_item_content">
						<view class="form_list_item_content-title">
							选择驾驶员
						</view>
						<view class="form_list_item_content-extra">
							<picker mode="selector" :range="carDriverArr" range-key="driverName" @change="bindCarDriver" :disabled='ischeckcar'>
								<view class="form_list_item_content-picker">
									<input type="text" v-model="carDriver" placeholder="请选择车辆级别" class="form_list_item_content-extra-input" disabled/>
									<uni-icons size="18" color="#BBBBBD" class="form_list_item_content-extra-icon" type="arrowright"></uni-icons>
							    </view>
							</picker>
						</view>
					</view>
				</view>
			</view>	
			
			<view class="form_listbox" v-if="Object.keys(cardata).length>0">
				<view class="form_list_item">
					<view class="form_list_item_content">
						<view class="form_list_item_content-title" style="font-size: 30upx;color: #333;font-weight: bold;">
							车辆信息
						</view>
					</view>
				</view>
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
							车辆级别
						</view>
						<view class="form_list_item_content-extra">
							<view class="form_list_item_content-extra-text">
								{{cardata.carLevel || '-'}}
							</view>
						</view>
					</view>
				</view>
				<view class="form_list_item">
					<view class="form_list_item_content">
						<view class="form_list_item_content-title">
							车型
						</view>
						<view class="form_list_item_content-extra">
							<view class="form_list_item_content-extra-text">
								{{cardata.carName || '-'}}
							</view>
						</view>
					</view>
				</view>
				<view class="form_list_item">
					<view class="form_list_item_content">
						<view class="form_list_item_content-title">
							车座
						</view>
						<view class="form_list_item_content-extra">
							<view class="form_list_item_content-extra-text">
								{{cardata.seat || '-'}}
							</view>
						</view>
					</view>
				</view>
			</view>	
		</view>
		
		<view class="form_putbtn">
			<button type="primary" @click="upto" hover-class="none">提交</button>
			<button type="warn" @click="outto" hover-class="none" style="background-color: rgb(255,84,85);">无车驳回</button>
		</view>
	</view>
</template>

<script>
	import {dispatchDetail,approvaSsubmit,getCarDetail,getDriverList,dispatchSubmit,dispatchReject} from '@/api/api.js'
	export default {
		data() {
			return {
				detdata:{},
				cardata:{},
				accountId:'',
				orderId:'',
				carId:'',
				driverId:'',
				ideal:'',
				carNum:'',
				ischeckcar:true,
				carDriver:'',//车辆驾驶员
				carDriverArr:[{'driverName':'无'}],//车辆驾驶员组
			};
		},
		onLoad(opts){
			this.accountId = opts.accountId;
			this.orderId = opts.orderId;		
		},
		onShow(){
			this.initData(this.accountId,this.orderId);
		},
		methods:{
			checkCar:function(ids){//车牌号选择
			    const _this = this;
			    uni.navigateTo({
			    	url:'./carType?orderId='+ids+'&accountId='+this.accountId+'&type=order'
			    })
			
			},
			bindCarDriver:function(e){//车辆驾驶员
			    const _this = this;
			    this.carDriverArr.forEach(function(item,index){
					if(index == e.detail.value){
						_this.carDriver = item.driverName;					
						_this.driverId = item.id?item.id:'';
					}
				})
				
			},
			getPreData(data){ //从carType回传参数 车辆id
				// this.cardata = data;
				// this.cardata = data;
				// this.carNum = this.cardata.licenseNo;
				const _this = this;
				this.carId = data.id;
				getCarDetail({accountId:_this.accountId,orderId:_this.orderId,carId:data.id}).then(res=>{				
					_this.cardata = res.data;		
					_this.carNum = res.data.licenseNo;			
				})
				getDriverList({accountId:_this.accountId,orderId:_this.orderId,fkCarId:data.id}).then(res=>{
					_this.carDriverArr = _this.carDriverArr.concat(res.data);
					_this.ischeckcar = false;
				})
			},
			upto(){//提交
			    if(this.carNum == ''){
					uni.showToast({
						title:'请选择指派车辆',
						icon:"none"
					})
					return;
				}
				if(this.carDriver == ''){
					uni.showToast({
						title:'请选择车辆驾驶员',
						icon:"none"
					})
					return;
				}
				dispatchSubmit({accountId:this.accountId,fkOrderId:this.orderId,fkCarId:this.carId,fkDriverId:this.driverId}).then(res=>{
					uni.showToast({
						title:'提交成功',
						success:function(){
							uni.navigateBack()
						}
					})	
				})
			},
			outto(){ //无车驳回
				dispatchReject({accountId:this.accountId,fkOrderId:this.orderId}).then(res=>{
					uni.showToast({
						title:'驳回成功',
						success:function(){
							uni.navigateBack()
						}
					})			
				})
			},
			initData(){
				dispatchDetail({accountId:this.accountId,orderId:this.orderId}).then(res=>{
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
	display: flex;
	z-index: 10;
	button{
		flex: 1;
		margin-left: 20upx;
	}
}
</style>
