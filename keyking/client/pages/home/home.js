const app = getApp();
const myinfo = app.globalData.myinfo;
// pages/sy/sy.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    myinfo: 1    
  },
  test:function(e){
    this.setData({ myinfo: app.globalData.myinfo});
  },
  onLoad: function (e) {
    this.test();
    
    //查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
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
                          url: 'https://key.amanyx.com/aman/public/index.php/index/index/index',//服务器的地址，现在微信小程序只支持https请求，所以调试的时候请勾选不校监安全域名  
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
                                        url: 'https://key.amanyx.com/aman/public/index.php/index/index/messages',//服务器的地址，现在微信小程序只支持https请求，所以调试的时候请勾选不校监安全域名  
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
                                        console.log(res)
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


            }
          })
        }
      }
    })
     
  },
  bindGetUserInfo: function (e) {
   // console.log(e.detail.userInfo)
  },
  /**
   * 生命周期函数--监听页面加载
   */

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
  
  },
  king: function (king) {
    wx.navigateTo({
      url: "../rowPosition/rowPosition",
    })
  },
  rankings: function (rankings) {
    wx.navigateTo({
      url: "../rank-list/rank-list",
    })
  },
  book: function (rankings) {
    wx.navigateTo({
      url: "../book/book",
    })
  }
})
