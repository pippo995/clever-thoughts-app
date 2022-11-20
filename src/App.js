import { useState, useEffect } from "react";
import { Navbar, Container, Row, Col, Button } from "react-bootstrap";
import AddQuote from "./components/AddQuote";
import RndQuote from "./components/RndQuote";
import QuotesList from "./components/QuotesList";
import QuoteDataService from "./services/quote.services";
import "./style.css";

function App() {
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    fetchQuotes();
  }, []);

  async function fetchQuotes() {
    const data = await QuoteDataService.getAllQuotes();
    setQuotes(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  }

  return (
    <>
      <Navbar variant="light" bg="light">
        <Container>
          <Navbar.Brand>Quotes App</Navbar.Brand>
        </Container>
      </Navbar>
      <Container>
        <Row className="g-2 mt-2 mb-3">
          <Col>
            <AddQuote fetchQuotes={fetchQuotes} />
          </Col>
          <Col className="d-none d-md-block">
            <RndQuote fetchQuotes={fetchQuotes} />
          </Col>
        </Row>

        <QuotesList quotes={quotes} fetchQuotes={fetchQuotes} />
        <Button
          onClick={() => {
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
          }}
          size="sm"
          variant="success"
          style={{
            position: "fixed",
            padding: "1rem 1rem",
            bottom: "5px",
            left: "5px",
            textAlign: "center",
          }}
        >
          Up
        </Button>
      </Container>
    </>
  );
}

export default App;
