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

export const follows = function (id) {
  return myaxios({
    url: '/user_follows/' + id
  });
}

export const unfollows = function (id) {
  return myaxios({
    url: '/user_unfollow/' + id
  });
}

// 用户收藏列表
export const userStar = function () {
  return myaxios({
    url: '/user_star'
  });
}

// 用户关注列表
export const userFollows = function () {
  return myaxios({
    url: '/user_follows'
  });
}