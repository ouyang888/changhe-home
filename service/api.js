import Request from "../utils/request";

//登录
export function userLogin(data) {
  return Request.https({
      url: '/Auth/login',
      data,
      method: 'POST',
  })
}