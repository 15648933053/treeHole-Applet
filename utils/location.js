/** 
 * $parseVars2Str将集合中的元素用逗号拼接成字符串
 * MAP_KEY   mapkey的id
 * $get  request中的get请求的封装函数
 */

import {
  $parseVars2Str
} from '../utils/util.js'

import {
  MAP_KEY
} from '../config/index.js'

import {
  $get
} from '../utils/requestbasic.js'

//封装获取当前位置的方法         方式一：

// export function $convertLocationToAdress(callback) {
//   wx.getLocation({
//     altitude: 'altitude',
//     complete: (res) => {},
//     fail: (res) => {},
//     highAccuracyExpireTime: 0,
//     isHighAccuracy: true,
//     success: ({
//       //longitude:lng, 给longitude变量取别名为lng
//       longitude:lng,
//       latitude:lat
//     }) => {
//       //使用腾讯地图获取当前地址  
//       wx.request({
//         url: 'https://apis.map.qq.com/ws/geocoder/v1/',
//         complete: (res) => {},
//         data:{
//           location:$parseVars2Str(lat , lng),
//           key:MAP_KEY
//         },
//         success: (result) => {
//           callback(result.data.result)
//           // console.log(result.data.result.address)
//         },
//       })

//       // this.setData({
//       //   location:$parseVars2Str(lng , lat)
//       // })
//     },
//     type: 'gcj02',
//   })
// }


// //封装获取当前位置的方法         方式二：
// export function $convertLocationToAdress() {
//   return new Promise((resolve, reject) => {
//     wx.getLocation({
//       altitude: 'altitude',
//       complete: (res) => {},
//       fail: (res) => {},
//       highAccuracyExpireTime: 0,
//       isHighAccuracy: true,
//       success: ({
//         //longitude:lng, 给longitude变量取别名为lng
//         longitude: lng,
//         latitude: lat
//       }) => {
//         //使用腾讯地图获取当前地址  
//         wx.request({
//           url: 'https://apis.map.qq.com/ws/geocoder/v1/',
//           complete: (res) => {},
//           data: {
//             location: $parseVars2Str(lat, lng),
//             key: MAP_KEY
//           },
//           success: (result) => {
//             resolve(result.data.result)
//             // console.log(result.data.result.address)
//           },
//         })

//         // this.setData({
//         //   location:$parseVars2Str(lng , lat)
//         // })
//       },
//       type: 'gcj02',
//     })
//   })
// }




//wx.getLocation也封装起来

//获取当前位置经纬度
export function $getLocation() {
  return new Promise((resolve, reject) => {
    wx.getLocation({
      type: 'gcj02',
      altitude: 'altitude',
      complete: (res) => {},
      fail: (res) => {},
      highAccuracyExpireTime: 0,
      isHighAccuracy: true,
      success: ({
        //longitude:lng, 给longitude变量取别名为lng
        longitude: lng,
        latitude: lat
      }) => {
        resolve({
          lat,
          lng
        })
      },
    })
  })
}

//将地址坐标转换为地图中的地址名称
export function $convertLocationToAdress({
  lat,
  lng
}) {
  return new Promise(async (resolve, reject) => {
    //使用腾讯地图获取当前地址 
    let {
      result
    } = await $get('https://apis.map.qq.com/ws/geocoder/v1/', {
      location: $parseVars2Str(lat, lng),
      key: MAP_KEY
    })
    resolve(result)
  })
}

//将地图中的地址名称转换为地址坐标
export function $convertAdressToLocation(address) {
  return new Promise(async (resolve, reject) => {
    //使用腾讯地图获取当前地址 
    let {
      result
    } = await $get('https://apis.map.qq.com/ws/geocoder/v1/', {
      address,
      key: MAP_KEY
    })
    resolve(result.location)
  })
}

/**
 *   将list集合中的地址列表同时转换成坐标列表
 *   addressList为地名的列表集合
 *   prolist：空列表用于放置循环后的每一个被转换的坐标集合
 *   $convertAdressToLocation(r)  循环将每一个地名转换为坐标
 *   prolist.push(pro)   放入prolist
 *   let res = await Promise.all(prolist)   将prolist中的所有pro统一发起请求 同时转换为地址坐标
 */
export async function $convertAddressListToLication(addressList) {
  let prolist = []
  addressList.forEach(r => {
    let pro = $convertAdressToLocation(r)
    prolist.push(pro)
    // console.log(JSON.stringify(this.data.shoplist))
  });
  // 统一发起请求
  let res = await Promise.all(prolist)
  return res;
}


/**
 * 
 * 
 * 获取一对多的距离
 * fromLocation{lat , lng}
 * fromLocation   起始位置的坐标集合
 * toLocationList:[{lat , lng},{lat , lng},{lat , lng}]    接收$convertAddressListToLication这个方法返回的位置坐标的集合
 * let to = (toLocationList.map(r => {return $parseVars2Str(r.lat, r.lng)}).join(";"));   将拿到的toLocationList集合转换为[r.lat, r.lng ; r.lat, r.lng ; r.lat, r.lng]   这样的集合
 * 
 * 
 */
export async function $getDistanceOneToMany(fromLocation , toLocationList) {
  //组装数组
  let to = (toLocationList.map(r => {
    return $parseVars2Str(r.lat, r.lng)
  }).join(";"));

  //请求调用$get()方法获取距离
  let {result} = await $get('https://apis.map.qq.com/ws/distance/v1/', {
    mdoe: 'driving',
    from: $parseVars2Str(fromLocation.lat, fromLocation.lng),
    to,
    key: MAP_KEY,
  })
  // console.log(JSON.stringify(distance.result.elements))
  //转换为距离集合
  let distanceList = result.elements.map(r => r.distance)
  return distanceList
}