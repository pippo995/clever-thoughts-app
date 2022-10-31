import { useState } from "react";
import { Container, Navbar, Row, Col } from "react-bootstrap";
import AddBook from "./components/AddBook";
import BooksList from "./components/BooksList";
import RndQuote from "./components/RndQuote";
import BookDataService from "./services/book.services";
import "./App.css";

function App() {
  const [books, setBooks] = useState([]);

  const getAllHandler  = async () => {
    const data = await BookDataService.getAllBooks();
    setBooks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
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
            <AddBook getAllHandler={getAllHandler}/>
          </Col>
        </Row>
      </Container>
      <Container>
        <Row>
          <Col>
            <RndQuote getAllHandler={getAllHandler}/>
            <BooksList books={books} getAllHandler={getAllHandler}/>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
