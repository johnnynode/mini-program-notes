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

// 处理时分
const getHourAndMinutes = timeStamp => {
  let t = new Date(timeStamp)
  let h = t.getHours()
  let m = t.getMinutes()
  if(h < 10) {
    h = '0' + h
  }
  if(m < 10) {
    m = '0' + m
  }
  return h + ':' + m
}

module.exports = {
  formatTime: formatTime,
  getHourAndMinutes: getHourAndMinutes
}