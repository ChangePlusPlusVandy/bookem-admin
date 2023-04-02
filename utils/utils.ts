export const convertToDate = (str: string) => {
  if (str === '') return str;
  const date = new Date(str);
  return date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear();
};

export const getTime = (str: string) => {
  const date = new Date(str);
  var ampm: String = 'AM';
  var hours: Number;

  if (date.getHours() == 0) {
    hours = 12;
  } else {
    if (date.getHours() > 12) {
      ampm = 'PM';
      hours = date.getHours() - 12;
    } else {
      hours = date.getHours();
    }
  }

  const minuteStr = String(date.getMinutes()).padStart(2, '0');

  return hours + ':' + minuteStr + ' ' + ampm;
};
