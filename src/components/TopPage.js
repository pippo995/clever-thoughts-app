import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import AddQuote from "./AddQuote";
import RndQuote from "./RndQuote";

function TopPage({ getAllHandler }) {
  const [width, setWidth] = useState(window.innerWidth);

  function handleResize() {
    setWidth(window.innerWidth);
  }

  window.addEventListener("resize", handleResize);

  return (
    <>
      <Container>
        <Row>
          <Col>
            <AddQuote getAllHandler={getAllHandler} />
          </Col>
          {width > 500 ? (
            <Col>
              <RndQuote getAllHandler={getAllHandler} />
            </Col>
          ) : null}
        </Row>
      </Container>
    </>
  );
}

export default TopPage;
