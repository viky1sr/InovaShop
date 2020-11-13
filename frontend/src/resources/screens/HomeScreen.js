import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import Product from '../components/ProductComponent'
import { listProducts } from "../actions/ProductActions";
import LoadingBoxComponent from "../components/LoadingBoxComponent";
import MessageBoxComponent from "../components/MessageBoxComponent";

const HomeScreen = () => {
    const dispatch = useDispatch();

    // get data from redux and passing to view
    const productList = useSelector( state => state.productList)
    const { loading, error, products } = productList

    useEffect( () => {
        dispatch(listProducts())
    },[dispatch]);

    return (
        <>
            <h1> Latest Product </h1>
            { loading ? (
                <LoadingBoxComponent />
            ) : error ? (
                <MessageBoxComponent variant="danger"> {error} </MessageBoxComponent>
            ) : (
                <Row>
                    {
                        products.map(product => (
                            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                <Product  product={product} />
                            </Col>
                        ))
                    }
                </Row>
            )}
        </>
    );
}

export default HomeScreen;