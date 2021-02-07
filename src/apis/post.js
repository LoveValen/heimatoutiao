import myaxios from '@/utils/myaxios.js';

export const postList = function (params) {
  return myaxios({
    url: '/post',
    params
  });
};

// 获取文章详情
export const getArticleDetail = function (id) {
  return myaxios({
    url: '/post/' + id
  });
};

// 文章点赞
export const like = function (id) {
  return myaxios({
    url: '/post_like/' + id
  });
};

// 文章收藏
export const star = function (id) {
  return myaxios({
    url: '/post_star/' + id
  });
};

// 文章评论
export const comment = function (id) {
  return myaxios({
    url: '/post_comment/' + id
  });
};

// 发表评论
export const publishcomment = function (id, data) {
  return myaxios({
    method: 'post',
    url: '/post_comment/' + id,
    data
  });
};

// 文章搜索
export const postSearch = function (params) {
  return myaxios({ 
    url: `/post_search`,
    params
  });
};

// 搜索推荐
export const postRecommend = function (params) {
  return myaxios({
    url: '/post_search_recommend',
    params
  });
};


