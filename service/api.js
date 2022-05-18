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