// pages/findPsd/findPsd.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userPhone: ""
  },

  changePhone: function (e) {
    this.setData({
      userPhone: e.detail.value
    })
  },

  psdConf: function () {
    if (this.data.userPhone == '') {
      wx.showToast({
        title: "手机号码不能为空",
        icon: 'none',
        duration: 2000 //持续的时间 
      })
    } else {
      wx.navigateTo({
        url: `../psdConf/psdConf?userPhone=${this.data.userPhone}`,
      })
    }
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