// pages/my_tree_hole/my_treehole/my_treehole.js
import Dialog from '../../../components/vant/dialog/dialog';

import { $post } from "../../../utils/requestbasic";

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id:options.id,
      user_id:options.user_id,
      phone:options.phone,
      username:options.username,
      face_url:decodeURIComponent(options.face_url)
    })
    console.log("我的头像",this.data.face_url)
  },

  delete(e) {
    let id = e.currentTarget.dataset.id
    Dialog.confirm({
      message: '确定要删除吗？'
    }).then(() => {
      // on confirm
      this.deleteMessage(id)
      isShowToast = true;
    }).catch(() => {
      // on cancel
    });
  },

  async deleteMessage(id) {
    console.log("全局变量的值：" , getApp().globalData.user)
    let res = await $post(
      '/Message/delete_message', {
        user_id: getApp().globalData.user.id,
        message_id: this.data.userInfo[id].id
      },
      {
        'content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      }
    )
      console.log(res , "---------")
    this.get_one_user_all_messages()
  },

  async get_one_user_all_messages() {
    let res = await $post(
      '/Message/get_one_user_all_messages', {
        user_id: getApp().globalData.user.id,
      }, {
        'content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      }
    )
    console.log("获取的指定树洞接口",res)
    this.setData({
      name: res.data[0].user.username,
      face_url:res.data[0].user.face_url,
      userInfo: res.data
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
    this.get_one_user_all_messages()
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