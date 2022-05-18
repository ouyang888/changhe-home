// pages/psdConf/psdConf.js
var interval = null //倒计时函数
import {
  sendVerifyCode,updatePwd
} from '../../service/api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    codeText:"获取验证码",
    disabled:false,
    currentTime: 60,
    code:""
  },

  getVerificationCode(){
    this.getCode();
    var that = this
    that.setData({
      disabled:true
    })
  },
  async getSendVerifyCode(){
    let res = await sendVerifyCode(this.data.phone)
    this.getVerificationCode();
  },

  codeInput: function (e) {
    this.setData({
      code: e.detail.value
    })
  },
  newPsdInput:function(e){
    this.setData({
      newPsd: e.detail.value
    })
  },

  async updatePassword(){
    let list = {
      verifyCode:this.data.code,
      phone:this.data.phone,
      newPwdMd5:this.data.newPsd
    }
    if(this.data.code == ''){
      wx.showToast({
        title: "验证码不能为空",
        icon: 'none',
        duration: 2000 //持续的时间 
      })
    }else if(this.data.newPsd == ''){
      wx.showToast({
        title: "新密码不能为空",
        icon: 'none',
        duration: 2000 //持续的时间 
      })
    }else{
      let res = await updatePwd(list)
      if(res.data.errorCode == 0){
        wx.showToast({
          title: "修改成功,请重新登录",
          icon: 'success',
          duration: 2000 //持续的时间 
        })
        wx.navigateTo({
          url: '../../pages/login/login'
        })
      }
    }
    
  },

  getCode: function (options){
    var that = this;
    var currentTime = that.data.currentTime
    interval = setInterval(function () {
      currentTime--;
      that.setData({
        codeText: currentTime+'秒后重发',
      })
      if (currentTime <= 0) {
        clearInterval(interval)
        that.setData({
          codeText: '重新发送',
          currentTime:60,
          disabled: false   
        })
      }
    }, 1000)  
  },




  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log("options",options)
    this.setData({
      phone:options.userPhone
    })
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