import React from 'react';
import { ListGroup } from "react-bootstrap";
import MessageBoxComponent from "../../../components/MessageBoxComponent";
import { useSelector } from 'react-redux';
import { formatToTimeZone } from "date-fns-timezone";

const ShippingOrderPartial = () => {

    const orderDetails = useSelector((state) => state.orderDetails)
    const { order } = orderDetails ;

    const timeZone = 'Asia/Jakarta' ;

    return (
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
                        <MessageBoxComponent variant='success'>Paid on { formatToTimeZone(new Date(order.paidAt), 'D MMMM YYYY hh:mm a', {timeZone}) }</MessageBoxComponent>
                    ) :
                    (
                        <MessageBoxComponent variant='danger'>Not Paid</MessageBoxComponent>
                    )
                }
            </ListGroup.Item>
        </ListGroup>
    );
}

export default ShippingOrderPartial;