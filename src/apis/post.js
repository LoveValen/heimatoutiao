import myaxios from '@/utils/myaxios.js';

export const postList = function (params) {
  return myaxios({
    url: '/post',
    params
  });
}

export const getArticleDetail = function (id) {
  return myaxios({
    url: '/post/' + id
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

export const like = function (id) {
  return myaxios({
    url: '/post_like/' + id
  });
}


