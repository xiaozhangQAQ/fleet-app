<template>
	<view class="childBox">
		<view class="condition_check">
			<view class="condition_check-item">
				<view class="condition_check-item-text" @click="bindDepartChange">
					<view>{{ departs.name || '请选择部门'}}</view>
					<uni-icons size="18" color="#BBBBBD" class="condition_check-item-icon" type="arrowdown"></uni-icons>
				</view>	
			</view>
			<view class="condition_check-item">
				<picker mode="date" value="YYYY-MM" @change="bindDateChange" fields='month'>
					<view class="condition_check-item-text">
						<view>{{usedate || '年/月'}}</view>
						<uni-icons size="18" color="#BBBBBD" class="condition_check-item-icon" type="arrowdown"></uni-icons>
					</view>		
				</picker>
			</view>
		</view>
		<view class="statistical_content">
			<view class="form_listbox" v-if="Object.keys(datas).length>0">
				<!-- <view class="form_list_item" v-for="(items,indexs) in item" :key="indexs"> -->
				<view class="form_list_item">
					<view class="form_list_item_content">
						<view class="form_list_item_content-title">
							<image src="../../../static/icon/icon_dis_ycyc.png" class="icon_img"></image> 异常用车
						</view>
						<view class="form_list_item_content-extra">
							<view class="form_list_item_content-extra-text">
								{{datas.privateUseAlarmCount}}
							</view>
						</view>
					</view>
					<view class="form_list_item_content">
						<view class="form_list_item_content-title">
							<image src="../../../static/icon/icon_dis_yjtx.png" class="icon_img"></image> 越界警告
						</view>
						<view class="form_list_item_content-extra">
							<view class="form_list_item_content-extra-text">
								{{datas.privateUseAlarmCount}}
							</view>
						</view>
					</view>
					<view class="form_list_item_content">
						<view class="form_list_item_content-title">
							<image src="../../../static/icon/icon_dis_dh.png" class="icon_img"></image> 点火提醒
						</view>
						<view class="form_list_item_content-extra">
							<view class="form_list_item_content-extra-text">
								{{datas.carAlarmCount}}
							</view>
						</view>
					</view>
					<view class="form_list_item_content">
						<view class="form_list_item_content-title">
							<image src="../../../static/icon/icon_dis_lx.png" class="icon_img"></image> 离线警告
						</view>
						<view class="form_list_item_content-extra">
							<view class="form_list_item_content-extra-text">
								{{datas.outlineAlarmCount}}
							</view>
						</view>
					</view>
					<view class="form_list_item_content">
						<view class="form_list_item_content-title">
							<image src="../../../static/icon/icon_dis_gz.png" class="icon_img"></image> 故障警告
						</view>
						<view class="form_list_item_content-extra">
							<view class="form_list_item_content-extra-text">
								{{datas.troubleAlarmCount}}
							</view>
						</view>
					</view>
					<view class="form_list_item_content">
						<view class="form_list_item_content-title">
							<image src="../../../static/icon/icon_dis_pz.png" class="icon_img"></image> 碰撞警告
						</view>
						<view class="form_list_item_content-extra">
							<view class="form_list_item_content-extra-text">
								{{datas.crashAlarmCount}}
							</view>
						</view>
					</view>
					<view class="form_list_item_content">
						<view class="form_list_item_content-title">
							<image src="../../../static/icon/icon_dis_xdc.png" class="icon_img"></image> 低电压提醒
						</view>
						<view class="form_list_item_content-extra">
							<view class="form_list_item_content-extra-text">
								{{datas.lowVoltageAlarmCount}}
							</view>
						</view>
					</view>
					<view class="form_list_item_content">
						<view class="form_list_item_content-title">
							<image src="../../../static/icon/icon_dis_td.png" class="icon_img"></image> 拖吊警告
						</view>
						<view class="form_list_item_content-extra">
							<view class="form_list_item_content-extra-text">
								{{datas.towAlarmCount}}
							</view>
						</view>
					</view>
					<view class="form_list_item_content">
						<view class="form_list_item_content-title">
							<image src="../../../static/icon/icon_dis_cjcc.png" class="icon_img"></image> 车机拆除告警
						</view>
						<view class="form_list_item_content-extra">
							<view class="form_list_item_content-extra-text">
								{{datas.dismantleAlarmCount}}
							</view>
						</view>
					</view>
					<view class="form_list_item_content">
						<view class="form_list_item_content-title">
							<image src="../../../static/icon/icon_dis_bx.png" class="icon_img"></image> 保检/年检/保养提醒
						</view>
						<view class="form_list_item_content-extra">
							<view class="form_list_item_content-extra-text">
								{{datas.insureAlarmCount}}
							</view>
						</view>
					</view>
				</view>
					
				<!-- </view> -->
		    </view> 		
		</view>
	</view>
</template>

<script>
	import uniIcons from "@/components/uni-icons/uni-icons.vue"
	import {carAlarmStatistics} from '@/api/api.js'
	import {
	    mapState 
	} from 'vuex'; 
	export default {
		computed: mapState(['userInfo']),
		components:{uniIcons},
		data() {
			return {
				// departindex:0,
				// departarray:[{'name':'开发部'},{'name':'开发部1'},{'name':'开发部2'}],
				departs:{},
				usedate:'',
				datas:[],
				fkOrgId:''
			};
		},
		mounted() {
			// this.inidata();
		},
		methods:{
			bindDepartChange(){
				// this.departindex = e.detail.value;
				uni.navigateTo({
					url:'../checkDepart'
				})
			},
			bindDateChange: function(e) {
				this.usedate = e.target.value;
				this.inidata();
			},
			getDepartBystatic(e){
				this.departs = e;
				if(this.usedate == ''){
					return;
				}
				this.inidata();
			},
			inidata(){
				carAlarmStatistics({accountId:this.userInfo.accountId,date:this.usedate,fkOrgId:this.departs.id || ''}).then(res=>{
					this.datas = res.data;
				})
			}
		}
	}
</script>

<style lang="less">
.childBox{
	display: flex;
	height: 100%;
	flex-direction: column;
}	
.form_listbox{
	margin-bottom: 20upx;
}
.form_listbox .form_list_item::after{
	height: 1px;
}
.form_listbox .form_list_item .form_list_item_content{
	border-bottom: 1px solid #eee;
}
.condition_check{
	display: flex;
	justify-content: space-between;
	background-color: #fff;
	height: 90upx;
	align-items: center;
	padding: 0 20upx;
	.condition_check-item{
		.condition_check-item-text{
			font-size: 26upx;
			color: #616162;
			display: flex;
			.condition_check-item-icon{
				margin-left: 20upx;
			}
		}
	}
}
.statistical_box{
	padding: 20upx;
	.statistical_box-content{
		background-color: #fff;
		padding: 20upx;
		display: flex;
		align-items: center;
		justify-content: center;
		.statistical_item{
			flex: 1;
			text-align: center;
			position: relative;
			padding: 20upx 0;
			font-size: 26upx;
			color: #222222;
			text{
				font-size: 32upx;
				margin-left: 20upx;
				display: block;
				text-align: center;
			}
		   &::after{
			  content: '';
			  position: absolute;
			  right: 0;
			  width: 1px;
			  height: 50%;
			  background-color: #eee;
			  top: 20%;
		   }	
		   &:last-child::after{
			   content: none;
		   }
		}
	}
}
.statistical_content{
	// padding: 0 20upx;
	flex: 1;
	overflow-y: auto;
}	
.icon_img{
	width: 50upx;
	height: 50upx;
	margin-right: 20upx;
	position: relative;
	top: 6rpx;
}
</style>
