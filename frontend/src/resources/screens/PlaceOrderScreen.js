import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Col, Button, Row, Image, Card, ListGroup } from 'react-bootstrap';
import MessageBoxComponent from '../components/MessageBoxComponent';
import LoadingBoxComponent from '../components/LoadingBoxComponent';
import CheckOutComponent from "../components/CheckOutComponent";

const PlaceOrderScreen = ({}) => {
    // get cart
    const cart = useSelector(state => state.cart);

    // Calculate prices
    const addDecimal = (num) => {
        return (Math.round(num * 100) / 100).toFixed(2)
    }

    cart.discoundtPrice = addDecimal([]);
    cart.itemsPrice = cart.cartItems.reduce((acc, item) => acc + item.qty * item.price, 0);
    cart.shippingPrice = addDecimal(cart.itemsPrice > 100 ? 0 : 100);
    cart.taxPrice = addDecimal(Number((0.15 * cart.itemsPrice).toFixed(2)));
    cart.totalPrice = addDecimal(
        Number(cart.itemsPrice) +
        Number(cart.shippingPrice) +
        Number(cart.taxPrice)
    ) - Number(cart.discoundtPrice).toFixed(2);

    const placeOrderHandler = () => {

    }

    return (
        <>
            <CheckOutComponent step1 step2 step3 />
            <Row>
                 <Col md={8}>
                     <ListGroup variant='flush'>
                         <ListGroup.Item>
                             <h2>Shipping</h2>
                             <p>
                                 <strong>Address: </strong>
                                 {cart.shippingAddress.address}
                                 <span>, </span>
                                 {cart.shippingAddress.city}
                                 <span>, </span>
                                 {cart.shippingAddress.zipCode}
                                 <span>, </span>
                                 {cart.shippingAddress.country}
                             </p>
                         </ListGroup.Item>

                         <ListGroup.Item>
                             <h2>Payment Methode</h2>
                             <strong>Method: </strong>
                             {cart.paymentMethod}
                         </ListGroup.Item>
                     </ListGroup>

                     <ListGroup.Item>
                         <h2>Order Items</h2>
                         {cart.cartItems.length === 0 ?
                             <MessageBoxComponent> Your cart is empty</MessageBoxComponent> :
                             (
                                 <ListGroup variant='flush'>
                                     {/*Foreach in JS*/}
                                     {cart.cartItems.map((item, index) => (
                                         <ListGroup.Item key={index}>
                                             <Row>
                                                 <Col md={1}>
                                                     <Image src={item.image} alt={item.name} fluid rounded />
                                                 </Col>
                                                 <Col>
                                                     <Link to={`/product/${item.product}`}>
                                                         {item.name}
                                                     </Link>
                                                 </Col>
                                                 <Col md={4}>
                                                     {item.qty} x ${item.price} = ${addDecimal(item.qty * item.price)}
                                                 </Col>
                                             </Row>
                                         </ListGroup.Item>
                                     ))}
                                 </ListGroup>
                             )
                         }
                     </ListGroup.Item>
                 </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Items</Col>
                                    <Col>${cart.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Discount</Col>
                                    <Col>${cart.discoundtPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping</Col>
                                    <Col>${cart.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax</Col>
                                    <Col>${cart.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total</Col>
                                    <Col>${cart.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button
                                    type="button"
                                    className='btn-block'
                                    disabled={cart.cartItems === 0}
                                    onClick={placeOrderHandler}>
                                    Place Order
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    );
}

export default PlaceOrderScreen;