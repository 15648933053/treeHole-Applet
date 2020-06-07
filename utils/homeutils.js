function $res(url, method) {

  return new Promise((resolve, reject) => {
    wx.request({
      url: url.startsWith("http") ? url : BasicUrl + url,
      method,
      success: (res => {
        resolve(res.data)
      }),
      fail(e) {
        reject(e)
      }
    })
  })

}

function $get(url) {
  return $res(url, 'Get')
}

function $post(url) {
  return $res(url, 'POST')
}

async function $getList(_this , url) {
  let {
    lists
  } = await $get(url);
  console.log(lists)
  _this.setData({
    lists
  })
}

export function $getListObject(_this , url){
  $getList(_this ,url)
}