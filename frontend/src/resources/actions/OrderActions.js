import axios from "axios";
import {
    ORDER_CREATE_FAIL,
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_DETAILS_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS, ORDER_LIST_MY_FAIL,
    ORDER_LIST_MY_REQUEST, ORDER_LIST_MY_SUCCESS,
    ORDER_PAY_FAIL,
    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS
} from "../constants/OrderConstants";
import {logout} from "./UserActions";

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
            type: ORDER_DETAILS_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.data.token}`,
            },
        }

        const { data } = await axios.get(`/api/v1/orders/${id}`, config)

        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data,
        })
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: message,
        })
    }
}

export const updateOrderToPay = (orderId, paymentResult) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_PAY_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        console.log(userInfo.token);

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.data.token}`,
            },
        }

        const { data } = await axios.put(`/api/v1/orders/${orderId}/pay`, paymentResult, config )

        dispatch({
            type: ORDER_PAY_SUCCESS,
            payload: data,
        })
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }
        dispatch({
            type: ORDER_PAY_FAIL,
            payload: message,
        })
    }
}

export const listMyOrders = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_LIST_MY_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        console.log(userInfo.token);

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.data.token}`,
            },
        }

        const { data } = await axios.get(`/api/v1/orders/myorders`, config )

        dispatch({
            type: ORDER_LIST_MY_SUCCESS,
            payload: data,
        })
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }
        dispatch({
            type: ORDER_LIST_MY_FAIL,
            payload: message,
        })
    }
}