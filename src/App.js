import { useState } from "react";
import { Navbar, Nav, Container, Row, Col } from "react-bootstrap";
import AddQuote from "./components/AddQuote";
import RndQuote from "./components/RndQuote";
import QuotesList from "./components/QuotesList";
import QuoteDataService from "./services/quote.services";

function App() {
  const [width, setWidth] = useState(window.innerWidth);
  const [quotes, setQuotes] = useState([]);
  const [rndQuotes, setRndQuotes] = useState([]);

  function handleResize() {
    setWidth(window.innerWidth);
  }
  window.addEventListener("resize", handleResize);

  async function getQuotes() {
    const data = await QuoteDataService.getAllQuotes();
    setQuotes(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  }

  async function getRndQuotes() {
    const data = await fetch("https://type.fit/api/quotes").then((response) =>
      response.json()
    );
    setRndQuotes(data);
    //console.log("dt:" + data);
    //console.log("set:" + rndQuotes);
  }

  return (
    <>
      <Navbar>
        <Navbar.Brand>Quotes App</Navbar.Brand>
      </Navbar>
      <Container>
        <Row className="g-2">
          <Col>
            <AddQuote getQuotes={getQuotes} />
          </Col>
          <Col>
            {width > 500 ? (
              <RndQuote
                rndQuotes={rndQuotes}
                getRndQuotes={getRndQuotes}
                getQuotes={getQuotes}
              />
            ) : null}
          </Col>
        </Row>
     
        <QuotesList quotes={quotes} getQuotes={getQuotes} />
      </Container>
    </>
  );
}

export default App;
