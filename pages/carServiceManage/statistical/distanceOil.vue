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
		<view class="statistical_box">
			<view class="statistical_box-content">
				<view class="statistical_item">
					车辆数 <text>{{datas.count}}</text>
				</view>
				<view class="statistical_item">
					总里程(km) <text>{{datas.mileage}}</text>
				</view>
				<view class="statistical_item">
					总油耗(L) <text>{{datas.fuelCon}}</text>
				</view>
			</view>
		</view>
		<view class="statistical_content">
			<view class="form_listbox">
				<view class="form_list_item" v-for="(item,index) in datas.listData" :key="index">
					<view class="form_list_item-title">
						{{item.orgFullName}}
					</view>
					<view class="form_list_item-det">
						<view class="form_list_item-det-item">
							总油耗(L) {{item.carCount}}
						</view>
						<view class="form_list_item-det-item">
							车辆数 {{item.carCount}}
						</view>
						<view class="form_list_item-det-item">
							总里程(km) {{item.carCount}}
						</view>
					</view>
				</view>
		    </view> 		
		</view>
	</view>
</template>

<script>
	import uniIcons from "@/components/uni-icons/uni-icons.vue"
	import {getMileageOilStatistics} from '@/api/api.js'
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
				getMileageOilStatistics({accountId:this.userInfo.accountId,date:this.usedate,fkOrgId:this.departs.id || ''}).then(res=>{
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
.form_list_item-title{
	font-size: 30upx;
	color: #222;
	padding: 20upx 0;
}
.form_list_item-det{
	display: flex;
	padding: 20px 0;
	.form_list_item-det-item{
		flex: 1;
		text-align: center;
		font-size: 26upx;
		color: #888888;
	}
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
	padding-top: 20upx;
	border: 1px solid #EEEEEE;
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
</style>
