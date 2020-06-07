import {
  $post
} from '../../../utils/requestbasic.js'
import Notify from '../../../components/vant/notify/notify';
const app = getApp();
Page({
  data: {
  },
  onLoad: function (options) {
    console.log(options.id)
    this.setData({
      id:options.id,
      user_id:options.user_id,
      phone:options.phone,
      username:options.username,
      face_url:decodeURIComponent(options.face_url)
    })
    console.log("我的头像",this.data.face_url)
  },

  // 图片选择
  image: function () {
    var that = this
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        that.setData({
          face_url: tempFilePaths,
          message: '图片选择成功'
        })
        console.log(that.data.photos)
      }
    })
  },

  inputname(e){
    console.log(e.detail.value)
    this.setData({
      username:e.detail.value
    })
  },

  inputphone(e){
    console.log(e.detail.value)
    this.setData({
      phone:e.detail.value
    })
  },

  xiugai(){
    console.log("修改接口时传入的参数" , this.data.face_url)
    this.xiugaixinxi()
  },

  async xiugaixinxi(){
    console.log("wx.login中的值",this.data.code)
    let res = await $post(
      '/User/upduser',
      {
        code:this.data.code,
        face_url:this.data.face_url,
        username:this.data.username,
        phone:this.data.phone
      },
      {
        'content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
    )
    
    console.log("修改参数的到的返回值",res)
  
    if(res.error_code == 0){
      getApp().globalData.user = res.data
      Notify({
        message: '修改成功',
        color: '#fff',
        background: '#bad',
      });
      wx.switchTab({
        url: '../../squre/squre'
      })
    }else{
      Notify({
        message: '修改失败',
        color: '#fff',
        background: '#bad',
      });

      wx.login({
        success: res => {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          this.setData({
            code: res.code
          })
          console.log('login中的code的值为++++++', res.code)
        }
      })
    }
  },
 
  onShow(){
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        this.setData({
          code: res.code
        })
        console.log('login中的code的值为++++++', res.code)
      }
    })
  }


})