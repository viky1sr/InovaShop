import React, { useState } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainerComponent from "../components/FormContainerComponent";
import { savePaymentMethod } from '../actions/cartActions';
import CheckOutComponent from "../components/CheckOutComponent";

const PaymentScreen = ({ history}) => {
    const cart = useSelector((state) => state.cart)
    const { shippingAddress } = cart;

    if(!shippingAddress) {
        history.push('/shipping')
    }

    const dispatch = useDispatch();

    const [paymentMethod, setPaymentMethod] = useState('PayPal');

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(
            paymentMethod
        ));
        history.push('/placeorder')
    }

    return (
        <FormContainerComponent>
            <CheckOutComponent step1 step2 step3 />
            <h1>Payment Method</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label as='legend'>
                        Select Method
                    </Form.Label>
                    <Col>
                        <Form.Check type='radio'
                                    label='PayPal or Credit Card'
                                    id='PayPal'
                                    name='paymentMethod'
                                    value='PayPal'
                                    checked
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                        <Form.Check type='radio'
                                    label='Stripe'
                                    id='Stripe'
                                    name='paymentMethod'
                                    value='Stripe'
                                    checked
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                    </Col>
                </Form.Group>

                <Button type='submit' variant='primary' >
                    Continue
                </Button>

            </Form>
        </FormContainerComponent>
    );
}

export default PaymentScreen;