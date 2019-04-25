//index.js
//获取应用实例
var app = getApp()
var requestUrl = "https://haohaiyo.fun/renren-fast/generator/hhojoker/";
var curPage = 1;
var isPullDownRefreshing = false;
Page({
  //点击赞按钮
  zanEvent: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.dex;
    console.log(e);
    wx.request({
      url: requestUrl + "opt",
      data: {
        'jId': e.currentTarget.id,
        'cId': wx.getStorageSync('uuid'),
        'love':1,
        'heat':10
      },
      method: 'POST',
      success: function (res) {
        var oldLove = that.data.jokes[index].love;
        that.data.jokes[index].love = oldLove+1;
        that.setData({ jokes: that.data.jokes});
        console.log(that.data.jokes[index]);
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
    console.log('onPullDownRefresh...' + isPullDownRefreshing);
    curPage = 1;
    isPullDownRefreshing = true;
    this.fetchJoke();
  },

  fetchJoke:function(){
    wx.showNavigationBarLoading();
    var that = this;
    wx.request({
      url: requestUrl +"findRandom/10",
      data: {
        // 'showapi_appid':app.globalData.appid,
        // 'showapi_sign':app.globalData.apiKey,
        // 'page':curPage.toString(),
        // 'type':app.globalData.tText,
        // 'showapi_timestamp':new Date()
      },
      method: 'GET',
      success: function(res){
        // success
        if(curPage == 1)
          that.setData({ jokes:res.data.page });
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
  }

})

