import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { ProductReducers, ProductDetailsReducer } from './resources/reducers/ProductReducers';
import { CartReducer } from "./resources/reducers/CartReducers";
import {  UserLoginReducers, UserRegisterReducers, UserDetailsReducers, UserUpdateReducers } from './resources/reducers/UserReducers'
import {
    orderCreateReducer,
    orderDetailsReducer,
    orderListMyReducer,
    orderToPayReducer
} from "./resources/reducers/OrderReducers";

const cartItemsFromStorage = localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : []

const userInfoFromStorage = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null

const shippingAddressFromStorage = localStorage.getItem("shippingAddress")
    ? JSON.parse(localStorage.getItem("shippingAddress"))
    : {}

const initialState = {
    cart: {
        cartItems : cartItemsFromStorage,
        shippingAddress: shippingAddressFromStorage
    },
    userLogin: { userInfo: userInfoFromStorage }

};

const reducer = combineReducers({
    productList: ProductReducers,
    productDetails: ProductDetailsReducer,
    cart: CartReducer,
    userLogin: UserLoginReducers,
    userRegister: UserRegisterReducers,
    userDetails : UserDetailsReducers,
    userUpdate: UserUpdateReducers,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderToPay: orderToPayReducer,
    orderMyList: orderListMyReducer

});


const middleware = [thunk];

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;