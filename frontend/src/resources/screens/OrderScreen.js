import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Col, Button, Row, Image, Card, ListGroup } from 'react-bootstrap';
import MessageBoxComponent from '../components/MessageBoxComponent';
import { createOrder, getOrderDetails } from "../actions/OrderActions";
import LoadingBoxComponent from "../components/LoadingBoxComponent";

const OrderScreen = ({ match }) => {
    const dispatch = useDispatch();

    const orderId = match.params.id

    const orderDedtails = useSelector((state) => state.orderDedtails);
    const { order, error, loading } = orderDedtails ;

    // Calculate prices
    const addDecimal = (num) => {
        return (Math.round(num * 100) / 100).toFixed(2)
    }

    if (!loading) {
        order.itemsPrice = addDecimal(
            order.orderItems.reduce((acc, item) => acc + item.qty * item.price, 0)
        );

    }

    useEffect(() => {
        dispatch(getOrderDetails(orderId))
    }, [dispatch])

    const placeOrderHandler = () => {
        dispatch(
            createOrder({
                discountPrice: order.discountPrice,
                orderItems: order.orderItems,
                shippingAddress: order.shippingAddress,
                paymentMethod: order.paymentMethod,
                itemsPrice: order.itemsPrice,
                shippingPrice: order.shippingPrice,
                taxPrice: order.taxPrice,
                totalPrice: order.totalPrice,
            })
        )
    }

    return (
       loading ? <LoadingBoxComponent /> : error ?
           <MessageBoxComponent variant='danger'>{error}</MessageBoxComponent> :
           <>
               <h1>Order {orderId._id}</h1>
               <Row>
                   <Col md={8}>
                       <ListGroup variant='flush'>
                           <ListGroup.Item>
                               <h2>Shipping</h2>
                               <p>
                                   <strong>Name: {order.user.name}</strong>
                               </p>
                               <p>
                                  <strong>Email: <a href={`mailto:${order.user.email}`}>{order.user.email}</a> </strong>
                               </p>
                               <p>
                                   <strong>Address: </strong>
                                   {order.shippingAddress.address}
                                   <span>, </span>
                                   {order.shippingAddress.city}
                                   <span>, </span>
                                   {order.shippingAddress.zipCode}
                                   <span>, </span>
                                   {order.shippingAddress.country}
                               </p>
                               {order.isDelivered ?
                                   (
                                       <MessageBoxComponent variant='success'>Delivered on {order.paidAt}</MessageBoxComponent>
                                   ) :
                                   (
                                       <MessageBoxComponent variant='danger'>Not Delivered</MessageBoxComponent>
                                   )
                               }
                           </ListGroup.Item>

                           <ListGroup.Item>
                               <h2>Payment Methode</h2>
                               <p>
                                   <strong>Method: {order.paymentMethod}</strong>
                               </p>
                               {order.isPaid ?
                                   (
                                       <MessageBoxComponent variant='success'>Paid on {order.paidAt}</MessageBoxComponent>
                                   ) :
                                   (
                                       <MessageBoxComponent variant='danger'>Not Paid</MessageBoxComponent>
                                   )
                               }
                           </ListGroup.Item>
                       </ListGroup>

                       <ListGroup.Item>
                           <h2>Order Items</h2>
                           {order.orderItems.length === 0 ?
                               <MessageBoxComponent> Order is empty</MessageBoxComponent> :
                               (
                                   <ListGroup variant='flush'>
                                       {/*Foreach in JS*/}
                                       {order.orderItems.map((item, index) => (
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
                                       <Col>${order.itemsPrice}</Col>
                                   </Row>
                               </ListGroup.Item>
                               <ListGroup.Item>
                                   <Row>
                                       <Col>Discount</Col>
                                       <Col>${order.discountPrice}</Col>
                                   </Row>
                               </ListGroup.Item>
                               <ListGroup.Item>
                                   <Row>
                                       <Col>Shipping</Col>
                                       <Col>${order.shippingPrice}</Col>
                                   </Row>
                               </ListGroup.Item>
                               <ListGroup.Item>
                                   <Row>
                                       <Col>Tax</Col>
                                       <Col>${order.taxPrice}</Col>
                                   </Row>
                               </ListGroup.Item>
                               <ListGroup.Item>
                                   <Row>
                                       <Col>Total</Col>
                                       <Col>${order.totalPrice}</Col>
                                   </Row>
                               </ListGroup.Item>

                           </ListGroup>
                       </Card>
                   </Col>
               </Row>
           </>
    );
}

export default OrderScreen;