import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		/**
		 * 是否需要强制登录
		 */
		// forcedLogin: false,
		// hasLogin: false,
		loginToken:'',
		userInfo: {
			name:'',
			img:''
		}
	},
	mutations: {
		login(state, userInfo) {
			console.log(userInfo)
			state.userInfo = userInfo.userInfo;
			// state.hasLogin = true;
			state.loginToken = userInfo.loginToken;
			uni.setStorage({//将用户信息保存在本地  
				key: 'userInfo',  
				data: userInfo.userInfo
			}) 
			uni.setStorage({//将token保存在本地
			 	key: 'loginToken',  
			 	data: userInfo.loginToken 
			}) 
		},
		logout(state) {
			state.userInfo = {
				name:'',
				img:''
			};
			// state.hasLogin = false;
			state.loginToken = '';
			uni.removeStorage({  
				key: 'userInfo'  
			})
			uni.removeStorage({  
				key: 'loginToken'  
			})  
		}
	}
})

export default store
