import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import QuoteDataService from "../services/quote.services";

const RndQuote = ({ rndQuotes, getRndQuotes, getQuotes }) => {
  const [rndQuote, setRndQuote] = useState({ text: "", author: "" });

  useEffect(() => {
    getRndQuotes();
    //setRndQuote(rndQuotes[Math.floor(Math.random() * rndQuotes.length)]);
  }, []);

  async function saveHandler() {
    const text = rndQuote.text;
    const author = rndQuote.author;

    const newQuote =
      author === null
        ? { text, author: "Anonymus", dt: new Date() }
        : { text, author, dt: new Date() };

    try {
      await QuoteDataService.addQuotes(newQuote);
    } catch (err) {}

    getQuotes();
    setRndQuote(rndQuotes[Math.floor(Math.random() * rndQuotes.length)]);
  }

  function dismissHandler() {
    setRndQuote(rndQuotes[Math.floor(Math.random() * rndQuotes.length)]);
  }

  return (
    <>
      <Card>
        <Card.Body>
          <p>{rndQuote.text}</p>
          <h4>- {rndQuote.author !== "" ? rndQuote.author : "Anonymus"}</h4>
          <Button size="sm" onClick={saveHandler}>Save</Button>
          <Button size="sm" onClick={dismissHandler}>Dismiss</Button>
        </Card.Body>
      </Card>
    </>
  );
};

export default RndQuote;
