<template>
	<view class="content">
		<m-tabs @change="tabChange" :tabs="tabsList" :showIndex="0">
		</m-tabs>
		<view class="cont">
			<view class="cont_item" v-show="contIndex==0">
				<map  
				v-if="nowCarShow"
				class="maps"
				:markers="markers"
				:latitude="nowCar.latitude" 
				:longitude="nowCar.longitude" 
				:scale="15"
				></map>
				<view class="car_data">
					<view class="">当前状态：{{nowCar.runStatus}}</view>
					<view class="">车速：{{nowCar.speed}}公里/小时</view>
				</view>
			</view>
			<view class="cont_item" v-show="contIndex==1">
				<map  class="maps"
				v-if="trailShow"
				:latitude="polyline[0].points[0].latitude" 
				:longitude="polyline[0].points[0].longitude" 
				:scale="13"
				:polyline="polyline"
				></map>
				<view class="times">
					<view class="date">
						<timePicker
						    showType="date"
						    beginDate="2020-01-01"
						    :endDate="endDate"
						    @btnConfirm="btnConfirm1">
						    <input type="text" v-model="date" placeholder="选择日期" disabled/>
						</timePicker>
					</view>
					<view class="time">
						<timePicker
						    showType="hourToMinute"
						    beginTime="00:00:00"
						    endTime="23:59:59"
						    @btnConfirm="btnConfirm2">
							<input type="text" v-model="startTime" placeholder="选择开始时间" disabled/>
						</timePicker>
						<text>—</text>
						<timePicker
						    showType="hourToMinute"
						    beginTime="00:00:00"
						    endTime="23:59:59"
						    @btnConfirm="btnConfirm3">
							<input type="text" v-model="endTime" placeholder="选择结束时间" disabled/>
						</timePicker>
					</view>
					<button type="primary" class="btn_check" @click="viewTrail">查看轨迹</button>
				</view>
			</view>
			<view class="cont_item" v-show="contIndex==2">
				<view class="car_archives">
					<view class="car_num">
						车牌号：{{carArchives.licenseNo || '无'}}
					</view>
					<view class="">
						<text>车牌颜色</text>
						<text>{{carArchives.licenseColor || '无'}}</text>
					</view>
					<view class="">
						<text>品牌</text>
						<text>{{carArchives.brandName || '无'}}</text>
					</view>
					<view class="">
						<text>车辆级别</text>
						<text>{{carArchives.carLevel || '无'}}</text>
					</view>
					<view class="">
						<text>车型</text>
						<text>{{carArchives.carName || '无'}}</text>
					</view>
					<view class="">
						<text>车辆颜色</text>
						<text>{{carArchives.color || '无'}}</text>
					</view>
					<view class="">
						<text>座位数</text>
						<text>{{carArchives.Stringseat || '无'}}</text>
					</view>
					<view class="">
						<text>动力类型</text>
						<text>{{carArchives.energyTypes || '无'}}</text>
					</view>
					<view class="">
						<text>排气量</text>
						<text>{{carArchives.emissions || '无'}}</text>
					</view>
					<view class="">
						<text>是否在编</text>
						<text>{{carArchives.organization || '无'}}</text>
					</view>
					<view class="">
						<text>所属单位</text>
						<text>{{carArchives.orgName || '无'}}</text>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 时间 -->
		

	</view>
</template>

<script>
import mTabs from '@/components/tabs/m-tabs.vue';
import timeSelector from '@/components/wing-time-selector/wing-time-selector.vue';
import {DbToGc} from '@/tool/tools.js'
import {getCarTrackByLicenseNo,getCarHistoryByParam,getCarByLicenseNo} from '@/api/api.js'
export default {
	components:{
		mTabs,
		timePicker:timeSelector
	},
	data(){
		return{
			licenseNo:'',
			nowCarShow:false,
			trailShow:false,
			nowCar:{//车辆跟踪
				speed:'',
				runStatus:'',
				latitude:'',
				longitude:''
			},
			markers:[
			// 	{
			// 	id:'1',
			// 	latitude:'20.04422',
			// 	longitude:'110.19989',
			// 	iconPath:`../../static/icon/icon_outLine.png`,
			// 	width:20,
			// 	heigth:50
			// },
			],
			tabsList:[
				{
					id:'1',
					label:'车辆追踪'
				},
				{
					id:'2',
					label:'历史轨迹'
				},
				{
					id:'3',
					label:'车辆档案'
				},
			],
			contIndex:0,
			
			polyline:[{
				'points':[
					{latitude: 20.02971, longitude: 110.32941},
				],
				color:'#5C75FF',
				width:8,
				arrowLine:true
			}] ,
			endDate:'2020-03-05',
			date:'',
			startTime:'',
			endTime:'',
			carArchives:{
				
			}
		}
	},
	created(){
		console.log('ff')
		let date = new Date();
		let [y,m,d] = [date.getFullYear(),(date.getMonth()+1),date.getDate()]
		this.endDate = `${y}-${m>=10?m:('0'+m)}-${d>=10?d:('0'+d)}`;
		console.log(this.endDate)
	},
	onLoad(options){
		this.licenseNo = decodeURIComponent(options.licenseNo);
		console.log(options)
		this.getDataTab0();
		this.getDataTab2();
		
	},
	methods:{
		/* tab切换 */
		tabChange(index,obj){
			console.log(index,obj);
			this.contIndex = index;

		},
		/* 日期选择 */
		btnConfirm1(date){
			console.log(date)
			this.date = date.key;
		},
		btnConfirm2(date){
			console.log(date)
			this.startTime = date.key;
		},
		btnConfirm3(date){
			console.log(date)
			this.endTime = date.key;
		},
		
		getDataTab0(){
			getCarTrackByLicenseNo({licenseNo:this.licenseNo}).then(res=>{
				console.log(res)
				let data = res.data;
				let arr = DbToGc(data.lon,data.lat);
				 this.nowCar.latitude = arr[1];
				this.nowCar.longitude = arr[0];
				if(data.runStatus == '0'){
					this.nowCar.runStatus = '静止';
				}else if(data.runStatus == '1'){
					this.nowCar.runStatus = '行驶';
				}else{
					this.nowCar.runStatus = '离线';
				}
				this.nowCar.speed = data.speed;
				this.markers[0] = {
					id:data.licenseNo,
					latitude:data.lat,
					longitude:data.lon,
					iconPath:`../../static/icon/icon_onLine.png`,
					width:20,
					heigth:50
				},
				this.nowCarShow =true;
			})
		},
		/* 查看轨迹 */
		viewTrail(){
			console.log(this.date,this.startTime,this.endTime);
			let start = `${this.date} ${this.startTime}`;
			let end = `${this.date} ${this.endTime}`;
			getCarHistoryByParam({licenseNo:this.licenseNo,startTime:start,endTime:end}).then(res=>{
				if(res.returnCode == '10000'){
					let data = res.data;
					if(!data){
						uni.showToast({
							title:res.returnMsg
						})
						return
					}
					let newArr = [];
					this.trailShow = false;
					for(let i=0;i<data.length;i++){
						let arr = DbToGc(data[i].lon,data[i].lat);
						newArr.push({
							latitude:arr[1],
							longitude:arr[0]
						})
					}
					this.polyline[0].points = newArr;
					this.trailShow = true;
				}
			})
		},
		getDataTab2(){
			getCarByLicenseNo({licenseNo:this.licenseNo}).then(res=>{
				console.log(res)
				if(res.returnCode == '10000'){
					this.carArchives = res.data;
				}
			})
		}
	},
	computed:{
		
	}
	
}
</script>

<style lang="less">
@import  '../../style/min/minx.less';
.content{
	position: relative;
	.size(100vw,100vh);
}
.maps{
	.size(100vw,100vh);
}
.cont{
	.cont_item{
		overflow: auto;
	} 
}
/* 追踪 */
.car_data{
	.fixed-lb(0,20rpx);
	.size(700rpx,auto);
	right: 0;
	margin: auto;
	background-color: #fff;
	padding: 20rpx;
	.radius(8rpx);
	view{
		padding: 13rpx 0;
		.font(30rpx);
	}
	.btn{
		background: #5C75FF;
		color: #fff;
	}
}
/* 历史轨迹 */
.times{
	.fixed(0,120rpx,100);
	right: 0;
	margin: auto;
	padding:25rpx 15rpx;
	background-color: #fff;
	.radius(10rpx);
	.size(500rpx,auto);
	view{
		.size(100%,70rpx);
		.flex();
	}
	input{
		height: 70rpx;
		text-align: center;
		.font(30rpx,#333,70rpx);
	}
}
/* 车辆档案 */
.car_archives{
	.size(690rpx,auto);
	background-color: #fff;
	margin:20rpx auto;
	padding: 10rpx 30rpx;
	.radius(10rpx);
	.car_num{
		.font(32rpx,#333,40rpx);
		border-bottom: 1px solid #efefef;
		font-weight: bold;
	}
	view{
		.size(100%,80rpx);
		.flex(space-between);
		text{
			&:first-of-type{
				.font(30rpx,#999);
			}
			&:last-of-type{
				.font(30rpx);
			}
		}
	}
}

</style>
