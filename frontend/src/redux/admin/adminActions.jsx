import axios from "axios";
import axiosInterceptor from "../../services/axiosInterceptor";
import { message } from "antd";
import { store } from "../store";

export const getUsers = () => {
    return async (dispatch) => {
      dispatch({
        type: "SET_LOADING",
        loading: true,
      });
  
      return await axiosInterceptor
        .get("/v1/users?limit=5000")
        .then((response) => {
          console.log(response.data);
        //   message.success("User LoggedIn Succesfully");
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

export const deleteUser = (id) => {
    return async (dispatch) => {
      dispatch({
        type: "SET_LOADING",
        loading: true,
      });
  
      return await axiosInterceptor
        .delete(`/v1/users/${id}`)
        .then((response) => {
          console.log(response.data);
          message.success("User Deleted Succesfully");
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