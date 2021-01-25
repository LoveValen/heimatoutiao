import myaxios from '@/utils/myaxios.js';

export const columnList = function () {
  return myaxios({
    url: '/category'
  });
}