// pages/squre/squre.js
import {
  $post, $post_data
} from '../../utils/requestbasic.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{
      
    }
  },

  add(){
    //调用接口获取用户的信息
    wx.navigateTo({
      url: '../commit/commit?mas=' + encodeURIComponent(this.data.userInfo.msg),
    })
  },

  async dianzan(e){
    let id =  e.currentTarget.dataset.id
    console.log(this.data.userInfo[id].id)
    let res = await $post(
      '/Message/do_like',
      {
        user_id:getApp().globalData.user.id,
        message_id:this.data.userInfo[id].id
      },
      {
        'content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      }
    )
    console.log("-------------",res)
    this.squire();
  },

  squire(){
    this.selAllMessage()
  },

  async selAllMessage(){
    let res = await $post(
      '/Message/get_all_messages'
    )
    console.log("查询全部消息的返回值",res)
    this.setData({
      userInfo:res.data
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.selAllMessage()
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
    this.selAllMessage()
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