import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import FormContainerComponent from "../../../components/FormContainerComponent";
import {toast, ToastContainer} from "react-toastify";
import MessageBoxComponent from "../../../components/MessageBoxComponent";
import LoadingBoxComponent from "../../../components/LoadingBoxComponent";
import {Button, Col, Form, Row} from "react-bootstrap";
import {register} from "../../../actions/UserActions";
import {createProduct, listProducts} from "../../../actions/ProductActions";
import {PRODUCT_CREATE_RESET} from "../../../constants/ProductConstants";
import {Link} from "react-router-dom";


const ProductCreate = ({history}) => {
    const dispatch = useDispatch();

    const [ name, setName ] = useState('');
    const [ price, setPrice ] = useState('');
    const [ image, setImage ] = useState('');
    const [ brand, setBrand ] = useState('');
    const [ category, setCategory ] = useState('');
    const [ countInStock, setCountInStock ] = useState('');
    const [ numReviews, setNumReviews ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ message ] = useState(null);

    const productCreate = useSelector( state => state.productCreate)
    const { loading: loadingCreate, error: errorCreate, success: successCreate, product: createdProduct } = productCreate


    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        dispatch({ type: PRODUCT_CREATE_RESET })

        if(!userInfo.data.isAdmin) {
            history.push(`/login`)
        }

        if(successCreate) {
            history.push(`/admin/product/${createdProduct._id}/edit`)
        }else {
            dispatch(listProducts())
        }

    }, [ dispatch, history, userInfo, successCreate, createdProduct ]);

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(createProduct(
            name,
            price,
            image,
            brand,
            category,
            countInStock,
            numReviews,
            description,))
    }

    if(successCreate === true ) {
        toast('Register Successfully', {
            position: "top-right",
            type: 'success',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }

    return (
        <>
            <Link className="btn btn-light my-3" to="/admin/product-list">
                Go Back
            </Link>

            <FormContainerComponent>
                <ToastContainer
                    position="top-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover={false}
                />
                <h1>Create Product</h1>
                {message && <MessageBoxComponent variant='danger'>{message}</MessageBoxComponent>}
                {errorCreate && <MessageBoxComponent variant='danger'>{errorCreate}</MessageBoxComponent>}
                {loadingCreate && <LoadingBoxComponent />}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='name'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type='name'
                            placeholder='Enter name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId='price'>
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                            type='price'
                            placeholder='Enter price'
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId='brand'>
                        <Form.Label>Brand</Form.Label>
                        <Form.Control
                            type='brand'
                            placeholder='Enter brand'
                            value={brand}
                            onChange={(e) => setBrand(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId='category'>
                        <Form.Label>Category</Form.Label>
                        <Form.Control
                            type='category'
                            placeholder='Enter category'
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        />
                    </Form.Group>

                    <Button type='submit'  variant='primary'>
                        Update
                    </Button>
                </Form>
            </FormContainerComponent>
        </>
    );
}

export default ProductCreate;