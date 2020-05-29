<template>
	<view class="tabs_box">
		<view class="tabs_fixed">
			<view class="tabs">
				<view class="item" v-for="(item,index) in tabs" :key="index" :class="{check:nowIndex==index}" @tap="tapHandle(index,item)">{{item.label}}</view>
			</view>
		</view>
	</view>
</template>

<script>
export default{
	props:['tabs','showIndex'],
	data(){
		return{
			nowIndex:this.showIndex,
			
		}
	},
	created() {
		console.log(this.tabs)
	},
	
	methods:{
		tapHandle(index,item){
			this.nowIndex = index;
			this.$emit('change',index,item,)
		}
	}
}
</script>

<style lang="less" scoped>
@import  '../../style/min/minx.less';

.tabs_box{
	.size(100%,100rpx);
	
	.tabs_fixed{
		background-color: #fff;
		.fixed(0,0,100);
		.flex();
		.size(100%,100rpx);
	}
	.tabs{
		// .size(90%,50rpx);
		.flex();
		.radius(25rpx);
		border: 1px solid #5C75FF;
		overflow: hidden;
		.item{
			.size(200rpx,50rpx);
			.font(30rpx,#5C75FF,50rpx);
			border-right: 1px solid #5C75FF;
			text-align: center;
			&:last-child{
				border-right: none;
			}
		}
		.check{
			color: #fff;
			background-color: #5C75FF;
		}
	}
}
</style>
