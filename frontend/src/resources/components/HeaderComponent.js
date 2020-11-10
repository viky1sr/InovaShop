import React from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from "../actions/UserActions";

const HeaderComponent = () => {
    const dispatch = useDispatch();

    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    // console.log(userInfo);

    const logoutHandler = () => {
        dispatch(logout());
    }

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
                        {userInfo ? (
                            <NavDropdown title={userInfo.data.name} id='username'>
                                <LinkContainer to='/profile'>
                                    <NavDropdown.Item> Profile </NavDropdown.Item>
                                </LinkContainer>
                                <NavDropdown.Item onClick={logoutHandler}> Logout </NavDropdown.Item>
                            </NavDropdown>
                        ) : (
                            <LinkContainer to="/login">
                                <Nav.Link>
                                    <i className="fas fa-user" />
                                    Sign In
                                </Nav.Link>
                            </LinkContainer>
                        )}

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default HeaderComponent;