
import Request from "./request";
class Token {
  index = 0;
  static token = ''
  constructor() {
    // console.log('constructor')
    if (!Token.token) {
      let token = this._getTokenFromCache();
      Token.token = token;
    }
  }
  async getWxCode() {
    // console.log(123123);
    return new Promise((resolve, reject) => {
      wx.login({
        success(res) {
          if (res.code) {
            resolve(res.code);
          } else {
            reject(null);
          }
        }
      })
    })
  }

  async _requestToken() {
    // console.log('requestToken')
    try {
      let wxCode = await this.getWxCode();
      let res = await Request.https({
        url: `frontend/v1/wx/user/getToken`,
        data: { wxCode: wxCode },
        method: 'get',
        service: 'user'
      })
      return res.data.data.token;
    } catch (error) {
      // console.error(error);
    }
  }

  _getTokenFromCache() {
    // 从缓存里面查token
    let cachedToken = wx.getStorageSync('token');
    if (cachedToken == null && typeof cachedToken == 'object') {
      return null;
    } else {
      if (!cachedToken.time || (cachedToken.time < new Date().getTime() - 60 * 60 * 1000)) {
        // console.log('token 已超时')
        return null;
      }
      // console.log('token 不超时')
      return cachedToken.token;
    }
  }

  async getToken() {
    // return"eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJ1c2VyLXNlcnZpY2UiLCJpYXQiOjE2NDU1MTkyMjYsImp0aSI6IjAwMzVhYzcyLWI0YTItNDllYy1hYzJiLThiNTJlMzk5NGRmYyIsInVpZCI6IjIwODg4MDIzODI2MzY3MzYiLCJuaWNrTmFtZSI6ImhjaCIsInNvdXJjZSI6ImFsaVBheSIsImF2YXRhciI6Imh0dHBzOi8vdGZzLmFsaXBheW9iamVjdHMuY29tL2ltYWdlcy9wYXJ0bmVyL0FUZzNiQ1RZdzR0RXNBQUFBQUFBQUFBQUFBRHRsMkFBIiwidXNlcklkIjoiMTQiLCJleHAiOjE2NDU1MjI4MjZ9.x88k9bsba_CaMqDf5Lc0ifOqZSkRnim3Pc2NwQTtl-BDTBXbmqKp-6fh_eOZlzRndazVy1Zn8DbX09StFrB03g";
    // 如果实例里面有的话先返回实例里面的，如果没有的话查缓存，缓存也没有的话就重新获取
    if (Token.token) {
      return Token.token;
    } else {
      try {
        let token = await this._requestToken();
        this.setToken(token);
        return token;
      } catch (error) {

        throw error;
      }
    }
  }

  async updateToken() {
    let token = await this._requestToken();
    this.setToken(token);
  }

  setToken(token) {
    let dateTime = new Date().getTime();
    Token.token = token;
    try {

      // 写进缓存里面
      wx.setStorageSync('token', {
        token,
        time: dateTime
      });
      // 不紧急使用，用异步方法
      wx.setStorageSync('userLoginTime', dateTime);
    } catch (error) {
      console.error(error)
    }
  }
  clearToken() {
    Token.token = '';
    // 写进缓存里面
    wx.setStorageSync('token', null);
  }
}

export default new Token();
