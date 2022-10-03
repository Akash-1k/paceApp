import {
  SET_BLOG_ID, VIEW_ALL_BLOG_FAIL, VIEW_ALL_BLOG_REQUESTED, VIEW_ALL_BLOG_SUCCESS
} from './types';

const INITIAL_STATE = {

  viewAllBlogList: [],
  blogId: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case VIEW_ALL_BLOG_REQUESTED:
      return {
        ...state,
      };

    case VIEW_ALL_BLOG_SUCCESS:
      return {
        ...state,
        viewAllBlogList: action.data,
      };

    case VIEW_ALL_BLOG_FAIL:
      return {
        ...state,
      };

    case SET_BLOG_ID:
      return {
        ...state,
        blogId: action.data,
      };

    default:
      return state;
  }
};
