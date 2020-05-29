<template>
	<view class="content">
		<view class="nav_gird">
			<uni-grid :column="3" :show-border="false" :square="false">
				<uni-grid-item v-for="(item, index) in cxdatas" :key="index" text="12">
					<view class="nav_gird-item" @click="toPath(item)">
						<image :src="item.image" class="image" mode="scaleToFill" />
						<text class="text">{{ item.text }}</text>
						<view v-if="item.badge" class="grid-dot">
							<uni-badge :text="item.badge" type="warning"/>
						</view>
					</view>						
				</uni-grid-item>
			</uni-grid>
		</view>
	</view>
</template>

<script>
	import uniGrid from "@/components/uni-grid/uni-grid.vue"
	import uniGridItem from "@/components/uni-grid-item/uni-grid-item.vue"
	import uniIcons from "@/components/uni-icons/uni-icons.vue"
	export default {
		components: {uniGrid,uniGridItem,uniIcons},
		data() {
			return {
				cxdatas:[{
						image: '/static/icon/icon_arm_ycyc.png',
						text: '异常用车',
						textCode:'12',
						path:'./carAlarmList',
						show:false,
						badge:''
					},{
						image: '/static/icon/icon_arm_yjgj.png',
						text: '越界告警',
						textCode:'6,11',
						path:'./carAlarmList',
						show:false,
						badge:''
					},{
						image: '/static/icon/icon_arm_dhtx.png',
						text: '点火提醒',
						textCode:'0',
						path:'./carAlarmList',
						show:false,
						badge:''
					},{
						image: '/static/icon/icon_arm_lxgj.png',
						text: '离线告警',
						textCode:'5',
						path:'./carAlarmList',
						show:false,
						badge:''
					},{
						image: '/static/icon/icon_arm_csgj.png',
						text: '超速告警',
						textCode:'',
						path:'./carAlarmList',
						show:false,
						badge:''
					},
					{
						image: '/static/icon/icon_arm_gzgj.png',
						text: '故障告警',
						textCode:'10',
						path:'./carAlarmList',
						show:false,
						badge:''
					},
					{
						image: '/static/icon/icon_arm_pzgj.png',
						text: '疑似碰撞',
						textCode:'3',
						path:'./carAlarmList',
						show:false,
						badge:''
					},
					{
						image: '/static/icon/icon_arm_dygj.png',
						text: '低压告警',
						textCode:'2',
						path:'./carAlarmList',
						show:false,
						badge:''
					},{
						image: '/static/icon/icon_arm_cjcc.png',
						text: '车机拆除',
						textCode:'7',
						path:'./carAlarmList',
						show:false,
						badge:''
					},{
						image: '/static/icon/icon_arm_tdgj.png',
						text: '拖吊告警',
						textCode:'4',
						path:'./carAlarmList',
						show:false,
						badge:''
					},{
						image: '/static/icon/icon_arm_bx.png',
						text: '保检/年检/保养',
						textCode:'csw',
						path:'./carAlarmList',
						show:false,
						badge:''
					}
				]
			};
		},
		methods:{
			toPath(item){
				let path = item.path,code = item.textCode;
				
				if(path != ''){
					uni.navigateTo({
						url:path+'?code='+code+'&text='+item.text
					})
				}else{
					uni.showToast({
						title: `敬请期待～`,
						icon: 'none'
					})
				}
			}
		}
	}
</script>

<style lang="less">
	page{
		background-color: #fff;
	}
	.content{
		background-color: #fff;
	}
	.nav_gird .image{
		width: 100upx;
		height: 100upx;
	}
	.nav_gird-item{
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.uni-badge-warning{
		background-color: #FFC53E;
	}
</style>
