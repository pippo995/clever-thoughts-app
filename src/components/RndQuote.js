import React, { useState, useEffect } from "react";
import { Card, Button, ButtonGroup } from "react-bootstrap";
import QuoteDataService from "../services/quote.services";

const RndQuote = ({ fetchQuotes }) => {
  const [rndQuotes, setRndQuotes] = useState([]);
  const [rndQuote, setRndQuote] = useState({});

  useEffect(() => {
    fetchRndQuotes();
  }, []);

  async function fetchRndQuotes() {
    const data = await fetch("https://type.fit/api/quotes").then((response) =>
      response.json()
    );
    setRndQuotes(data);
    setRndQuote(data[Math.floor(Math.random() * data.length)]);
  }

  async function saveHandler() {
    const text = rndQuote.text;
    const author = rndQuote.author;

    const newQuote =
      author === null
        ? { text, author: "Anonymus", dt: new Date() }
        : { text, author, dt: new Date() };

    await QuoteDataService.addQuotes(newQuote);

    fetchQuotes();
    setRndQuote(rndQuotes[Math.floor(Math.random() * rndQuotes.length)]);
  }

  function dismissHandler() {
    setRndQuote(rndQuotes[Math.floor(Math.random() * rndQuotes.length)]);
  }

  return (
    <>
      <Card>
        <Card.Header>Inspirational new quote...</Card.Header>
        <Card.Body className="d-flex flex-column">
          <p id="rndQuote">{rndQuote.text}</p>
          <h4 id="rndAuthor">
            - {rndQuote.author !== "" ? rndQuote.author : "Anonymus"}
          </h4>
          <ButtonGroup className="mt-auto ms-auto">
            <Button id="buttonAddRndQuote" size="sm" onClick={saveHandler}>
              Save
            </Button>
            <Button
              id="buttonDismissRndQuote"
              size="sm"
              variant="danger"
              onClick={dismissHandler}
            >
              Dismiss
            </Button>
          </ButtonGroup>
        </Card.Body>
      </Card>
    </>
  );
};

export default RndQuote;
