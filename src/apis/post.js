import myaxios from '@/utils/myaxios.js';

export const columnList = function () {
  return myaxios({
    url: '/category'
  });
}

export const postList = function (id) {
  return myaxios({
    url: '/post?category=' + id
  });
}