import myaxios from '@/utils/myaxios.js';

export const columnList = function () {
  return myaxios({
    url: '/category'
  });
}

export const addColumnList = function (data) {
  return myaxios({
    url: '/category',
    data
  });
}

