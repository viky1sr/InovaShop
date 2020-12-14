import React from 'react';
import {Nav} from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap';

const SigInPartialComponent = () => {
    return (
        <LinkContainer to="/login">
            <Nav.Link>
                <i className="fas fa-user" />
                Sign In
            </Nav.Link>
        </LinkContainer>
    );
}

export default SigInPartialComponent;