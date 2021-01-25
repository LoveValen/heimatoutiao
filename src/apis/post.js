import myaxios from '@/utils/myaxios.js';

export const postList = function (params) {
  return myaxios({
    url: '/post',
    params
  });
}