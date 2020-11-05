import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { ProductReducers, ProductDetailsReducer } from './resources/reducers/ProductReducers';
import { CartReducer } from "./resources/reducers/CartReducers";

const initialState = {
    cart: {
        cartItems: localStorage.getItem("cartItems")
            ? JSON.parse(localStorage.getItem("cartItems"))
            : [] ,
    }
};

const reducer = combineReducers({
    productList: ProductReducers,
    productDetails: ProductDetailsReducer,
    cart: CartReducer
});


const middleware = [thunk];

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;