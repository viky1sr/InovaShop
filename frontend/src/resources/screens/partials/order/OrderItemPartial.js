import React from 'react';
import { Link } from 'react-router-dom';
import {Col, Image, ListGroup, Row} from "react-bootstrap";
import { useSelector } from 'react-redux';
import MessageBoxComponent from "../../../components/MessageBoxComponent";

const OrderItemPartial = () => {

    const orderDetails = useSelector((state) => state.orderDetails)
    const { order } = orderDetails ;

    const addDecimal = (num) => {
        return (Math.round(num * 100) / 100).toFixed(2)
    }

    return (
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
    );
}

export default OrderItemPartial;