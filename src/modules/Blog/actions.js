import { SET_BLOG_ID, VIEW_ALL_BLOG_FAIL, VIEW_ALL_BLOG_REQUESTED, VIEW_ALL_BLOG_SUCCESS } from './types';

export const viewAllBlogRequest = (data) => ({
  type: VIEW_ALL_BLOG_REQUESTED,
  data
});

export const viewAllBlogSuccess = data => ({
  type: VIEW_ALL_BLOG_SUCCESS,
  data,
});

export const viewAllBlogFail = () => ({
  type: VIEW_ALL_BLOG_FAIL,
});

export const setBlogId = data => ({
  type: SET_BLOG_ID,
  data,
});