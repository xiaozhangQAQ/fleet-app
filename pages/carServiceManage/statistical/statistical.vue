<template>
	<view class="content">
		<scroll-view class="nav_tabbar_x" scroll-x>
			<view class="nav-item" :class="act==0?'n_active':''" @click="changeItem(0)">出行费用</view>
			<view class="nav-item" :class="act==1?'n_active':''" @click="changeItem(1)">报销费用</view>
			<view class="nav-item" :class="act==2?'n_active':''" @click="changeItem(2)">车辆成本</view>
			<view class="nav-item" :class="act==3?'n_active':''" @click="changeItem(3)">里程油耗</view>
			<view class="nav-item" :class="act==4?'n_active':''" @click="changeItem(4)">告警统计</view>
		</scroll-view>
		<view class="content_box">
			<out-cost v-if="act==0" ref = 'child'></out-cost>
			<reimburse-cost v-if="act==1" ref = 'child'>bb</reimburse-cost>
			<car-cost v-if="act==2" ref = 'child'>cc</car-cost>
			<distance-oil v-if="act==3" ref = 'child'>dd</distance-oil>
			<car-alarm v-if="act==4" ref = 'child'>ee</car-alarm>
		</view>
	</view>
</template>

<script>
	// import uniIcons from "@/components/uni-icons/uni-icons.vue"
	import outCost from "./outCost.vue"
	import reimburseCost from "./reimburseCost.vue"
	import carCost from "./carCost.vue"
	import distanceOil from './distanceOil.vue'
	import carAlarm from './carAlarm.vue'
	export default {
		components:{outCost,reimburseCost,carCost,distanceOil,carAlarm},
		data() {
			return {
				act:0
				// departindex:0,
				// departarray:[{'name':'开发部'},{'name':'开发部1'},{'name':'开发部2'}],
				// usedate:'年/月'
			};
		},
		methods:{
			changeItem(index){
				if(index == this.act){
					return false;
				}else{
					this.act = index;
				}
			},
			getPreData(data){ //从carType回传参数 车辆id
				this.$refs.child.getDepartBystatic(data);//触发子组件方法 传组织信息过去
			}
			// bindDepartChange(e){
			// 	this.departindex = e.detail.value;
			// },
			// bindDateChange: function(e) {
			// 	this.usedate = e.target.value
			// }			
		}
	}
</script>

<style lang="less">
page{
	height: 100%;
}
.content{
	display: flex;
	flex-direction: column;
	height: 100%;
}
.content_box{
	flex: 1;
	overflow: hidden;
}

</style>
