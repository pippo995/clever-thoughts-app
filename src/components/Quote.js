import React from "react";
import { Col, Card, Button } from "react-bootstrap";
import QuoteDataService from "../services/quote.services";

const Quote = ({ quote, fetchQuotes }) => {
  function copyHandler(quote) {
    const quoteClip = `${quote.text}\n (${quote.author})`;
    navigator.clipboard.writeText(quoteClip);
  }

  async function deleteHandler(quote) {
    await QuoteDataService.deleteQuote(quote.id);
    fetchQuotes();
  }

  return (
    <Col>
      <Card style={{ height: "100%" }}>
        <Card.Body className="d-flex flex-column">
          <p>
            <i>{quote.text}</i>
          </p>
          <h4>- {quote.author}</h4>
          <div className="mt-auto ms-auto">
            <Button size="sm" onClick={() => copyHandler(quote)}>
              Copy
            </Button>
            <Button size="sm" onClick={() => deleteHandler(quote)}>
              Delete
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Quote;
