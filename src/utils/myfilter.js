import moment from 'moment';

const dateFormat = function (data, sep = '-') {
  return moment(data).format(`YYYY${sep}MM${sep}DD`);
}

export default dateFormat;