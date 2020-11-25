import {
    USER_DETAILS_FAIL,
    USER_DETAILS_REQUEST, USER_DETAILS_RESET,
    USER_DETAILS_SUCCESS, USER_LIST_FAIL, USER_LIST_REQUEST, USER_LIST_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    USER_REGISTER_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS, USER_UPDATE_FAIL, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS
} from "../constants/UserConstants";
import axios from 'axios';
import {PRODUCT_LIST_FAILS} from "../constants/ProductConstants";
import {ORDER_LIST_MY_RESET} from "../constants/OrderConstants";

export const login = ( email, password) => async (dispatch) => {
    try {
        dispatch({
           type: USER_LOGIN_REQUEST
        });

        const config = {
            headers: {
                'Content-Type' : 'application/json'
            }
        }

        const { data } = await axios.post(
            `/api/v1/users/login`,
            { email, password},
            config
        );

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        });

        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (e) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: e.response && e.response.data.message
                ? e.response.data.message
                : e.message
        });
    }
}

export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo');
    dispatch({ type: USER_LOGOUT });
    dispatch({ type: USER_DETAILS_RESET });
    dispatch({ type: ORDER_LIST_MY_RESET });
}

export const register = ( name, email, password, confirm_password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_REGISTER_REQUEST
        });

        const config = {
            headers: {
                'Content-Type' : 'application/json'
            }
        }

        const { data } = await axios.post(
            `/api/v1/users/register`,
            { name, email, password, confirm_password},
            config
        );

        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data
        });

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        });

        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (e) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: e.response && e.response.data.message
                ? e.response.data.message
                : e.message
        });
    }
}

export const getUserDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_DETAILS_REQUEST
        });

        const { userLogin: { userInfo } } = getState();

        // console.log(userInfo.data.token)

        const config = {
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${userInfo.data.token}`
            }
        }

        const { data } = await axios.get(`/api/v1/users/${id}`, config );

        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data
        });

    } catch (e) {
        dispatch({
            type: USER_DETAILS_FAIL,
            payload: e.response && e.response.data.message
                ? e.response.data.message
                : e.message
        });
    }
}

export const updateUserProfile = (user) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_UPDATE_REQUEST
        });

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${userInfo.data.token}`
            }
        }

        const { data } = await axios.put(`/api/v1/users/profile`,user, config );

        dispatch({
            type: USER_UPDATE_SUCCESS,
            payload: data
        });

    } catch (e) {
        dispatch({
            type: USER_UPDATE_FAIL,
            payload: e.response && e.response.data.message
                ? e.response.data.message
                : e.message
        });
    }
}

export const listUsers = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_LIST_REQUEST
        });

        const { userLogin: { userInfo } } = getState();

        // console.log(userInfo.data.token)

        const config = {
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${userInfo.data.token}`
            }
        }

        const { data } = await axios.get(`/api/v1/users`, config );

        dispatch({
            type: USER_LIST_SUCCESS,
            payload: data
        });

    } catch (e) {
        dispatch({
            type: USER_LIST_FAIL,
            payload: e.response && e.response.data.message
                ? e.response.data.message
                : e.message
        });
    }
}
