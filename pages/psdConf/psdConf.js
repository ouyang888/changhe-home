// pages/psdConf/psdConf.js
var interval = null //倒计时函数
Page({

  /**
   * 页面的初始数据
   */
  data: {
    codeText:"获取验证码",
    disabled:false,
    currentTime: 60
  },

  getVerificationCode(){
    this.getCode();
    var that = this
    that.setData({
      disabled:true
    })
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