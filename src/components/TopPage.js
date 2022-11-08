import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import AddQuote from "./AddQuote";
import RndQuote from "./RndQuote";

function TopPage({ getQuotes }) {
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
            <AddQuote getQuotes={getQuotes} />
          </Col>
          {width > 500 ? (
            <Col>
              <RndQuote getQuotes={getQuotes} />
            </Col>
          ) : null}
        </Row>
      </Container>
    </>
  );
}

export default TopPage;
