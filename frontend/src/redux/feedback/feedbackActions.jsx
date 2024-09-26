import axiosInterceptor from "../../services/axiosInterceptor";
import { message } from "antd";

export const getFeedbacks = () => {
    return async (dispatch) => {
      dispatch({
        type: "SET_LOADING",
        loading: true,
      });
  
      return await axiosInterceptor
        .get("/v1/feedback")
        .then((response) => {
          console.log(response.data);
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

export const createFeedback = (feedback) => {
    return async (dispatch) => {
      dispatch({
        type: "SET_LOADING",
        loading: true,
      });
  
      return await axiosInterceptor
        .post("/v1/feedback", feedback)
        .then((response) => {
          console.log(response.data);
            message.success('Feedback submitted')
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
