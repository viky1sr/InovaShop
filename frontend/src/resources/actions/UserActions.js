import {USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT} from "../constants/UserConstants";
import axios from 'axios';
import {PRODUCT_LIST_FAILS} from "../constants/ProductConstants";

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
}