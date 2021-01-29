import moment from 'moment';

export const dateFormat = function (data, sep = '-') {
  return moment(data).format(`YYYY${sep}MM${sep}DD`);
}

export const offsetTimeFormat = function (data) {
  return moment(data).locale('zh-cn').fromNow();
}

// export default dateFormat;