import { useState } from "react";
import { Container, Navbar, Row, Col } from "react-bootstrap";
import QuotesList from "./components/QuotesList";
import TopPage from "./components/TopPage";
import QuoteDataService from "./services/quote.services";


function App() {
  const [quotes, setQuotes] = useState([]);

  console.log("render")

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

      <TopPage getQuotes={getQuotes}/>
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
