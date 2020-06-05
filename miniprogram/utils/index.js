export default function formatTime(type = 'YYYY-MM-DD', time) {
  const date = time?new Date(time):new Date()
  const year = date.getFullYear().toString();
  let month = (date.getMonth() + 1).toString();
  let day = date.getDate().toString();
  let hour = date.getHours().toString();
  let min = date.getMinutes().toString();
  let sec = date.getSeconds().toString();
  month = month.length < 2 ? '0' + month : month;
  day = day.length < 2 ? '0' + day : day;
  hour = hour.length < 2 ? '0' + hour : hour;
  min = min.length < 2 ? '0' + min : min;
  sec = sec.length < 2 ? '0' + sec : sec;
  const result = type;

  return result
  .replace('YYYY', year)
  .replace('MM', month)
  .replace('DD', day)
  .replace('hh', hour)
  .replace('mm', min)
  .replace('ss', sec)
};