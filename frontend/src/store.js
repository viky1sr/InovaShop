import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { ProductReducers, ProductDetailsReducer } from './resources/reducers/ProductReducers';

const reducer = combineReducers({
    productList: ProductReducers,
    productDetails: ProductDetailsReducer
});

const initialState ={};

const middleware = [thunk];

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;