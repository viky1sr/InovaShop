import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { PayPalButton } from 'react-paypal-button-v2'
import { useSelector, useDispatch } from 'react-redux';
import { Col, Row, Card, ListGroup } from 'react-bootstrap';
import MessageBoxComponent from '../components/MessageBoxComponent';
import { getOrderDetails, updateOrderToPay } from "../actions/OrderActions";
import LoadingBoxComponent from "../components/LoadingBoxComponent";
import {ORDER_PAY_RESET} from "../constants/OrderConstants";
import ShippingOrderPartial from "./partials/order/ShippingOrderPartial";
import OrderItemPartial from "./partials/order/OrderItemPartial";

const OrderScreen = ({ match, history }) => {
    const dispatch = useDispatch();

    const [ sdkReady, setSdkReady ] = useState(false)

    const orderId = match.params.id

    const orderDetails = useSelector((state) => state.orderDetails)
    const { order, loading, error } = orderDetails ;

    const orderToPay = useSelector((state) => state.orderToPay);
    const { loading: loadingPay, success: successPay } = orderToPay ;

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    if (!loading) {
        const addDecimal = (num) => {
            return (Math.round(num * 100) / 100).toFixed(2)
        }

        order.itemsPrice = addDecimal(
            order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
        )
    }

    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        }

        const addPayPalScript = async () => {
            const {data: clientId} = await axios.get('/api/v1/config/paypal');
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}` ;
            script.async = true ;
            script.onload = () => {
                setSdkReady(true)
            }
            document.body.appendChild(script)
        }

        if (!order || successPay || order._id !== orderId) {
            dispatch({ type: ORDER_PAY_RESET })
            dispatch(getOrderDetails(orderId))
        } else if (!order.isPaid) {
            if (!window.paypal) {
                addPayPalScript()
            } else {
                setSdkReady(true)
            }
        }
    }, [dispatch, orderId, successPay, order])


    const successPaymentHandler = (paymentResult) => {
        console.log(paymentResult)
        dispatch(updateOrderToPay(orderId, paymentResult))
    }

    return (
       loading ? <LoadingBoxComponent /> : error ?
           <MessageBoxComponent variant='danger'>{error}</MessageBoxComponent> :
           <>
               <h1>Order {orderId._id}</h1>
               <Row>
                   <Col md={8}>
                      <ShippingOrderPartial />

                      <OrderItemPartial />

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
                               {!order.isPaid && (
                                   <ListGroup.Item>
                                       {loadingPay && <LoadingBoxComponent />}
                                       {!sdkReady ?  <LoadingBoxComponent /> : (
                                           <PayPalButton amount={order.totalPrice} onSuccess={successPaymentHandler} />
                                       )}
                                   </ListGroup.Item>
                               )}
                           </ListGroup>
                       </Card>
                   </Col>
               </Row>
           </>
    );
}

export default OrderScreen;