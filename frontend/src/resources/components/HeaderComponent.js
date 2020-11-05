import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector } from 'react-redux';

const HeaderComponent = () => {
    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;
    return (
        <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect >
            <Container>
                <LinkContainer to='/'>
                    <Navbar.Brand>InovaShop</Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
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
                        <LinkContainer to="/login">
                            <Nav.Link>
                                <i className="fas fa-user" />
                                Sign In
                            </Nav.Link>
                        </LinkContainer>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default HeaderComponent;