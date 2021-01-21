import React, { useState, useEffect } from 'react';
import Swal from "sweetalert2";
import {toast, ToastContainer} from "react-toastify";
import LoadingBoxComponent from "../components/LoadingBoxComponent";
import MessageBoxComponent from "../components/MessageBoxComponent";
import {Button, Table, Row, Col, Modal, Form, NavDropdown} from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap';
import {deleteProduct, listProducts } from "../actions/ProductActions";
import {useDispatch, useSelector} from "react-redux";
import {PRODUCT_CREATE_RESET} from "../constants/ProductConstants";

const ProductListScreen = ({ history, onHide }) => {
    const dispatch = useDispatch();

    const productList = useSelector( state => state.productList)
    const { loading, error, products } = productList

    const productDelete = useSelector( state => state.productDelete)
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = productDelete

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    // console.log(products);

    useEffect(() => {
        dispatch({ type: PRODUCT_CREATE_RESET })

        if(!userInfo.data.isAdmin) {
            history.push(`/login`)
        }
        dispatch(listProducts())

    }, [ dispatch, history, userInfo, successDelete ]);

    const deleteHandler = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteProduct(id))
                toast('Deleted Successfully', {
                    position: "top-right",
                    type: 'success',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                });
            }
        })
    }


    return (
        <>
            <Row className="align-items-center">
                <Col>
                    <h1>Product</h1>
                </Col>
                <Col className="text-right">
                    <LinkContainer to='/product-create'>
                        <Button>
                            <i className="fas fa-plush"> Create Product</i>
                        </Button>
                    </LinkContainer>
                </Col>
            </Row>
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
            {
                loading ? <LoadingBoxComponent /> : error ? <MessageBoxComponent variant='danger'>{error}</MessageBoxComponent> :
                    (
                        <Table striped bordered hover responsive className='table-sm'>
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>NAME</th>
                                <th>PRICE</th>
                                <th>CATEGORY</th>
                                <th>BRAND</th>
                                <th>{}</th>
                            </tr>
                            </thead>
                            <tbody>
                            {products.map( item => (
                                <tr key={item._id}>
                                    <td>{item._id}</td>
                                    <td>{item.name}</td>
                                    <td>${item.price}</td>
                                    <td>{item.category}</td>
                                    <td>{item.brand}</td>
                                    <td>
                                        <LinkContainer to={`/admin/product/${item._id}/user-edit`}>
                                            <Button variant='light' className='btn btn-outline-warning btn-sm '>
                                                <i className='fas fa-edit' />
                                            </Button>
                                        </LinkContainer>
                                        <Button variant='light' className='btn btn-outline-danger btn-sm ' onClick={() => deleteHandler(item._id)}>
                                            <i className='fa fa-trash' />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                    )
            }
        </>
    );
}

export default ProductListScreen;