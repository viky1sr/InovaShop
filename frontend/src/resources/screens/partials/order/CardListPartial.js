import React from 'react';
import {Card, Col, ListGroup, Row} from "react-bootstrap";
import LoadingBoxComponent from "../../../components/LoadingBoxComponent";
import { PayPalButton } from "react-paypal-button-v2";
import { useSelector,useDispatch } from 'react-redux';
import { updateOrderToPay } from "../../../actions/OrderActions";

const CardListPartial = () => {
    const dispatch = useDispatch();

    const [ sdkReady ] = useState(false);

    const orderId = match.params.id

    const orderDetails = useSelector((state) => state.orderDetails)
    const { order } = orderDetails ;

    const orderToPay = useSelector((state) => state.orderToPay);
    const { loading: loadingPay } = orderToPay ;

    const successPaymentHandler = (paymentResult) => {
        console.log(paymentResult)
        dispatch(updateOrderToPay(orderId, paymentResult))
    }


    return (
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
    );
}

export default CardListPartial;