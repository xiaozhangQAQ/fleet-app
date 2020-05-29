<template>
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
			申请维保项目
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
		
		<view class="cell_title">
			审核信息
		</view>
		<view class="form_listbox">
			<view class="form_list_item">
				<view class="form_list_item_content">
					<view class="form_list_item_content-title">
						审核结果
					</view>
					<view class="form_list_item_content-extra">
						<view class="form_list_item_content-extra-text">
							{{datas.auditStatus || '-'}}
						</view>
					</view>
				</view>
			</view>
			<view class="form_list_item">
				<view class="form_list_item_content">
					<view class="form_list_item_content-title">
						审核人
					</view>
					<view class="form_list_item_content-extra">
						<view class="form_list_item_content-extra-text">
							{{datas.auditor || '-'}}
						</view>
					</view>
				</view>
			</view>
			<view class="form_list_item">
				<view class="form_list_item_content">
					<view class="form_list_item_content-title">
						操作时间
					</view>
					<view class="form_list_item_content-extra">
						<view class="form_list_item_content-extra-text">
							{{datas.auditTime ||'-'}}
						</view>
					</view>
				</view>
			</view>
			<view class="form_list_item">
				<view class="form_list_item_content">
					<view class="form_list_item_content-title">
						审核意见
					</view>
					<view class="form_list_item_content-extra">
						<view class="form_list_item_content-extra-text">
							{{datas.auditOpinion ||'-'}}
						</view>
					</view>
				</view>
			</view>
		</view> 
		
		<view class="cell_title">
			实际维保信息
		</view>
		<view class="form_listbox">
			<view class="form_list_item">
				<view class="form_list_item_content">
					<view class="form_list_item_content-title">
						预估费用(元)
					</view>
					<view class="form_list_item_content-extra">
						<view class="form_list_item_content-extra-text">
							{{datas.repairCost || '-'}}
						</view>
					</view>
				</view>
			</view>
			<view class="form_list_item">
				<view class="form_list_item_content">
					<view class="form_list_item_content-title">
						维保厂家
					</view>
					<view class="form_list_item_content-extra">
						<view class="form_list_item_content-extra-text">
							{{datas.manufactor || '-'}}
						</view>
					</view>
				</view>
			</view>
		</view> 
	</view>
</template>

<script>
	import {waitHandleDetail} from '@/api/api.js'
	export default {
		data() {
			return {
				datas:[],
				id:''
			};
		},
		onLoad(opts){
			this.id = opts.id;
		},
		onShow(){
			this.initData();
		},
		methods:{
			initData(){
				waitHandleDetail({id:this.id}).then(res=>{
					this.datas = res.data
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
</style>
