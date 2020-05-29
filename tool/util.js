function formatTime(time) { //时分秒
	if (typeof time !== 'number' || time < 0) {
		return time
	}

	var hour = parseInt(time / 3600)
	time = time % 3600
	var minute = parseInt(time / 60)
	time = time % 60
	var second = time

	return ([hour, minute, second]).map(function (n) {
		n = n.toString()
		return n[1] ? n : '0' + n
	}).join(':')
}

const formatDate = date => {//日期时间
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function str2float(str){
	let result;
	if(str==''){
		result = 0;
	}else{
		result = parseFloat(str)
		if(isNaN(result)){
			result = 0;
		}
	}
	return result;
}

function formatLocation(longitude, latitude) {
	if (typeof longitude === 'string' && typeof latitude === 'string') {
		longitude = parseFloat(longitude)
		latitude = parseFloat(latitude)
	}

	longitude = longitude.toFixed(2)
	latitude = latitude.toFixed(2)

	return {
		longitude: longitude.toString().split('.'),
		latitude: latitude.toString().split('.')
	}
}
var dateUtils = {
	UNITS: {
		'年': 31557600000,
		'月': 2629800000,
		'天': 86400000,
		'小时': 3600000,
		'分钟': 60000,
		'秒': 1000
	},
	humanize: function (milliseconds) {
		var humanize = '';
		for (var key in this.UNITS) {
			if (milliseconds >= this.UNITS[key]) {
				humanize = Math.floor(milliseconds / this.UNITS[key]) + key + '前';
				break;
			}
		}
		return humanize || '刚刚';
	},
	format: function (dateStr) {
		var date = this.parse(dateStr)
		var diff = Date.now() - date.getTime();
		if (diff < this.UNITS['天']) {
			return this.humanize(diff);
		}
		var _format = function (number) {
			return (number < 10 ? ('0' + number) : number);
		};
		return date.getFullYear() + '/' + _format(date.getMonth() + 1) + '/' + _format(date.getDate()) + '-' +
			_format(date.getHours()) + ':' + _format(date.getMinutes());
	},
	parse: function (str) { //将"yyyy-mm-dd HH:MM:ss"格式的字符串，转化为一个Date对象
		var a = str.split(/[^0-9]/);
		return new Date(a[0], a[1] - 1, a[2], a[3], a[4], a[5]);
	}
};

//blob流转换为base64
function blobToDataURI(blob, callback) {
   var reader = new FileReader();
   reader.readAsDataURL(blob);
   reader.onload = function (e) {
       callback(e.target.result);
   }
}
// 图片处理
const IMAGE_EXT = ['jpeg', 'jpg', 'gif', 'png', 'svg'];
function isImageUrl(url) {
    return IMAGE_EXT.some(ext => url.indexOf(`.${ext}`) !== -1);
}
function isImageFile(item) {
    if (item.type) {
        return item.type.indexOf('image') === 0;
    }
    if (item.path) {
        return isImageUrl(item.path);
    }
    if (item.url) {
        return isImageUrl(item.url);
    }
    return false;
}

//微信腾讯坐标(gcj02)转百度坐标(BD09)
function txmap2bdmap(gg_lat, gg_lon){ 
	let longitude,latitude;
    const x_pi = 3.14159265358979324 * 3000.0 / 180.0;
    let x = gg_lon; let y = gg_lat;
    let z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * x_pi);
    let theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * x_pi);
    longitude = z * Math.cos(theta) + 0.0065;
    latitude = z * Math.sin(theta) + 0.006;
	return {
		longitude,latitude
	}
}

//百度坐标(BD09)转微信腾讯坐标(gcj02)
function bdmap2txmap(gg_lat, gg_lon){
	    let x_pi = 3.14159265358979324 * 3000.0 / 180.0;    
        let x = gg_lon - 0.0065;
        let y = gg_lat - 0.006;
        let z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_pi);
        let theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_pi);
        let longitude = z * Math.cos(theta);
        let latitude = z * Math.sin(theta);
        return {
            longitude,latitude
        }
}
/* 其他时区转北京时区 */
function getBeiJingTime(date,timezone=8) {
	 var d = new Date(date);
	 // var timezone = 8; //目标时区时间，东八区
	 var offset_GMT = d.getTimezoneOffset(); // 本地时间和格林威治的时间差，单位为分钟
	 var nowDate = d.getTime(); // 本地时间距 1970 年 1 月 1 日午夜（GMT 时间）之间的毫秒数
	 var targetDate = new Date(nowDate + offset_GMT * 60 * 1000 + timezone * 60 * 60 * 1000);
	 return targetDate;
 }

module.exports = {
	formatTime: formatTime,
	formatLocation: formatLocation,
	dateUtils: dateUtils,
	formatDate,
	blobToDataURI,
	isImageUrl,
	isImageFile,
	txmap2bdmap,
	bdmap2txmap,
	str2float,
	getBeiJingTime
}
