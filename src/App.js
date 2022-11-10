import { useState } from "react";
import { Navbar, Container, Row, Col } from "react-bootstrap";
import AddQuote from "./components/AddQuote";
import RndQuote from "./components/RndQuote";
import QuotesList from "./components/QuotesList";
import QuoteDataService from "./services/quote.services";

function App() {
  const [width, setWidth] = useState(window.innerWidth);  
  const [quotes, setQuotes] = useState([]);

  function handleResize() {
    setWidth(window.innerWidth);
  }

  window.addEventListener("resize", handleResize);

  const getQuotes  = async () => {
    console.log("getQuotes")

    const data = await QuoteDataService.getAllQuotes();
    setQuotes(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };
  
  return (
    <>
      <Navbar bg="light" variant="light" className="header" style ={{ width: "100%"}}>
        <Container>
          <Navbar.Brand>Quotes App</Navbar.Brand>
        </Container>
      </Navbar>

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
      <Container>
        <Row>
          <Col>            
            <QuotesList quotes={quotes} getQuotes={getQuotes}/>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
