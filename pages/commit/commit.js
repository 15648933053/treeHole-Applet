import { $post } from "../../utils/requestbasic"
import Notify from '../../components/vant/notify/notify';
// pages/commit/commit.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    textarea:""
  },

  textareaShow(e){
    this.data.textarea = e.detail.value
    this.setData({
      textarea:this.data.textarea
    })
  },

  send(){
    //调用接口将数据存储到数据库
    console.log("send............")
    this.sendApi()
  },

  async sendApi(){
    console.log("增加方法")
    console.log(getApp().globalData.user.id,)
    let res = await $post(
      '/Message/publish_new_message',
      {
        user_id:getApp().globalData.user.id,
        content:this.data.textarea
      },
      {
        'content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      }
    )
    console.log(res)
    if(res.error_code === 0){
      Notify({
        message: '发布成功',
        color: '#ad26a8',
        background: '#ffe1e1'
      });
      wx.switchTab({
        url: '../../pages/squre/squre',
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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