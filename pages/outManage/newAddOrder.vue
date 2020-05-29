<template>
	<view class="content">
		<view style="margin-bottom: 220upx;">
			<view class="form_listbox" style="margin-bottom: 20upx;">
				<view class="form_list_item">
					<view class="form_list_item_content">
						<view class="form_list_item_content-title">
							所属企业 / 部门<text style="color: red;">*</text>
						</view>
						<view class="form_list_item_content-extra">
							<view class="form_list_item_content-extra-text">
								{{name}}
							</view>
							<!-- <input type="text" value="" class="form_list_item_content-extra-input"/>
							<uni-icons size="20" class="form_list_item_content-extra-icon" type="arrowright"></uni-icons> -->
						</view>
					</view>
				</view>
				<!-- <view class="form_list_item">
					<view class="form_list_item_content">
						<view class="form_list_item_content-title">
							用车部门 / 分支机构
						</view>
						<view class="form_list_item_content-extra">
							<uni-icons size="18" color="#BBBBBD" class="form_list_item_content-extra-icon" type="arrowright"></uni-icons>
						</view>
					</view>
				</view> -->
				<view class="form_list_item">
					<view class="form_list_item_content">
						<view class="form_list_item_content-title">
							用车联系人<text style="color: red;">*</text>
						</view>
						<view class="form_list_item_content-extra">
							<input type="text" v-model="userCarName" class="form_list_item_content-extra-input" placeholder="请输入用车联系人"/>
						</view>
					</view>
				</view>
				<view class="form_list_item">
					<view class="form_list_item_content">
						<view class="form_list_item_content-title">
							联系方式<text style="color: red;">*</text>
						</view>
						<view class="form_list_item_content-extra">
							<input type="number" v-model="userPhone" placeholder="请输入联系方式" class="form_list_item_content-extra-input"/>
						</view>
					</view>
				</view>
				<view class="form_list_item">
					<view class="form_list_item_content">
						<view class="form_list_item_content-title">
							乘车人数<text style="color: red;">*</text>
						</view>
						<view class="form_list_item_content-extra">
							<input type="number" v-model="userNum" placeholder="请输入乘车人数" class="form_list_item_content-extra-input"/>
						</view>
					</view>
				</view>
				<view class="form_list_item">
					<view class="form_list_item_content">
						<view class="form_list_item_content-title">
							是否自驾<text style="color: red;">*</text>
						</view>
						<view class="form_list_item_content-extra">
							<radio-group @change="isZJ">
								<label class="radio" style="margin-right: 30rpx;">
									<radio value="1" :checked="iszj==='1'" class="form_radio"/>自驾
								</label>
								<label class="radio">
									<radio value="0" :checked="iszj==='0'" class="form_radio"/>非自驾
								</label>
							</radio-group>
							
						</view>
					</view>
				</view>
				<view class="form_list_item">
					<view class="form_list_item_content">
						<view class="form_list_item_content-title">
							申请车辆级别
						</view>
						<view class="form_list_item_content-extra">
							<picker mode="selector" :range="carLevelArr" @change="bindCarLevel">
								<view class="form_list_item_content-picker">
									<input type="text" v-model="carLevel" placeholder="请选择车辆级别" class="form_list_item_content-extra-input" disabled/>
									<uni-icons size="18" color="#BBBBBD" class="form_list_item_content-extra-icon" type="arrowright"></uni-icons>
							    </view>
							</picker>
						</view>
					</view>
				</view>
				<view class="form_list_item">
					<view class="form_list_item_content">
						<view class="form_list_item_content-title">
							预计用车时间<text style="color: red;">*</text>
						</view>
						<view class="form_list_item_content-extra">
							<input type="text" v-model="usedate" placeholder="年/月/日" class="form_list_item_content-extra-input" disabled @click="showDate('start')"/>
							<uni-icons size="18" color="#BBBBBD" class="form_list_item_content-extra-icon" type="arrowright"></uni-icons>
						</view>
					</view>
				</view>
				<view class="form_list_item">
					<view class="form_list_item_content">
						<view class="form_list_item_content-title">
							预计还车时间<text style="color: red;">*</text>
						</view>
						<view class="form_list_item_content-extra">	
							<!-- <view class="form_list_item_content-extra-text">{{returndate}}</view> -->
							<input type="text" v-model="returndate" placeholder="年/月/日" class="form_list_item_content-extra-input" disabled @click="showDate('end')"/>
							<uni-icons size="18" color="#BBBBBD" class="form_list_item_content-extra-icon" type="arrowright"></uni-icons>						
						</view>
					</view>
				</view>
				<view class="form_list_item">
					<view class="form_list_item_content">
						<view class="form_list_item_content-title">
							出发地<text style="color: red;">*</text>
						</view>
						<view class="form_list_item_content-extra">
							<!-- <picker mode="region" :value="startaddr" @change="bindRegionChange">
								<view class="form_list_item_content-picker">
									<view class="form_list_item_content-extra-text">{{startaddr}}</view>
									<uni-icons size="18" color="#BBBBBD" class="form_list_item_content-extra-icon" type="arrowright"></uni-icons>
								</view>		
							</picker> -->
							<view class="form_list_item_content-picker">
								<input type="text" v-model="startaddr" placeholder="请输入或选择出发地点" class="form_list_item_content-extra-input"/>
								<!-- <uni-icons size="18" color="#BBBBBD" class="form_list_item_content-extra-icon" type="arrowright"></uni-icons> -->
								<button type="primary" class="form_list_item_content-extra-btn" @click="chooseStartaddr">选择</button>
							</view>					
						</view>
					</view>
				</view>
				<view class="form_list_item">
					<view class="form_list_item_content">
						<view class="form_list_item_content-title">
							目的地<text style="color: red;">*</text>
						</view>
						<view class="form_list_item_content-extra">
							<!-- <picker mode="region" :value="endaddr" @change="bindRegionChange1">
								<view class="form_list_item_content-picker">
									<view class="form_list_item_content-extra-text">{{endaddr}}</view>
									<uni-icons size="18" color="#BBBBBD" class="form_list_item_content-extra-icon" type="arrowright"></uni-icons>
								</view>		
							</picker> -->
							<view class="form_list_item_content-picker">
								<input type="text" v-model="endaddr" placeholder="请输入或选择目的地点" class="form_list_item_content-extra-input"/>
								<button type="primary" class="form_list_item_content-extra-btn" @click="chooseEndaddr">选择</button>
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
							<input type="text" v-model="carReason" class="form_list_item_content-extra-input" placeholder="请填写用车事由"/>
						</view>
					</view>
				</view>
				<view class="form_list_item">
					<view class="form_list_item_content">
						<view class="form_list_item_content-title">
							备注
						</view>
						<view class="form_list_item_content-extra">
							<input type="text" v-model="carTip" placeholder="备注" class="form_list_item_content-extra-input"/>
						</view>
					</view>
				</view>
				<view class="form_list_upload">
					<upload tip="附件" @delete="deletes" :fileList = 'imgInit' @before-read="beforeRead" :maxCount="maxCount" @after-read="afterRead">
						<image src="../../static/icon/add_img.png" mode="" class="uni-uploader__img" slot="addimg"></image>
					</upload>
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
						<view class="form_list_item_content-extra" @click="checkCar">
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
								{{cardata.enterpriseOrgName || '-'}}
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
								{{cardata.orgName || '-'}}
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
			<button type="primary" @click="save" hover-class="none">提交</button>
		</view>
		
		<tui-datetime ref="dateTime" type="1" :startYear="new Date().getFullYear()" :endYear="new Date().getFullYear()+1"
		:setDateTime="setDateTime" @confirm="bindDateChange"></tui-datetime>
	</view>
</template>

<script>
	import uniIcons from "@/components/uni-icons/uni-icons.vue"
	import upload from '@/components/upload/upload.vue'
	import tuiDatetime from "@/components/dateTime/dateTime"
	import {dispatchNewSubmit,dispatchNewDriverList,dispatchNewCarDetail} from '@/api/api.js'
	import {txmap2bdmap} from '@/tool/util.js'
	import {
	    mapState 
	} from 'vuex'; 
	export default {
		components:{uniIcons,upload,tuiDatetime},
		computed: mapState(['userInfo']),
		data() {
			return {
				name:'', //所属企业 / 组织
				userCarName:'',//用车联系人
				userPhone:'',//联系方式
				userNum:'',//乘车人数
				iszj:'0',//是否自驾 0为非自驾 1为自驾
				carLevel:'',//车辆级别
				carLevelArr:['新能源车','轿车','商务车','越野车','中巴车'],//车辆级别组
				usedate:'',	//预计使用时间
				returndate:'',//预计归还时间
				setDateTime:'',//设置时间
				dateTimeType:'0',//设置时间 0为使用时间 1为归还时间
				startaddr:'',//出发地
				departureLng:'',//出发地经度
				departureLat:'',//出发地纬度
				endaddr:'',//目的地
				destinationLng:'',//目的地经度
				destinationLat:'',//目的地经度
				carReason:'',//用车是由
				carTip:'',//备注
				imgInit:[//上传的图片列表
				],
				upLoadImg:[],
				maxCount:1,//最大上传数
				carNum:'',//车牌号
				carDriver:'',//车辆驾驶员
				carDriverArr:[{'driverName':'无'}],//车辆驾驶员组
				ischeckcar:true,//是否以选择车牌号
				cardata:{}//车辆信息
			};
		},
		onLoad(){
			this.name=this.userInfo.orgFullName ||'';
			// this.startaddr = this.startaddr.length <= 0?'请选择出发地':this.startaddr;
			// this.endaddr = this.endaddr.length <= 0?'请选择目的地':this.endaddr;
		},
		onShow(){
			// this.upLoadImg =this.imgInit.map(function(x){
			// 	return x.url;
			// })
		},
		methods:{
			isZJ:function(e){//是否自驾
				this.iszj = e.detail.value;
			},
			bindCarLevel:function(e){//车辆级别
			    const _this = this;
			    this.carLevelArr.forEach(function(item,index){
					if(index == e.detail.value){
						_this.carLevel = item;
					}
				})
				
				// console.log(e.detail.value)
			},
			showDate(type){
				if(type == 'start'){
					this.setDateTime = this.usedate;
					this.dateTimeType = '0';
				}else{
					this.setDateTime = this.returndate;
					this.dateTimeType = '1';
				}
				this.$refs.dateTime.show()
			},
			bindDateChange: function(e) { 
			    if(this.dateTimeType == '0'){//预计用车时间
					this.usedate = e.result
				}else if(this.dateTimeType == '1'){//预计还车时间
					this.returndate = e.result
				}
				
			},
			chooseStartaddr:function(e){ //地图选择出发地
				uni.chooseLocation({
					success:(res)=>{
						console.log(res)
						let bdmap = txmap2bdmap(res.latitude,res.longitude);//微信坐标转百度坐标
						this.startaddr = res.name;
						this.departureLng = bdmap.longitude;
						this.departureLat = bdmap.latitude;
					}
				})
			},
			chooseEndaddr:function(e){ //地图选择目的地
				uni.chooseLocation({
					success:(res)=>{
						console.log(res)
						let bdmap = txmap2bdmap(res.latitude,res.longitude);//微信坐标转百度坐标
						this.endaddr = res.name;
						this.destinationLng = bdmap.longitude;
						this.destinationLat = bdmap.latitude;
					}
				})
			},
			checkCar:function(){//车牌号选择
			    const _this = this;
				if(_this.usedate == ''){
					uni.showToast({
						title:"请选择开始时间",
						icon:'none'
					})
					return;
				}
				if(_this.returndate == ''){
					uni.showToast({
						title:"请选择结束时间",
						icon:'none'
					})
					return;
				}
			    uni.navigateTo({
			    	url:'./carType?startTime='+this.usedate+'&endTime='+this.returndate+'&accountId='+this.userInfo.accountId+'&type=newOrder'
			    })
			
			},
			getPreData(data){ //从carType回传参数 车辆id
				const _this = this;
				this.carId = data.id;
				dispatchNewCarDetail({accountId:_this.userInfo.accountId,startTime:_this.usedate,endTime:_this.returndate,carId:data.id}).then(res=>{				
					_this.cardata = res.data;		
					_this.carNum = res.data.licenseNo;			
				})
				dispatchNewDriverList({accountId:_this.userInfo.accountId,startTime:_this.usedate,endTime:_this.returndate,fkCarId:data.id}).then(res=>{
					_this.carDriverArr = _this.carDriverArr.concat(res.data);
					_this.ischeckcar = false;
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
			deletes(data){ //删除回调
				this.upLoadImg =data.imageList.map(function(x){
					let base64 = uni.getFileSystemManager().readFileSync(x.url,'base64');
					return base64;
				})
			},
			beforeRead(data){ //读取文件前回调
				//最后必须调用callback()返回true or false;
				let {checkfile,callback} = data; 
				console.log(data)
				callback(true); 
			},
			afterRead(file){ //读取文件后回调
				// this.imgInit = file.imageList;
				this.upLoadImg =file.imageList.map(function(x){
					let base64 = uni.getFileSystemManager().readFileSync(x.url,'base64');
					return base64;
				})
			},
			save(){//保存
			    if(this.name==''){
					uni.showToast({
						title:'请输入所属企业 / 部门',
						icon:'none'
					})
					return;
				}
				if(this.userCarName==''){
					uni.showToast({
						title:'请输入用车联系人',
						icon:'none'
					})
					return;
				}
				if(this.userPhone==''){
					uni.showToast({
						title:'请输入联系方式',
						icon:'none'
					})
					return;
				}
				if(this.userNum==''){
					uni.showToast({
						title:'请输入乘车人数',
						icon:'none'
					})
					return;
				}
				// if(this.carLevel==''){
				// 	uni.showToast({
				// 		title:'请选择车辆级别'
				// 	})
				// 	return;
				// }
				if(this.usedate==''){
					uni.showToast({
						title:'请选择用车开始时间',
						icon:'none'
					})
					return;
				}
				if(this.returndate==''){
					uni.showToast({
						title:'请选择预计还车时间',
						icon:'none'
					})
					return;
				}
				if(new Date(this.usedate)>new Date(this.returndate)){
					uni.showToast({
						title:'预计还车时间不能小于用车开始时间',
						icon:'none'
					})
					return;
				}
				if(this.startaddr==''){
					uni.showToast({
						title:'请输入出发地',
						icon:'none'
					})
					return;
				}
				if(this.endaddr==''){
					uni.showToast({
						title:'请输入目的地',
						icon:'none'
					})
					return;
				}
				if(this.carNum==''){
					uni.showToast({
						title:'请选择车牌号',
						icon:'none'
					})
					return;
				}
				let objs = {};
				objs.accountId = this.userInfo.accountId;
				objs.fkOrgId = this.userInfo.orgId;
				objs.applyAccountName = this.userInfo.accountName;
				objs.contactPerson = this.userCarName;
				objs.contactPhone = this.userPhone;
				objs.personCount = this.userNum;
				objs.selfDriverFlag = this.iszj;
				objs.applyCarType = this.carLevel;
				objs.startTime = this.usedate;
				objs.endTime = this.returndate;
				objs.departure = this.startaddr;
				objs.departureLng = this.departureLng;
				objs.departureLat = this.departureLat;
				objs.destination = this.endaddr;
				objs.destinationLng = this.destinationLng;
				objs.destinationLat = this.destinationLat;
				objs.reason = this.carReason;
				objs.remark = this.carTip;
				objs.weChatFlag = '1';
				objs.baseList = JSON.stringify(this.upLoadImg);
				objs.fkCarId = this.cardata.carId;
				objs.fkDriverId = this.driverId;
				
				uni.showLoading({
				    title: '上传中',
					mask:true
				});
				dispatchNewSubmit(objs).then(res=>{
					uni.showToast({
						title:'提交成功',
						success:function(){
							setTimeout(function () {
							    uni.navigateBack()
							}, 500);
						}
					})
				})
			}
		}
	}
</script>

<style lang="less">
	.content{
		padding: 20upx;
	}
	.form_listbox{
		margin-bottom: 20upx;
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
