<template>
	<view class="content">
		<view class="form_listbox">
			<view class="form_list_item">
				<view class="form_list_item_content">
					<view class="form_list_item_content-title">
						停车费(元)
					</view>
					<view class="form_list_item_content-extra">
						<input type="number" v-model="parkingCharge" class="form_list_item_content-extra-input" placeholder="请输入停车费"/>
					</view>
				</view>
			</view>
			<view class="form_list_item">
				<view class="form_list_item_content">
					<view class="form_list_item_content-title">
						路桥费(元)
					</view>
					<view class="form_list_item_content-extra">
						<input type="number" v-model="hghwayBridgeCharge" class="form_list_item_content-extra-input" placeholder="请输入路桥费"/>
					</view>
				</view>
			</view>
			<view class="form_list_item">
				<view class="form_list_item_content">
					<view class="form_list_item_content-title">
						油电卡费(元)
					</view>
					<view class="form_list_item_content-extra">
						<input type="number" v-model="cardOilElectricCharge" class="form_list_item_content-extra-input" placeholder="请输入油电卡费" :disabled="hasCardOil"/>
					</view>
				</view>
			</view>
			<view class="form_list_item">
				<view class="form_list_item_content">
					<view class="form_list_item_content-title">
						卡号
					</view>
					<view class="form_list_item_content-extra">
						<input type="text" v-model="cardNumber" class="form_list_item_content-extra-input" placeholder="卡号" disabled/>
					</view>
				</view>
			</view>
			<view class="form_list_item">
				<view class="form_list_item_content">
					<view class="form_list_item_content-title">
						非油电卡费(元)
					</view>
					<view class="form_list_item_content-extra">
						<input type="number" v-model="cashOilElectricCharge" class="form_list_item_content-extra-input" placeholder="请输入非油电卡费"/>
					</view>
				</view>
			</view>
			<view class="form_list_item">
				<view class="form_list_item_content">
					<view class="form_list_item_content-title">
						加油充电地点
					</view>
					<view class="form_list_item_content-extra">
						<input type="text" v-model="refuelAddress" class="form_list_item_content-extra-input" placeholder="请输入加油充电地点"/>
					</view>
				</view>
			</view>
			<view class="form_list_item">
				<view class="form_list_item_content">
					<view class="form_list_item_content-title">
						其他费用(元)
					</view>
					<view class="form_list_item_content-extra">
						<input type="number" v-model="otherCharge" class="form_list_item_content-extra-input" placeholder="请输入其他费用"/>
					</view>
				</view>
			</view>
			<view class="form_list_item">
				<view class="form_list_item_content">
					<view class="form_list_item_content-title">
						报销费用合计(元)
					</view>
					<view class="form_list_item_content-extra">
						<view class="form_list_item_content-extra-text">{{claimingCharge}}</view>
					</view>
				</view>
			</view>
			<view class="form_list_item">
				<view class="form_list_item_content">
					<view class="form_list_item_content-title">
						总费用合计(元)
					</view>
					<view class="form_list_item_content-extra">
						<view class="form_list_item_content-extra">
							<view class="form_list_item_content-extra-text">{{totalCharge}}</view>
						</view>
					</view>
				</view>
			</view>
			<view class="form_list_item">
				<view class="form_list_item_content">
					<view class="form_list_item_content-title">
						备注说明
					</view>
					<view class="form_list_item_content-extra">
						<input type="text" v-model="remark" class="form_list_item_content-extra-input" placeholder="请输入备注说明"/>
					</view>
				</view>
			</view>
		</view>
		<view class="form_putbtn">
			<button type="primary" @click.stop="sendCars" hover-class="none">提交</button>
		</view>
	</view>
</template>

<script>
	import uniIcons from "@/components/uni-icons/uni-icons.vue"
	import {saveCharge,getCardForCar,chargeDetail} from '@/api/api.js'
	import {str2float} from '@/tool/util.js'
	import {
	    mapState 
	} from 'vuex'; 
	export default {
		computed:{
			...mapState(['userInfo','loginToken']),
			claimingCharge(){ //停车费+路桥费+非油电卡费用+其他费用
				let total=0;
				total = str2float(this.parkingCharge)+ str2float(this.hghwayBridgeCharge)+str2float(this.cashOilElectricCharge)+str2float(this.otherCharge);
				return total;
			},
			totalCharge(){//停车费+路桥费+油电卡费用+非油电卡费用+其他费用
				let total=0;
				total = str2float(this.parkingCharge)+ str2float(this.hghwayBridgeCharge)+str2float(this.cashOilElectricCharge)+str2float(this.otherCharge)+str2float(this.cardOilElectricCharge);
				return total;
			}
		},
		data() {
			return {
				hasCardOil:true,
				parkingCharge:'',
				hghwayBridgeCharge:'',
				cardOilElectricCharge:'',
				cardNumber:'',
				cashOilElectricCharge:'',
				refuelAddress:'',
				otherCharge:'',
				// claimingCharge:'',
				// totalCharge:'',
				remark:'',
				opts:{}
			};
		},
		onLoad(opts) {
			this.opts = opts;
		},
		onShow(){
			if(this.opts.type == 'depart'){
				 this.initdata();
			}else{
				this.cardNumber = '无卡号'
			}    
		},
		methods:{
			initdata(){
				if(this.opts.type == 'depart'){
					getCardForCar({licenseNo:this.opts.licenseNo}).then(res=>{
					    if(res.data){
					    	this.cardNumber = res.data.carNoList[0];
					        this.hasCardOil = false;		
					    }else{
					    	this.cardNumber = res;
					    	this.hasCardOil = true;
					    }		
					})
					
					chargeDetail({fkOrderId:this.opts.id}).then(res=>{
						if(res.data){
							this.parkingCharge = res.data.parkingCharge == null?'':res.data.parkingCharge;
							this.hghwayBridgeCharge = res.data.hghwayBridgeCharge == null?'':res.data.hghwayBridgeCharge;
							this.cardOilElectricCharge = res.data.cardOilElectricCharge == null?'':res.data.cardOilElectricCharge;
							this.cashOilElectricCharge = res.data.cashOilElectricCharge == null?'':res.data.cashOilElectricCharge;
							this.refuelAddress = res.data.refuelAddress == null?'':res.data.refuelAddress;
							this.otherCharge = res.data.otherCharge == null?'':res.data.otherCharge;
							this.remark = res.data.remark == null?'':res.data.remark;
							this.fyid = res.data.id;
						}
					})
				}
				
			},
			sendCars(){
				let objs = {};
				const _this = this;
				objs.accountId = this.userInfo.accountId;
				objs.fkOrderId = this.opts.id;
                objs.parkingCharge =this.parkingCharge;
				objs.hghwayBridgeCharge =this.hghwayBridgeCharge;
				objs.cardOilElectricCharge =this.cardOilElectricCharge;
				objs.cardNumber =this.cardNumber;
				objs.cashOilElectricCharge =this.cashOilElectricCharge;
				objs.refuelAddress =this.refuelAddress;
				objs.otherCharge =this.otherCharge;
				objs.claimingCharge =this.claimingCharge;
				objs.totalCharge =this.totalCharge;
				objs.remark =this.remark;
				
				uni.showModal({
					title: '上传费用信息',
					content: '￥'+this.totalCharge,
					success: function (res) {
						if (res.confirm) {
							saveCharge(objs).then(res=>{
								uni.showToast({
									title:'上传成功',
									icon:'none',
									success() {
										setTimeout(function(){
											uni.navigateBack()
										},500)
									}
								})							
							})
						}
					}
				})
				
			}
		}
	}
</script>

<style lang="less">
	.content{
		padding: 20upx;
	}
</style>
