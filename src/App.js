import { useState, useEffect } from "react";
import { Navbar, Container, Row, Col } from "react-bootstrap";
import AddQuote from "./components/AddQuote";
import RndQuote from "./components/RndQuote";
import QuotesList from "./components/QuotesList";
import QuoteDataService from "./services/quote.services";

function App() {
  const [quotes, setQuotes] = useState([]);
  const [rndQuotes, setRndQuotes] = useState([]);

  useEffect( () => { 
    fetchQuotes();
    fetchRndQuotes();
  }, [])

  async function fetchQuotes() {
    const data = await QuoteDataService.getAllQuotes();
    setQuotes(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  }

  async function fetchRndQuotes() {
    const data = await fetch("https://type.fit/api/quotes").then((response) =>
      response.json()
    );
    setRndQuotes(data);
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
          <Col className="d-none d-sm-block">
            <RndQuote
              rndQuotes={rndQuotes}
              fetchRndQuotes={fetchRndQuotes}
              fetchQuotes={fetchQuotes}
            />
          </Col>
        </Row>

        <QuotesList quotes={quotes} fetchQuotes={fetchQuotes} />
      </Container>
    </>
  );
}

export default App;
