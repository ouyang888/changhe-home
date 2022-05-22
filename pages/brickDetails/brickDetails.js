// pages/brickDetails/brickDetails.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: [0], //默认显示一个
    inputVal: [], //所有input的内容
    modelList: "",
    allNum: "",
    radioValue: 1,
    radioValue2: 2,
    radioFont: 1,
    numDuan:"",
    numChangeValue:"",
    newArrFont:[]
  },

  addInput: function () {
    var old = this.data.array;
    old.push(1); //这里不管push什么，只要数组长度增加1就行
    this.setData({
      array: old
    })
  },

  gotoModel: function () {
    wx.redirectTo({
      url: '../brickmodel/brickmodel',
    })
  },
  numChange: function (e) {
    this.setData({
      numChangeValue: e.detail.value
    })
  },

  allNum: function (e) {
    this.setData({
      allNum: e.detail.value
    })
  },
  handleChangeRadio(e) {
    this.setData({
      radioFont: e.detail.value
    })
  },

  gotoAddSaleFilingSheet: function () {
    let list = {}
    if(this.data.radioFont == 1){
      list.sampleId = this.data.modelList.id
      list.space = this.data.numChangeValue
      list.price = this.data.allNum
    }else{
      list.sampleId = this.data.modelList.id
      list.number = this.data.numChangeValue
      list.price = this.data.allNum
    }
    this.data.newArrFont.push(list)
   
    console.log("!2121212fff", this.data.newArrFont)
    // wx.redirectTo({
    //   url: '../addSaleFilingSheet/addSaleFilingSheet',
    // })
  },

  delInput: function (e) {
    var nowidx = e.currentTarget.dataset.idx; //当前索引
    var oldInputVal = this.data.inputVal; //所有的input值
    var oldarr = this.data.array; //循环内容
    oldarr.splice(nowidx, 1); //删除当前索引的内容，这样就能删除view了
    oldInputVal.splice(nowidx, 1); //view删除了对应的input值也要删掉
    if (oldarr.length < 1) {
      oldarr = [0] //如果循环内容长度为0即删完了，必须要留一个默认的。这里oldarr只要是数组并且长度为1，里面的值随便是什么
    }
    this.setData({
      array: oldarr,
      newArrFont: oldInputVal
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.item) {
      this.setData({
        modelList: JSON.parse(options.item)
      })
    }
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