const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime
}

// 第三种导出方式
//获取wxml文件中传来的data-xx的数据
export function $attr(e, key) {
  return e.currentTarget.dataset[key]
}

export function repairZero(val) {
  val = val + "";
  return val.length < 2 ? ('0' + val) : val;
}

export function $parseVars2Str(...args) {
  // return Array.prototype.join.call(arguments , ',');
  return args.join(",")
}
