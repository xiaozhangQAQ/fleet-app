/* 默认请求头 */
/* 
 application/x-www-form-urlencoded
 application/json
 */
import Vue from 'vue'
import store from '../store/index.js'

const request = async (url,method='GET',data={},config={})=>{
	let header = {"Content-Type":"application/x-www-form-urlencoded"};
	
	return new Promise((resolve, reject)=>{		
		uni.request({
			url: url, //接口地址。
			method:method,
			data: data,
			header:Object.assign(header,config),
			success(res) {
				if(res.data.returnCode=='10000'){
					if(res.data.data || res.data.data === null){
						resolve(res.data.data);
					}else if(res.data.pageInfo){
						resolve(res.data.pageInfo);
					}else{
						resolve(res.data.returnMsg);
					}
				}else{
					uni.showToast({
						title:res.data.returnMsg,
						icon:'none'
					})
					reject({
						errCode:1,
						msg:res.data.returnMsg || '接口出错'
					})
				}
			},
			fail(err) {
				uni.showToast({
					title:'访问出错',
					icon:'none'
				})
				reject(err)
			}
		})
	})
}

const requestToken = async (url,method='GET',data={},config={})=>{
	
	let token = uni.getStorageSync('loginToken');
	let header = {"Content-Type":"application/x-www-form-urlencoded"};//,'loginToken':token
	//验证loginToken 是否存在 存在则存入header 不存在则跳到登录界面
//     uni.getStorage({
// 		key:'loginToken',
// 		success:(res)=>{
//          header.loginToken = res.data;
// 		},
// 		fail:(err)=>{
// 			console.log(getCurrentPages()[0].route);
// 			if(getCurrentPages()[0].route == 'pages/log/login'){ //如果是首页的接口不验证token
// 				return;
// 			}else{//token不存在跳转到登录页面
// 	            uni.navigateTo({
// 	                url: '../pages/log/login' 
// 	            });
// 			}
// 		}
// 	});
	
// 	console.log(token)
// 	if(token){
// 		header.loginToken = token;
// 	}else{
// 		if(getCurrentPages()[0].route == 'pages/log/login'){ //如果是首页的接口不验证token
// 		console.log('aa')
// 			return;
// 		}else{//token不存在跳转到登录页面
//             uni.navigateTo({
//                 url: '../pages/log/login' 
//             });
// 		}
// 	}   
    data = Object.assign({'loginToken':token},data);
	return new Promise((resolve, reject)=>{		
		uni.request({
			url: url, //接口地址。
			method:method,
			data: data,
			header:Object.assign(header,config),
			success(res) {
				if(res.data.returnCode=='10000'){
					if(res.data.data || res.data.data === null){
						resolve(res.data);
					}else if(res.data.pageInfo){
						resolve(res.data.pageInfo);
					}else{
						resolve(res.data.returnMsg);
					}
				}else if(res.data.returnCode=='50000'){//判断token过期
				    uni.showModal({
				      title:'帐号过期',
				      content: '当前帐号已在新的设备上登录',
				      showCancel: false,
				      success: (res) => {
				    	store.commit('logout'); //清除掉token和用户信息
			            uni.navigateTo({
			                url: '../../pages/log/login' 
			            }) 
				      }
				    }) 
					
				}else{
					uni.showToast({
						title:res.data.returnMsg,
						icon:'none'
					})
					reject({
						errCode:1,
						msg:res.data.returnMsg || '接口出错'
					})
				}
				
			},
			fail(err) {
				uni.showToast({
					title:'访问出错',
					icon:'none'
				})
				reject(err)
			}
		})
	})
}

export default{
	get:(url,data,config)=>request(url,'GET',data,config),
	post:(url,data,config)=>request(url,'POST',data,config),
	postToken:(url,data,config)=>requestToken(url,'POST',data,config),
	getToken:(url,data,config)=>requestToken(url,'POST',data,config),
}