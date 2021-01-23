import myaxios from '@/utils/myaxios.js';

export const uploadFile = function (data) {
  return myaxios({
    method: 'post',
    url: '/upload',
    data
  });
};