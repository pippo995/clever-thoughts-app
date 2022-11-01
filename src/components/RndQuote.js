import React, { useState, useEffect } from "react";
import { Button, Card, ButtonGroup, Alert } from "react-bootstrap";
import QuoteDataService from "../services/quote.services";

const RndQuote = ({ getAllHandler }) => {
  const [rndQuote, setRndQuote] = useState({ text: "", author: "" });
  const [message, setMessage] = useState({ error: false, msg: "" });
  const [hideComponent, setHideComponent] = useState(false);

  useEffect(() => {
    fetch("https://type.fit/api/quotes")
      .then((response) => response.json())
      .then((data) =>
        setRndQuote(data[Math.floor(Math.random() * data.length)])
      );
  }, []);

  const saveHandler = async () => {
    const text = rndQuote.text;
    const author = rndQuote.author;

    const newQuote =
      author === null
        ? { text, author: "Anonymus", dt: new Date() }
        : { text, author, dt: new Date() };

    try {
      await QuoteDataService.addQuotes(newQuote);
      setMessage({ error: false, msg: "New quote added successfully!" });
    } catch (err) {
      setMessage({ error: true, msg: err.message });
    }

    getAllHandler();
    setHideComponent(true);
  };

  const dismissHandler = () => {
    setHideComponent(true);
  };

  return (
    <>
      {message.error ? (
        <Alert
          variant={message?.error ? "danger" : "success"}
          dismissible
          onClose={() => setMessage("")}
        >
          {message?.msg}
        </Alert>
      ) : null}
      {!hideComponent ? (
        <div className="mt-3 mb-3">
          <Card className="mb-1">
            <Card.Body>
              <Card.Text>{rndQuote.text}</Card.Text>
              <Card.Title>
                - {rndQuote.author !== null ? rndQuote.author : "Anonymus"}
              </Card.Title>
            </Card.Body>
            <Card.Footer>
              Suggested quote... Refresh the page to change
            </Card.Footer>
          </Card>
          <div className="text-end">
            <ButtonGroup>
              <Button variant="dark" size="md" onClick={() => saveHandler()}>
                Save
              </Button>
              <Button
                variant="danger"
                size="md"
                onClick={() => dismissHandler()}
              >
                Dismiss
              </Button>
            </ButtonGroup>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default RndQuote;
