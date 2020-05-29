<template>
	<view class="upload-box">
       <view class="uni-uploader">
           <view class="uni-uploader-head" v-if="tip">
               <view class="uni-uploader-title">{{tip}}</view>
               <view class="uni-uploader-info">{{imageList.length}}/{{maxCount}}</view>
           </view>
           <view class="uni-uploader-body">
               <view class="uni-uploader__files">
                   <block v-for="(image,index) in imageList" :key="index">
                       <view class="uni-uploader__file" style="position: relative;">
                           <image class="uni-uploader__img" :src="image.url" @tap="previewImage(index)"></image>
                           <view class="close-view" @click="deleteItem(index)">x</view>
                       </view>
                   </block>
					<block v-if="isInCount">
						 <block v-if="useSlots">
						   <view class="uni-uploader__autobox" @tap="chooseImg">
							 <slot name="addimg"/>
							 <view class="uni-uploader__input"></view>
						   </view>
						 </block>
						 <block v-else>	
						   <view class="uni-uploader__input-box" v-show="imageList.length < 8">
							<view class="uni-uploader__input" @tap="chooseImg"></view>
						   </view>
						 </block>
					</block>			  
               </view>
           </view>
       </view>
	</view>
</template>
<script>
	import {isImageFile} from '@/tool/util.js'
	export default{
		name:'upload',
		props:{
			maxCount:{ 
				type: Number,
				default(){
					return 10;
				}
			},
			tip:{  //图片提示文本
				type:String,
				default: ''
			},
			fileList:{
				type: Array,
				default(){
					return [];
				}
			},
			sourceType:{
				type: Array,
				default(){
					return ["camera", "album"];
				}
			}
		},
		data(){
			return{
				imageList:[],
				isInCount:true //是否在指定的count内
			}
		},
		computed:{ 
			useSlots(){
				let isaddimg = this.$slots.addimg?true:false;
				return isaddimg;
			}
		},
		mounted(){
			// console.log(this.fileList)
			// this.imageList = this.formatFileList();
			
			// this.imageList = fileList;
		},
		methods:{
			initFile(file){
				const _this = this;
				this.imageList = this.formatFileList(file);
			},
			deleteItem(index){
				const _this = this;
				const {imageList,maxCount} = _this;
			    imageList.splice(index,1);
				_this.isInCount=(imageList.length < maxCount);//判断是否超过限制文件数量
				_this.$emit('delete', { index,imageList});
			},
			previewImage(index) { //预览图片
			    let previewList = this.imageList.map((item,index,file)=>{					
					return item.url;
				})
			    uni.previewImage({
			        urls: previewList,
					current:previewList[index]
			    });
			},
			chooseImg() { //选择图片
			    uni.chooseImage({
			        sourceType: this.sourceType,
			        sizeType: ["compressed"],
			        count: this.maxCount - this.imageList.length,
			        success: (res) => {
						console.log(res)
						let _this = this;
						let count = this.maxCount - this.imageList.length;
						res = res.tempFiles.length> count?res.tempFiles.slice(0, count):res.tempFiles;
						this.$emit('before-read', {
							checkfile:res,
							imageList:_this.imageList,
							callback: result => {
								if (result) {							
									let chexklist = res.map((item,index,arr)=>{
										// let base64 = 'data:image/png;base64,'+uni.getFileSystemManager().readFileSync(item.path,'base64');
										return {url:item.path};
									})		
									_this.imageList = _this.imageList.concat(chexklist);
									_this.isInCount=(_this.imageList.length < _this.maxCount);//判断是否超过限制文件数量
									// 选择后回调
									_this.$emit('after-read', { imageList:_this.imageList });
								}
							}
						});					
			        }
			    })
			},
			formatFileList(file) { //传入文件检测
				const { maxCount } = this;
				const fileList = file;
				let newList = [];
				console.log(fileList)
				const lists = fileList.length>maxCount?fileList.slice(0,maxCount):fileList;			
				this.isInCount=(fileList.length < maxCount);//判断是否超过限制文件数量
				lists.forEach((item,index)=>{
					newList.push({url:item})
				})
				return newList;
			}
		}
	}
</script>

<style>
	
	page {
	    background-color: #EFEFF4;
	}
	.uni-uploader-head{
		padding: 20rpx 10upx;
	}
	.uni-uploader__file{
		margin: 10rpx;
		width: 160rpx;
		height: 160rpx;
	}
	.uni-uploader__autobox{
		position: relative;width: 158rpx;height: 158rpx;margin: 10rpx;
	}
	.uni-uploader__autobox .uni-uploader__img{
		width: 100%;height: 100%;
	}	
	
	.upload-box{
		background-color: #fff;
		padding: 20rpx;
	}
	.close-view{
	    text-align: center;
		line-height: 32rpx;
		height: 40rpx;
		width: 40rpx;
		border-radius: 50%;
		background: #FF5053;
		color: #FFFFFF;
		position: absolute;
		top: -12rpx;
		right: -8rpx;
		font-size: 30rpx;
	}
	.uni-uploader__img{
		width: 160rpx;
		height: 160rpx;
		border-radius: 4rpx;
	}
	.uni-uploader__input-box {
		margin: 10rpx;
		width: 158rpx;
		height: 158rpx;
	}
	.uni-uploader-title{
		font-size: 28upx;
		color: #616162;
	}
	.uni-uploader-info{
		font-size: 28upx;
	}
</style>
