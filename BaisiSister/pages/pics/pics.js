//index.js
//获取应用实例
var app = getApp()
var requestUrl = "https://haohaiyo.fun/renren-fast/generator/hhojoker/findRandom/20";
var curPage = 1;
var isPullDownRefreshing = false;
Page({
  //点击赞按钮
  zanEvent: function (e) {
    wx.request({
      url: requestUrl + "opt",
      data: {
        'jId': e.currentTarget.id,
        'cId': wx.getStorageSync('uuid'),
        'love': 1,
        'heat': 10
      },
      method: 'POST',
      success: function (res) {
        console.log(res);
      }
    })
  },
  //点击踩按钮
  caiEvent: function (e) {
    wx.request({
      url: requestUrl + "opt",
      data: {
        'jId': e.currentTarget.id,
        'cId': wx.getStorageSync('uuid'),
        'hate': 1,
        'heat': -10
      },
      method: 'POST',
      success: function (res) {
        console.log(res);
      }
    })
  },
  //点击转发按钮
  zfEvent: function (e) {
    wx.request({
      url: requestUrl + "opt",
      data: {
        'jId': e.currentTarget.id,
        'cId': wx.getStorageSync('uuid'),
        'repost': 1,
        'heat': 50
      },
      method: 'POST',
      success: function (res) {
        console.log(res);
      }
    })
  },
  data: {
    motto: 'Hello World',
    userInfo: {},
    jokes :{}
  },

  lower:function(){
    console.log("reach to lower...");
    var that = this;
    this.fetchJoke();
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    this.fetchJoke();


  },
  onPullDownRefresh:function(){
    console.log('onPullDownRefresh...');
    curPage = 1;
    isPullDownRefreshing = true;
    this.fetchJoke();
  },

  fetchJoke:function(){
    wx.showNavigationBarLoading();
    var that = this;
    wx.request({
      url: requestUrl,
      data: {
        // 'showapi_appid':app.globalData.appid,
        // 'showapi_sign':app.globalData.apiKey,
        // 'page':curPage.toString(),
        // 'type':app.globalData.tImg,
        // 'showapi_timestamp': new Date()
      },
      method: 'GET',
      success: function(res){
        // success
        if(curPage == 1)
          that.setData({ jokes: res.data.page });
        else
          that.setData({ jokes: that.data.jokes.concat(res.data.page) });

        curPage = curPage + 1;
        wx.hideNavigationBarLoading();
        if(isPullDownRefreshing)
          wx.stopPullDownRefresh();
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },

  previewImg:function(e){
    console.log(e);
    wx.previewImage({
      // current: 'String', // 当前显示图片的链接，不填则默认为 urls 的第一张
      urls: [e.currentTarget.dataset.imgurl],
      success: function(res){
        // success
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  }

})

