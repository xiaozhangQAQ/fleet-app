<template>
	<view class="content">
		<view style="margin-bottom: 220upx;">
			<view class="form_listbox">
				<view class="form_list_item" v-for="(item,index) in detdata.applyProject" :key="index">
					<view class="form_list_item_content">
						<view class="form_list_item_content-title">
							{{item.title}}
						</view>
						<view class="form_list_item_content-extra">
							<view class="form_list_item_content-extra-text">
								{{item.text || '-'}}
							</view>
						</view>
					</view>
				</view>
			</view>	
		</view>	
		<view class="form_putbtn">
			<button type="primary" @click="upto" hover-class="none">处理</button>
		</view>
	</view>
</template>

<script>
	import {getCarAlarmDetail} from '@/api/api.js'
	export default {
		data() {
			return {
				detdata:{},
				armId:'',
				remindType:'',
				licenseNo:'',
				ideal:'',
				title:''
			};
		},
		onLoad(opts){
			this.armId = opts.armId;	
		    this.licenseNo = opts.licenseNo;
			this.remindType = opts.remindType;
			this.title = opts.title;
			uni.setNavigationBarTitle({
			    title: this.title
			});
		},
		onShow(){
			this.initData();
		},
		methods:{
			
			upto(){//提交
				
			},
			initData(){
				getCarAlarmDetail({alarmId:this.armId,remindType:this.remindType,licenseNo:this.licenseNo}).then(res=>{
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
