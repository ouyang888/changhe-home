// pages/login/login.js
import {
  userLogin
} from '../../service/api'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userAccount: "",
    pwdMd5: ""
  },

  // 账号登录 
  async userLogin() {
    let list = {
      userAccount: this.data.userAccount,
      pwdMd5: this.data.pwdMd5
    }
    if (this.data.userAccount == '') {
      wx.showToast({
        title: "账号不能为空",
        icon: 'none',
        duration: 2000 //持续的时间 
      })
    } else if (this.data.pwdMd5 == '') {
      wx.showToast({
        title: "密码不能为空",
        icon: 'none',
        duration: 2000 //持续的时间 
      })
    } else {
      await userLogin(list).then(res => {
        if (res.data.errorCode === 0) {
          wx.setStorage({
            data: res.data.data,
            key: 'user',
          })
          wx.switchTab({
            url: '../../pages/index/index'
          })
        }
      }).catch((error) => {
        wx.showToast({
          title: error.data.msg,
          icon: 'none',
          duration: 2000 //持续的时间 
        })
      })
    }

  },
  userName: function (e) {
    this.setData({
      userAccount: e.detail.value
    })
  },

  psd: function (e) {
    this.setData({
      pwdMd5: e.detail.value
    })
  },

  getUserInfo: function (e) {
    // 登录
    wx.login({
      success(res) {
        console.log("!11222", res)
        if (res.code) {
          //发起网络请求
          // wx.request({
          //   url: 'https://example.com/onLogin',
          //   data: {
          //     code: res.code
          //   }
          // })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
    wx.getUserInfo({
      success: function (res) {
        console.log("111222", res)
        var userInfo = res.userInfo
        var nickName = userInfo.nickName
        var avatarUrl = userInfo.avatarUrl
        var gender = userInfo.gender //性别 0：未知、1：男、2：女
        var province = userInfo.province
        var city = userInfo.city
        var country = userInfo.country
      }
    })
  },
  findPsd: function () {
    wx.navigateTo({
      url: '../findPsd/findPsd',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var that = this;
    //查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          // console.log("用户授权了");
        } else {
          //用户没有授权
          // console.log("用户没有授权");
        }
      }
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})