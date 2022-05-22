// pages/brickmodel/brickmodel.js
import {
  sampleList
} from '../../service/api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sampleData: [],
    pageNo: 1,
    pageSize: 10,
    searchValue:""
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.sampleInfo();
  },

  addModel:function(event){
    let list = event.currentTarget.dataset.item
    wx.navigateTo({
      url: '../brickDetails/brickDetails?item=' + JSON.stringify(list),
    })
  },

  searchName:function(e){
    this.setData({
      searchValue: e.detail.value
    })
  },

  //样品单列表
  async sampleInfo() {
    let res = await sampleList(this.data.pageNo, this.data.pageSize,this.data.searchValue);
    this.setData({
      sampleData: res.data.data.records
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