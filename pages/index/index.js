// index.js
Page({
  data: {

  },
  goFilingSheet:function(){
    wx.navigateTo({
      url: '../filingSheet/filingSheet',
    })
  },
  goSaleFilingSheet:function(){
    wx.navigateTo({
      url: '../saleFilingSheet/saleFilingSheet',
    })
  }
})
