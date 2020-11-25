import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Nav } from "react-bootstrap";

const CartPartialComponent = () => {

    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;

    return (
        <LinkContainer to="/cart">
            <Nav.Link>
                <i className="fas fa-shopping-cart" />
                Cart
                {cartItems.length > 0 && (
                    <span className="badge">
                        {cartItems.length}
                    </span>
                )}
            </Nav.Link>
        </LinkContainer>
    );
}

export default CartPartialComponent;