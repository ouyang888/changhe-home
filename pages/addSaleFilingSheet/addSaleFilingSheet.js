// pages/addFlingSheet/addFlingSheet.js
import {
  salesAreaList,
  salesChannel
} from '../../service/api'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: 0,
    indexTwo: 0,
    indexThree: 0,
    array: ['本区报备', '跨区报备'],
    arrayThree: ['自然客', '设计师', '泥水师'],
    date: '2016-09-01',
    dateTwo:'2016-09-02',
    dateThree:'2016-09-03',
    region: ['广东省', '佛山市', '禅城区'],
    imgs: [],
    count: 3,
    maxWord: 500,
    currentWord: 0,
    pageNo: 1,
    pageSize: 10,
    salesAreaChange: [],
    saleNewArr: [],
    saleNewObj: "",
    ownerName:"",
    ownerPhone:"",
    ownerPrice:"",
    address:"",
    tips:"",
    channelList:[],
    channelLisArr:[]
  },


  ownerName: function (e) {
    this.setData({
      ownerName: e.detail.value
    })
  },
  ownerPhone: function (e) {
    this.setData({
      ownerPhone: e.detail.value
    })
  },
  ownerPrice: function (e) {
    this.setData({
      ownerPrice: e.detail.value
    })
  },
  address: function (e) {
    this.setData({
      address: e.detail.value
    })
  },

  //保存当前页面表单
  saveStorge:function(){

  },
  
  //新增销售单
  async addSaleSheet(){
    // console.log("121214444",this.data.date)
    let item = {
      nature:this.data.index == 0 ? '1' : '2',
      salesAreaId:this.data.saleNewObj.id,
      salesChannelId:this.data.channelList[this.data.indexThree].id,
      datetimeOrder:this.data.date,
      datetimeDelivery:this.data.dateTwo,
      details:[],
      ownerName:this.data.ownerName,
      ownerPhone:this.data.ownerPhone,
      totalAmount:this.data.ownerPrice,
      address:this.data.region[0] + this.data.region[1] + this.data.region[2],
      detailedAddress:this.data.address,
      imgList:this.data.imgs,
      remark:this.data.tips
    }
    console.log("21212oooeee",item)
  },
  
  //销售渠道下拉
  async salesChannelList() {
    let res = await salesChannel();
    let newArr = []
    for (var i = 0; i < res.data.data.length; i++) {
      newArr.push(res.data.data[i].name)
    }
    this.setData({
      channelList:res.data.data,
      channelListObj: res.data.data[0],
      channelLisArr: newArr,
    }) 
  },

  limitWord: function (e) {
    var that = this;
    var value = e.detail.value;
    this.setData({
      tips: value
    })
    //解析字符串长度转换成整数。
    var wordLength = parseInt(value.length);
    if (that.data.maxWord < wordLength) {
      return;
    }
    that.setData({
      currentWord: wordLength
    });
  },

  //用砖区域
  async salesAreaInfo() {
    let res = await salesAreaList(this.data.pageNo, this.data.pageSize);
    let newArr = []
    for (var i = 0; i < res.data.data.length; i++) {
      newArr.push(res.data.data[i].name)
    }
    this.setData({
      salesAreaChange: newArr,
      saleNewArr: res.data.data,
      saleNewObj: res.data.data[0]
    })
  },
  goBrickDetails:function(){
    wx.navigateTo({
      url: '../brickDetails/brickDetails',
    })
  },

  bindPickerChange: function (e) {
    // console.log('picker发送选择改变，携带值为', e.detail)
    this.setData({
      index: e.detail.value
    })
  },
  bindPickerChangeThree: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail)
    this.setData({
      indexThree: e.detail.value,
      channelListObj:this.data.channelList[e.detail.value]
    })
  },

  bindPickerChangeTwo: function (e) {
    // console.log('picker发送选择改变，携带值为', this.data.saleNewArr)
    this.setData({
      indexTwo: e.detail.value,
      saleNewObj: this.data.saleNewArr[e.detail.value]
    })
  },
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  bindDateChangeTwo: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      dateTwo: e.detail.value
    })
  },
  bindDateChangeThree: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      dateThree: e.detail.value
    })
  },
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  bindUpload: function (e) {
    switch (this.data.imgs.length) {
      case 0:
        this.data.count = 3
        break
      case 1:
        this.data.count = 2
        break
      case 2:
        this.data.count = 1
        break
    }
    var that = this
    let user = wx.getStorageSync('user')
    wx.chooseImage({
      count: that.data.count, // 默认3
      sizeType: ["original", "compressed"], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ["album", "camera"], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        for (var i = 0; i < tempFilePaths.length; i++) {
          wx.uploadFile({
            url: 'https://changhejiaju.com.cn/dms/file/uploadImage',
            filePath: tempFilePaths[i],
            name: "file",
            header: {
              "content-type": "multipart/form-data",
              "token":user.token
            },
            success: function (res) {
              if (res.statusCode == 200) {
                wx.showToast({
                  title: "上传成功",
                  icon: "none",
                  duration: 1500
                })

                that.data.imgs.push('https://changhejiaju.com.cn/dms/api/picture/' + JSON.parse(res.data).data.fileName)

                that.setData({
                  imgs: that.data.imgs
                })
              }
            },
            fail: function (err) {
              wx.showToast({
                title: "上传失败",
                icon: "none",
                duration: 2000
              })
            },
            complete: function (result) {
              console.log(result.errMsg)
            }
          })
        }
      }
    })
  },
  // 删除图片
  deleteImg: function (e) {
    var that = this
    wx.showModal({
      title: "提示",
      content: "是否删除",
      success: function (res) {
        if (res.confirm) {
          for (var i = 0; i < that.data.imgs.length; i++) {
            if (i == e.currentTarget.dataset.index) that.data.imgs.splice(i, 1)
          }
          that.setData({
            imgs: that.data.imgs
          })
        } else if (res.cancel) {
          console.log("用户点击取消")
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.salesAreaInfo();
    this.salesChannelList();
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