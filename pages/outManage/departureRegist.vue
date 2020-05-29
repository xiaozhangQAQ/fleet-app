<template>
	<view class="content">
		<view class="form_listbox">
			<view class="form_list_item">
				<view class="form_list_item_content">
					<view class="form_list_item_content-title" v-if="opts.type == 'depart'">
						发车时间:
					</view>
					<view class="form_list_item_content-title" v-else>
						收车时间:
					</view>
					<view class="form_list_item_content-extra">
						<view class="form_list_item_content-extra-text">
						    {{operationTime}}
						</view>
					</view>
				</view>
			</view>
			<view class="form_list_item">
				<view class="form_list_item_content">
					<view class="form_list_item_content-title" v-if="opts.type == 'depart'">
						发车地点:
					</view>
					<view class="form_list_item_content-title" v-else>
						收车地点:
					</view>
					<view class="form_list_item_content-extra">
						<input type="text" v-model="address" class="form_list_item_content-extra-input" placeholder="发车地点" v-if="opts.type == 'depart'"/>
						<input type="text" v-model="address" class="form_list_item_content-extra-input" placeholder="收车地点" v-else/>
					</view>
				</view>
			</view>
			<view class="form_list_item">
				<view class="form_list_item_content">
					<view class="form_list_item_content-title" v-if="opts.type == 'depart'">
						发车里程(km):
					</view>
					<view class="form_list_item_content-title" v-else>
						收车里程(km):
					</view>
					<view class="form_list_item_content-extra">
						<view class="form_list_item_content-extra">
							<input type="text" v-model="mileage" class="form_list_item_content-extra-input" placeholder="发车里程" v-if="opts.type == 'depart'"/>
							<input type="text" v-model="mileage" class="form_list_item_content-extra-input" placeholder="收车里程" v-else/>
						</view>
					</view>
				</view>
			</view>
			<view class="form_list_upload">
				<upload tip="里程仪表盘照片" @delete="deletes" :sourceType="sourceType" @before-read="beforeRead" :maxCount="maxCount" @after-read="afterRead">
					<image src="../../static/icon/add_img.png" mode="" class="uni-uploader__img" slot="addimg"></image>
				</upload>
			</view>
		</view>
		<view class="form_putbtn">
			<button type="primary" @click.stop="sendCar" hover-class="none">开始执行</button>
		</view>
	</view>
</template>

<script>
	import uniIcons from "@/components/uni-icons/uni-icons.vue"
	import upload from '@/components/upload/upload.vue'
	import {formatDate} from '@/tool/util.js'
	import {userReceiveSendCar,receiveCar} from '@/api/api.js'
	import {
	    mapState 
	} from 'vuex'; 
	export default {
		components:{uniIcons,upload},
		computed: mapState(['userInfo','loginToken']),
		data() {
			return {
				dates:'',
				address:'',
				operationTime:'',
				mileage:'',
				opts:{},
				upLoadImg:[],//上传的图片列表
				sourceType:["camera"],
				maxCount:1//最大上传数
			};
		},
		onLoad(opts) {
			this.opts = opts;
			if(opts.type == 'depart'){
				uni.setNavigationBarTitle({
					title:'发车登记'
				})
			}else{
				uni.setNavigationBarTitle({
					title:'收车入库'
				})
			}
		},
		onShow(){
			this.operationTime = formatDate(new Date());
		},
		methods:{
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
				this.upLoadImg =file.imageList.map(function(x){
					let base64 = uni.getFileSystemManager().readFileSync(x.url,'base64');
					return base64;
				})
			},
			sendCar(){
				let objs = {};
				const _this = this;
				objs.accountId = this.userInfo.accountId;
				objs.fkOrderId = this.opts.id;
				// objs.loginToken = this.loginToken;
				objs.address = this.address;
				objs.operationTime = this.operationTime;
				objs.mileage = this.mileage;
				objs.weChatFlag = '1';
				objs.baseList = JSON.stringify(this.upLoadImg);
				console.log(objs)
				uni.showLoading({
				    title: '提交中',
					mask:true
				});
				if(this.opts.type == 'depart'){//发车登记
					userReceiveSendCar(objs).then(res=>{
						uni.showToast({
							title:'提交成功',
							success:function(){
								setTimeout(function () {
								    uni.navigateBack()
								}, 500);
							}
						})
					})
				}else if(this.opts.type == 'return'){ //收车入库
					receiveCar(objs).then(res=>{
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
	}
</script>

<style lang="less">
	.content{
		padding: 20upx;
	}
</style>
