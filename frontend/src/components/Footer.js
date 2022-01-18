import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <footer>
      <Container>
        {/* <Row>
          {userInfo && !userInfo.isAdmin && <ChatBox userInfo={userInfo} />}
        </Row> */}
        <Row>
          <a
            href="https://www.facebook.com/messages/t/108168894747323"
            target="_blank"
          >
            <i className="fab fa-facebook-messenger chatbox-icon"></i>
          </a>
        </Row>

        <Row>
          <Col className="text-center py-3">Copyright &copy; ProShop</Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
