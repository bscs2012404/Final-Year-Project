import axiosInterceptor from "../../services/axiosInterceptor";
import { message } from "antd";



export const getAllPosts = () => {
    return async (dispatch) => {
      dispatch({
        type: "SET_LOADING",
        loading: true,
      });
  
      return await axiosInterceptor
        .get("/v1/posts")
        .then((response) => {
            return response?.data
        })
        .catch((e) => {
          console.log(e.response.data.message, "error");
          dispatch({
            type: "SET_LOADING",
            loading: false,
          });
          message.error(e.response.data.message);
          return false;
        });
    };
  };


export const getAllUserPosts = (id) => {
    return async (dispatch) => {
      dispatch({
        type: "SET_LOADING",
        loading: true,
      });
  
      return await axiosInterceptor
        .get(`/v1/posts/user/${id}`)
        .then((response) => {
            return response?.data
        })
        .catch((e) => {
          console.log(e.response.data.message, "error");
          dispatch({
            type: "SET_LOADING",
            loading: false,
          });
          message.error(e.response.data.message);
          return false;
        });
    };
  };

export const deletePost = (id) => {
    return async (dispatch) => {
      dispatch({
        type: "SET_LOADING",
        loading: true,
      });
  
      return await axiosInterceptor
        .delete(`/v1/posts/${id}`)
        .then((response) => {
            message.success('Post deleted')
            return response?.data
        })
        .catch((e) => {
          console.log(e.response.data.message, "error");
          dispatch({
            type: "SET_LOADING",
            loading: false,
          });
          message.error(e.response.data.message);
          return false;
        });
    };
  };

export const createPost = (payload) => {
    return async (dispatch) => {
      dispatch({
        type: "SET_LOADING",
        loading: true,
      });
  
      return await axiosInterceptor
        .post(`/v1/posts`, payload)
        .then((response) => {
            message.success('Post created')
            return response?.data
        })
        .catch((e) => {
          console.log(e.response.data.message, "error");
          dispatch({
            type: "SET_LOADING",
            loading: false,
          });
          message.error(e.response.data.message);
          return false;
        });
    };
  };

export const likePost = (id) => {
    return async (dispatch) => {
      dispatch({
        type: "SET_LOADING",
        loading: true,
      });
  
      return await axiosInterceptor
        .post(`/v1/posts/${id}/like`)
        .then((response) => {
            return response?.data
        })
        .catch((e) => {
          console.log(e.response.data.message, "error");
          dispatch({
            type: "SET_LOADING",
            loading: false,
          });
          message.error(e.response.data.message);
          return false;
        });
    };
  };

export const createComment = (id, payload) => {
    return async (dispatch) => {
      dispatch({
        type: "SET_LOADING",
        loading: true,
      });
  
      return await axiosInterceptor
        .post(`/v1/posts/${id}/comment`, payload)
        .then((response) => {
            return response?.data
        })
        .catch((e) => {
          console.log(e.response.data.message, "error");
          dispatch({
            type: "SET_LOADING",
            loading: false,
          });
          message.error(e.response.data.message);
          return false;
        });
    };
  };


 
