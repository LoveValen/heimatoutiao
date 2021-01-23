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

export const userInfo = function (id) {
  return myaxios({
    // method: 'get',
    url: `/user/${id}`,
    // headers: { 'Authorization': localStorage.getItem('token') }
  });
};

// 编辑用户信息
export const updateUserInfo = function (id, data) {
  return myaxios({
    method: 'post',
    url: `/user_update/${id}`,
    data
  });
}