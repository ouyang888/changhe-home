import Request from "../utils/request";

//登录
export function userLogin(data) {
  return Request.https({
      url: '/Auth/login',
      data,
      method: 'POST',
  })
}
//发送验证码
export function sendVerifyCode(data) {
  return Request.https({
      url: '/Auth/sendVerifyCode',
      data,
      method: 'POST',
  })
}

//提交新密码
export function updatePwd(data) {
  return Request.https({
      url: '/Auth/updatePwd',
      data,
      method: 'POST',
  })
}



//报备单列表
export function selectPageList(pageNo,pageSize,state) {
  return Request.https({
      url: `/manager/report/selectPage?pageNo=${pageNo}&pageSize=${pageSize}&state=${state}`,
      method: 'GET',
  })
}


//新增报备单
export function addReport(data) {
  return Request.https({
      url: '/manager/report',
      data,
      method: 'POST',
  })
}


//销售单列表
export function selectPageSalesList(pageNo,pageSize,state) {
  return Request.https({
      url: `/manager/sales/selectPage?pageNo=${pageNo}&pageSize=${pageSize}&state=${state}`,
      method: 'GET',
  })
}

//分销区域下拉列表
export function salesAreaList(pageNo,pageSize) {
  return Request.https({
      url: `/manager/sales/area?pageNo=${pageNo}&pageSize=${pageSize}`,
      method: 'GET',
  })
}

//样品列表
export function sampleList(pageNo,pageSize,queryParam) {
  return Request.https({
      url: `/manager/sample?pageNo=${pageNo}&pageSize=${pageSize}&queryParam=${queryParam}`,
      method: 'GET',
  })
}

//销售渠道下拉列表
export function salesChannel() {
  return Request.https({
      url: `/manager/sales/channel`,
      method: 'GET',
  })
}