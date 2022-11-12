import React from "react";
import { Col, Card, Button } from "react-bootstrap";
import QuoteDataService from "../services/quote.services";

const Quote = ({ quote, getQuotes }) => {
  function copyHandler(quote) {
    const quoteClip = quote.text + "\n" + "( " + quote.author + " )";
    navigator.clipboard.writeText(quoteClip);
  }

  function deleteHandler(quote) {
    QuoteDataService.deleteQuote(quote.id);
    getQuotes();
  }

  return (
    <Col>
      <Card style={{"height" : "100%"}}>
        <Card.Body>
          <p>{quote.text}</p>
          <h4>- {quote.author}</h4>
          <Button size="sm" onClick={() => copyHandler(quote)}>
            Copy
          </Button>
          <Button size="sm" onClick={() => deleteHandler(quote)}>
            Delete
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Quote;
