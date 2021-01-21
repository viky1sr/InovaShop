import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap';
import Rating from '../components/RatingComponent';
import { detailsProducts } from "../actions/ProductActions";
import {useSelector,useDispatch} from "react-redux";
import LoadingBoxComponent from "../components/LoadingBoxComponent";
import MessageBoxComponent from "../components/MessageBoxComponent";

const ProductScreen = ({ match, history }) => {
    const dispatch = useDispatch();

    const [ qty, setQty ] = useState(1);

    // name @state.productDetails harus sama di store.js
    const productDetails = useSelector( state => state.productDetails)
    // get data from redux and passing to view
    const { loading, error, product } = productDetails

    const productDelete = useSelector(state => state.productDelete)
    const { loading: loadingDelete, error: errorDelete, success: successDElete } = productDelete

    useEffect( () => {
        dispatch(detailsProducts(match.params.id))
    },[dispatch,match]);

    const addToCartHandler = () => {
        history.push(`/cart/${match.params.id}?qty=${qty}`);
    }

    const deleteHandler = (id) => {
        dispatch(deleteHandler(id))
        
    }

    return (
            <>
                <Link className="btn btn-light my-3" to='/'>
                    Go Back
                </Link>
                { loading ? (
                    <LoadingBoxComponent />
                    ) : error ? (
                    <MessageBoxComponent variant="danger"> {error} </MessageBoxComponent>
                ) : (
                    <Row>
                        <Col md={6}>
                            <Image src={product.image} alt={product.name} fluid />
                        </Col>
                        <Col md={3}>
                            <ListGroup variant='flush' >
                                <ListGroup.Item className="Item">
                                    <h3>{product.name}</h3>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    Price: ${product.price}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    Description: {product.description}
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                        <Col md={3}>
                            <Card>
                                <ListGroup variant='flush'>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Price</Col>
                                            <Col>
                                                <strong>${product.price}</strong>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                </ListGroup>
                                <ListGroup variant='flush'>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Status</Col>
                                            <Col>
                                                {product.countInStock > 0 ?
                                                    <span className="text-success">In Stock</span> :
                                                    <span className="text-danger">Out Of Stock</span>
                                                }
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                    {product.countInStock > 0 && (
                                     <ListGroup.Item>
                                         <Row>
                                             <Col>Qty</Col>
                                             <Col>
                                                 <Form.Control as='select' value={qty} onChange={(e) =>
                                                     setQty(e.target.value)
                                                 }>
                                                     {[...Array(product.countInStock).keys()].map(
                                                         (x) => (
                                                             <option key={ x + 1} value={ x + 1 }>
                                                                 { x + 1}
                                                             </option>
                                                         )
                                                     )}
                                                 </Form.Control>
                                             </Col>
                                         </Row>
                                     </ListGroup.Item>
                                    )}
                                    <ListGroup.Item>
                                        <Button onClick={addToCartHandler} className="btn-block" type="button" disabled={product.countInStock ===0}>
                                            Add to cart
                                        </Button>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>
                )}
            </>
    );
}

export default ProductScreen;