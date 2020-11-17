import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import MessageBoxComponent from '../components/MessageBoxComponent';
import LoadingBoxComponent from '../components/LoadingBoxComponent';
import FormContainerComponent from "../components/FormContainerComponent";
import {login} from "../actions/UserActions";
import LoginScreen from "./LoginScreen";
import { saveShippingAddress } from '../actions/cartActions';
import CheckOutComponent from "../components/CheckOutComponent";

const ShippingScreen = ({ history, location}) => {
    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    const dispatch = useDispatch();

    const [address, setAddress] = useState(shippingAddress.address);
    const [city, setCity] = useState(shippingAddress.city);
    const [zipCode, setZipCode] = useState(shippingAddress.zipCode);
    const [country, setCountry] = useState(shippingAddress.country);

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({
            address, city, country, zipCode
        }));
        history.push('/payment')
    }

    return (
            <FormContainerComponent>
                <CheckOutComponent step1 step2 />
                <h1>Shipping</h1>
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='address'>
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Enter address'
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId='city'>
                        <Form.Label>City</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Enter city'
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId='zipCode'>
                        <Form.Label>Zip Code</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Enter zip code'
                            value={zipCode}
                            onChange={(e) => setZipCode(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId='country'>
                        <Form.Label>Country</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Enter country'
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Button type='submit' variant='primary' >
                        Continue
                    </Button>

                </Form>
            </FormContainerComponent>
        );
}

export default ShippingScreen;