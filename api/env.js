let apiUrl = '/fleet';//接口前缀

if(process.env.NODE_ENV === 'development'){
	//#ifdef H5
	apiUrl = '/api'+apiUrl;//代理前缀标识
	//#endif
	//#ifndef H5
	apiUrl = 'https://test.icarplus.net'+apiUrl;//除h5端外 接口地址  http://192.168.2.108:8898/
	//#endif
}else{
   //#ifndef H5
   // apiUrl = 'https://fleet.icarplus.net'+apiUrl;
   apiUrl = 'https://test.icarplus.net'+apiUrl;
   //#endif
}
export default{
	baseUrl:apiUrl,
	
}