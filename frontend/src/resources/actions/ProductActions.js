import {
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS,
    PRODUCT_LIST_FAILS,
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS
} from "../constants/ProductConstants";
import axios from "axios";

export const listProducts = () => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_LIST_REQUEST });

        const { data } = await axios.get(`/api/v1/products`)

        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: data
        });
    } catch (e) {
        dispatch({
           type: PRODUCT_LIST_FAILS,
           payload: e.response && e.response.data.message
               ? e.response.data.message
               : e.message
        });
    }
}

export const detailsProducts = (productId) => async (dispatch) => {
    dispatch({
        type: PRODUCT_DETAILS_REQUEST, payload: productId
    });
    try {
        const { data } = await axios.get(`/api/v1/products/${productId}`);
        dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
    } catch (e) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: e.response && e.response.data.message
                ? e.response.data.message
                : e.message
        });
    }
}