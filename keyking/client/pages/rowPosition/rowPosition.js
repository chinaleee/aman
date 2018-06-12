const app = getApp();
const myinfo = app.globalData.myinfo;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    myinfo: 1    
  },
  test: function (e) {
    this.setData({ myinfo: app.globalData.myinfo });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.test();
    var that = this;
    wx.request({
      url: 'http://39.105.132.206/aman/public/index.php/index/RowPosition/paragraph',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        that.setData({
          arr: res.data
        })
      }
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
    wx.login({
      success: function (res) {
        var code = res.code;//发送给服务器的code  
        var _that = this;
        wx.getUserInfo({
          success: function (res) {
            var userNick = res.userInfo.nickName;//用户昵称  
            var avataUrl = res.userInfo.avatarUrl;//用户头像地址  
            var gender = res.userInfo.gender;//用户性别  
            if (code) {
              wx.request({
                url: 'http://39.105.132.206/aman/public/index.php/index/index/messages',//服务器的地址，现在微信小程序只支持https请求，所以调试的时候请勾选不校监安全域名  
                data: {
                  code: code,
                  nick: userNick,
                  avaurl: avataUrl,
                  sex: gender,
                },
                header: {
                  'content-type': 'application/json'
                },
                success: function (res) {
                  app.globalData.myinfo = res.data[0];

                  // console.log(app.globalData.myinfo);
                  // wx.setStorageSync('name', res.data.name);//将获取信息写入本地缓存  
                  // wx.setStorageSync('openid', res.data.openid);
                  // wx.setStorageSync('imgUrl', res.data.imgurl);
                  // wx.setStorageSync('sex', res.data.sex);
                }
              })
            }
            else {
              console.log("获取用户登录态失败！");
            }
          }
        })
      },
      fail: function (error) {
        console.log('login failed ' + error);
      }
    })
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
    
  },
  fight: function (e) {
    var p_id = e.currentTarget.id;
    var openid = e.currentTarget.dataset.openid;
    wx.request({
      url: "http://39.105.132.206/aman/public/index.php/index/Rowposition/fighting?p_id=" + p_id + "&openid=" + openid,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        var arr = res.data;
        console.log(arr);
        switch (arr){
          case "金币不足":
            wx.showToast({
              title: "金币不足！",
              icon: 'loading',
              duration: 1000,
              mask: true
            })
            break;
          case 1 :
            wx.navigateTo({
              url: '../fighting-wait/fighting-wait'
            })
          break;
        } 
      }
    })
  }
}) 