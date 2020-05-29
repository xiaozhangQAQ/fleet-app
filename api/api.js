import http from './http.js';
import env from './env.js';
const url = env.baseUrl;


/* 授权获取微信openID*/
export const getOpenId = (data)=>http.post(`${url}/weixin/getOpenId`,data);
/* 接口使用实例*/
export const getUser = (data)=>http.post(`${url}/getWxUser`,data);

// 登录接口
export const userLogin = (data)=>http.post(`${url}/appCustomerApi/appUserLoginFacade/userLogin`,data);
//注销接口
export const userLogout = (data)=>http.postToken(`${url}/appCustomerApi/appUserManagerFacade/userLogout`,data);
//修改密码接口
export const changePassword = (data)=>http.post(`${url}/httpApi/driverManagerFacade/changePassword`,data);
//手机号发送验证码
export const getSmsVerificationCode = (data)=>http.postToken(`${url}/appCustomerApi/sysVerificationCodeFacade/getSmsVerificationCode`,data);
//通过手机号、验证码重置密码
export const smsResetPassword = (data)=>http.postToken(`${url}/appCustomerApi/sysVerificationCodeFacade/smsResetPassword`,data);
//首页获取列表数量接口
export const getAllCount = (data)=>http.postToken(`${url}/appCustomerApi/orderFacade/getAllCount`,data);
//订单接口 公用接口 任务详情页面使用
export const orderDetail = (data)=>http.postToken(`${url}/appCustomerApi/orderFacade/orderDetail`,data);
//获取组织接口
export const getOrgList = (data)=>http.postToken(`${url}/appCustomerApi/orgFacade/getOrgList`,data);
//获取文件接口
export const getFile = (data)=>http.postToken(`${url}/appCustomerApi/fileFacade/getFile`,data);


//用车申请列表接口
export const orderFacadeList = (data)=>http.postToken(`${url}/appCustomerApi/orderFacade/orderPage`,data);
//用车申请接口
export const saveOrder = (data)=>http.postToken(`${url}/appCustomerApi/orderFacade/saveOrder`,data);
//用车申请历史列表接口
export const orderHistoryList = (data)=>http.postToken(`${url}/appCustomerApi/orderFacade/orderHistoryPage`,data);
//用车申请取消接口
export const orderCancel = (data)=>http.postToken(`${url}/appCustomerApi/orderFacade/cancelOrder`,data);
//用车申请发车登记接口
export const userReceiveSendCar = (data)=>http.postToken(`${url}/appCustomerApi/userReceiveSendCarFacade/sendCar`,data);
//无发车直接更新“执行中”状态
export const updateExcecuteStatus = (data)=>http.postToken(`${url}/appCustomerApi/userReceiveSendCarFacade/updateExcecuteStatus`,data);
//“执行中”接口
export const courseOfOrder = (data)=>http.postToken(`${url}/appCustomerApi/orderFacade/courseOfOrder`,data);
//收车入库接口
export const receiveCar = (data)=>http.postToken(`${url}/appCustomerApi/userReceiveSendCarFacade/receiveCar`,data);
//获取油电卡接口
export const getCardForCar = (data)=>http.postToken(`${url}/appCustomerApi/chargeFacade/getCardForCar`,data);
//费用上传接口
export const saveCharge = (data)=>http.postToken(`${url}/appCustomerApi/chargeCusFacade/saveCharge`,data);
//费用详情接口
export const chargeDetail = (data)=>http.postToken(`${url}/appCustomerApi/chargeFacade/chargeDetail`,data);


//用车审核列表接口
export const approvalFacadeList = (data)=>http.postToken(`${url}/appCustomerApi/approvalFacade/list`,data);
//历史审核列表接口
export const approvalHistory = (data)=>http.postToken(`${url}/appCustomerApi/approvalFacade/history`,data);
//用车审核详情接口
export const approvalDetail = (data)=>http.postToken(`${url}/appCustomerApi/approvalFacade/detail`,data);
//用车审核详情提交接口
export const approvaSsubmit = (data)=>http.postToken(`${url}/appCustomerApi/approvalFacade/submit`,data);
//无收车直接更新“任务完成”状态
export const updateFinishStatus = (data)=>http.postToken(`${url}/appCustomerApi/userReceiveSendCarFacade/updateFinishStatus`,data);

//调度派车列表接口
export const dispatchFacadeList = (data)=>http.postToken(`${url}/appCustomerApi/dispatchFacade/list`,data);
//调度派车详情接口
export const dispatchDetail = (data)=>http.postToken(`${url}/appCustomerApi/dispatchFacade/detail`,data);
//获取车型列表接口
export const carModelList = (data)=>http.postToken(`${url}/appCustomerApi/dispatchFacade/getCarModelList`,data);
//获取车辆列表接口
export const carList = (data)=>http.postToken(`${url}/appCustomerApi/dispatchFacade/getCarList`,data);
//获取车辆信息接口
export const getCarDetail = (data)=>http.postToken(`${url}/appCustomerApi/dispatchFacade/getCarDetail`,data);
//获取驾驶员信息接口
export const getDriverList = (data)=>http.postToken(`${url}/appCustomerApi/dispatchFacade/getDriverList`,data);
//车辆指派提交接口
export const dispatchSubmit = (data)=>http.postToken(`${url}/appCustomerApi/dispatchFacade/submit`,data);
//车辆指派无车驳回接口
export const dispatchReject = (data)=>http.postToken(`${url}/appCustomerApi/dispatchFacade/reject`,data);
// 车辆指派历史列表接口
export const dispatchHistory = (data)=>http.postToken(`${url}/appCustomerApi/dispatchFacade/history`,data);
//调度审核列表接口
export const dispatchApprovalList = (data)=>http.postToken(`${url}/appCustomerApi/dispatchApprovalFacade/list`,data);
//调度审核详情接口
export const dispatchApprovalDetail = (data)=>http.postToken(`${url}/appCustomerApi/dispatchApprovalFacade/detail`,data);
//调度审核提交接口
export const dispatchApprovalSubmit = (data)=>http.postToken(`${url}/appCustomerApi/dispatchApprovalFacade/submit`,data);
//调度审核历史接口
export const dispatchApprovalHistory = (data)=>http.postToken(`${url}/appCustomerApi/dispatchApprovalFacade/history`,data);

//新增派车获取车辆列表接口
export const dispatchNewCarList = (data)=>http.postToken(`${url}/appCustomerApi/dispatchFacade/getCarListNewDipatch`,data);
//新增派车获取车辆信息接口
export const dispatchNewCarDetail = (data)=>http.postToken(`${url}/appCustomerApi/dispatchFacade/getCarDetailNewDipatch`,data);
//新增派车获取驾驶员列表接口
export const dispatchNewDriverList = (data)=>http.postToken(`${url}/appCustomerApi/dispatchFacade/getDriverListNewDipatch`,data);
//新增派车提交接口
export const dispatchNewSubmit = (data)=>http.postToken(`${url}/appCustomerApi/dispatchFacade/submitNewDipatch`,data);

//调度审核列表接口
export const dispatchApprovalFacadeList = (data)=>http.postToken(`${url}/appCustomerApi/dispatchApprovalFacade/list`,data);

//审核费用审核列表接口
export const chargeCusFacadeList = (data)=>http.postToken(`${url}/appCustomerApi/chargeCusFacade/noChargePage`,data);
//审核费用历史审核接口
export const chargeCusHistoryList = (data)=>http.postToken(`${url}/appCustomerApi/chargeCusFacade/overChargePage`,data);
//审核费用详情接口
export const chargeCusDetail = (data)=>http.postToken(`${url}/appCustomerApi/chargeCusFacade/chargeDetail`,data);
//费用审核提交接口
export const chargeCusSubmit= (data)=>http.postToken(`${url}/appCustomerApi/chargeCusFacade/passAuditing`,data);
//费用审核驳回接口
export const chargeCusReject= (data)=>http.postToken(`${url}/appCustomerApi/chargeCusFacade/rejectAuditing`,data);

//出行费用接口
export const orderCostStatistics= (data)=>http.postToken(`${url}/appCustomerApi/costStatisticsFacade/getOrderCostStatisticsByMap`,data);
//报销费用接口
export const claiminCostStatistics= (data)=>http.postToken(`${url}/appCustomerApi/costStatisticsFacade/getClaiminCostStatisticsByMap`,data);
//车辆成本接口
export const carManageCostStatistics= (data)=>http.postToken(`${url}/appCustomerApi/carManageCostStatisticsFacade/getCarManageCostStatisticByMap`,data);
//里程油耗接口
export const getMileageOilStatistics= (data)=>http.postToken(`${url}/appCustomerApi/carAlarmStatisticsFacade/getMileageOilStatisticsByMap`,data);
//告警统计接口
export const carAlarmStatistics= (data)=>http.postToken(`${url}/appCustomerApi/carAlarmStatisticsFacade/getCarAlarmStatisticsByMap`,data);

//维保审核列表接口
export const waitHandleList = (data)=>http.postToken(`${url}/appCustomerApi/carAppFacade/waitHandleList`,data);
//维保审核历史接口
export const waitHandleHistory = (data)=>http.postToken(`${url}/appCustomerApi/carAppFacade/historyList`,data);
//维保审核详情接口
export const waitHandleAuditDetail = (data)=>http.postToken(`${url}/appCustomerApi/carAppFacade/auditDetails`,data);
//维保详情接口
export const waitHandleDetail = (data)=>http.postToken(`${url}/appCustomerApi/carAppFacade/repairDetails`,data);
//维保审核提交接口
export const waitHandleSubmit = (data)=>http.postToken(`${url}/appCustomerApi/carAppFacade/repairAudit`,data);

//告警提醒分页接口
export const getCarAlarmList = (data)=>http.postToken(`${url}/appCustomerApi/carAlarmReportFacade/getCarAlarmPageByMap`,data);
//告警提醒详情接口
export const getCarAlarmDetail = (data)=>http.postToken(`${url}/appCustomerApi/carAlarmReportFacade/getCarAlarmInfoByMap`,data);

//车辆监控接口
export const getAllCarLocation = (data)=>http.postToken(`${url}/appCustomerApi/carsPositionFacade/getAllCarLocationAndOther`,data);
//根据车辆车牌号查车辆
export const getCarslikeLicenseNo = (data)=>http.postToken(`${url}/appCustomerApi/carsPositionFacade/getCarslikeLicenseNo`,data);
//点击车辆获取车辆数据
export const getCarInfoByLicenseNo = (data)=>http.postToken(`${url}/appCustomerApi/carsPositionFacade/getCarInfoByLicenseNo`,data);
//车辆追踪数据接口
export const getCarTrackByLicenseNo = (data)=>http.postToken(`${url}/appCustomerApi/carTrackFacade/getCarTrackByLicenseNo`,data);
//车辆追踪数据接口
export const getCarByLicenseNo = (data)=>http.postToken(`${url}/appCustomerApi/carsPositionFacade/getCarByLicenseNo`,data);
//历史轨迹查询接口
export const getCarHistoryByParam = (data)=>http.postToken(`${url}/appCustomerApi/historyFacade/getCarHistoryByParam`,data);


//用户列表
// export const getAccountByOrgId = (data)=>http.post(`${url}/appCustomerApi/appUserLoginFacade/getAccountByOrgId`,data);
export const getAccountByOrgId = (data)=>http.postToken(`${url}/appCustomerApi/appUserLoginFacade/getAccountByOrgId`,data);
