import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const FooterComponent = (props) => {
    return (
        <footer>
            <Container>
                <Row>
                    <Col className="text-center py-3">
                        Copyright &copy; InovaShop
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}

export default FooterComponent;