import { useState } from "react";
import { Container, Navbar, Row, Col } from "react-bootstrap";
import AddQuote from "./components/AddQuote";
import QuotesList from "./components/QuotesList";
import RndQuote from "./components/RndQuote";
import QuoteDataService from "./services/quote.services";

function App() {
  const [quotes, setQuotes] = useState([]);

  const getAllHandler  = async () => {
    const data = await QuoteDataService.getAllQuotes();
    setQuotes(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };
  
  return (
    <>
      <Navbar bg="light" variant="light" className="header" style ={{ width: "100%"}}>
        <Container>
          <Navbar.Brand href="#home">Quotes App</Navbar.Brand>
        </Container>
      </Navbar>

      <Container>
        <Row>
          <Col>
            <AddQuote getAllHandler={getAllHandler}/>
          </Col>
        </Row>
      </Container>
      <Container>
        <Row>
          <Col>
            <RndQuote getAllHandler={getAllHandler}/>
            <QuotesList quotes={quotes} getAllHandler={getAllHandler}/>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
