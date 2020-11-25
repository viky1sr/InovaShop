import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector } from 'react-redux';
import CartPartialComponent from "./partials/header/CartPartialComponent";
import DropDownPartialComponent from "./partials/header/DropDownPartialComponent";
import SigInPartialComponent from "./partials/header/SigInPartialComponent";

const HeaderComponent = () => {
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    return (
        <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect >
            <Container>
                <LinkContainer to='/'>
                    <Navbar.Brand>InovaShop</Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                       <CartPartialComponent />
                        {userInfo ? ( <DropDownPartialComponent /> ) : (<SigInPartialComponent />)}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default HeaderComponent;