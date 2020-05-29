
import {getOpenId} from '../api/api.js'
const wxLogin = async ()=>{
	return new Promise((resolve,reject)=>{
		uni.login({
			success: (e) => {
				if(e.errMsg == 'login:ok')
				getOpenId({code:e.code,type:'1'}).then(data=>resolve(data),err=>reject(err))
			}
		})
		
	})
}

/* 获取微信定位授权 */
const wxAuthorize = async (type='gcj02')=>{
	return new Promise((resolve,reject)=>{
		uni.getSetting({
			success:e=>{
				if(e.authSetting['scope.userLocation']){
					uni.getLocation({
						type:type,
						success:({latitude,longitude})=>resolve({latitude,longitude}),
						fail:()=>reject()
					})
				}else{
					uni.authorize({
						scope:'scope.userLocation',
						success:()=>{
							uni.getLocation({
								type:type,
								success:({latitude,longitude})=>resolve({latitude,longitude}),
								fail:()=>reject()
							})
						},
						fail:()=>{
							uni.showModal({
								content:'需要获取定位授权',
								success:btn=>btn.confirm?uni.openSetting():reject(),
								fail:()=>reject()
							})
						}
					})
				}
			}
		})
	})
}
/**
 * 获取微信定位信息
 * from<===>获取来源优先 ['storage':本地存储,'updata':重新获取定位]
 * 
 */
const getWxLocation = async (from='storage')=>{
	let wx_location = uni.getStorageSync('wx_location');
	if(wx_location && from=='storage'){
		return wx_location;
	}else{
		wx_location = await wxAuthorize();
		uni.setStorageSync('wx_location',wx_location);
		return wx_location;
	}
}

export default{
	wxLogin,
	getWxLocation
}