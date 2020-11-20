import axios from "axios";
import {
    ORDER_CREATE_FAIL,
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS, ORDER_DETAILS_FAIL,
    ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS
} from "../constants/OrderConstants";

export const createOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_CREATE_REQUEST
        });

        const { userLogin: { userInfo } } = getState();

        // console.log(userInfo.data.token)

        const config = {
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${userInfo.data.token}`
            }
        }

        const { data } = await axios.post(`/api/v1/orders`, order, config );

        dispatch({
            type: ORDER_CREATE_SUCCESS,
            payload: data
        });

    } catch (e) {
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload: e.response && e.response.data.message
                ? e.response.data.message
                : e.message
        });
    }
}

export const getOrderDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_DETAILS_REQUEST
        });

        const { userLogin: { userInfo } } = getState();

        // console.log(userInfo.data.token)

        const config = {
            headers: {
                'Authorization' : `Bearer ${userInfo.data.token}`
            }
        }

        const { data } = await axios.get(`/api/v1/orders/${id}`, config );

        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data
        });

    } catch (e) {
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: e.response && e.response.data.message
                ? e.response.data.message
                : e.message
        });
    }
}

export const updateOrderToPay = (orderId, paymentResult) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_DETAILS_REQUEST
        });

        const { userLogin: { userInfo } } = getState();

        // console.log(userInfo.data.token)

        const config = {
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${userInfo.data.token}`
            }
        }

        const { data } = await axios.get(`/api/v1/orders/${orderId}/pay`, paymentResult, config );

        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data
        });

    } catch (e) {
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: e.response && e.response.data.message
                ? e.response.data.message
                : e.message
        });
    }
}