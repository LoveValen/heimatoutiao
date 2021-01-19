import myaxios from '@/utils/myaxios.js';

export const userlogin = function (data) {
  return myaxios({
    method: 'post',
    url: '/login',
    data
  });
};

export const userRegister = function (data) {
  return myaxios({
    method: 'post',
    url: '/register',
    data
  });
};