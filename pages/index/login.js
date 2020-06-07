const app = getApp()
import Notify from '../../components/vant/notify/notify';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: [],
    code: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        this.setData({
          code: res.code
        })
        console.log('login中的code的值为++++++', res.code)
      }
    })

    var that = this;
    //查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          console.log(res)
          wx.switchTab({
            url: '../squre/squre',
          })
        } else {
          //用户没有授权
          console.log("用户没有授权");
        }
      }
    });
  },

  bindGetUserInfo: function (res) {
    if (res.detail.userInfo) {
      //用户按了允许授权按钮
      var that = this;
      // 获取到用户的信息了，打印到控制台上看下
      console.log("用户的信息如下：");
      console.log(res.detail.userInfo);
      //授权成功后,通过改变 isHide 的值，让实现页面显示出来，把授权页面隐藏起来
      that.setData({
        isHide: false,
        userInfo: res.detail.userInfo
      });
      app.globalData.userInfo = res.detail.userInfo

      //用户信息后台登录注册并设置cookie
      wx.request({
        url: 'https://treehole.starcpdk.com/Home/User/sign',
        method: 'POST',
        data: {
          "code": this.data.code,
          "username": this.data.userInfo.nickName,
          "faceUrl": this.data.userInfo.avatarUrl,
        },
        header: {
          'content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
        success: (res) => {
          console.log("登录成功的返回值", res.data)
          app.globalData.user = res.data.data
          console.log("全局变量的user信息", app.globalData.user)
          console.log("cookie信息", res.header['Set-Cookie'])
          if (res && res.header && res.header['Set-Cookie']) {
            wx.setStorageSync('cookieKey', res.header['Set-Cookie']); //保存Cookie到Storage
          }
        },
        fail: (res) => {
          console.log("登录失败")
          Notify({
            message: '登录失败 ， 请连接网络',
            color: '#ad0000',
            background: '#ffe1e1',
          });
        }
      })


      wx.switchTab({
        url: '../squre/squre',
      })
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {
          // 用户没有授权成功，不需要改变 isHide 的值
          if (res.confirm) {
            console.log('用户点击了“返回授权”');
          }
        }
      });
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