import React, { useState, useEffect } from "react";
import { Button, Card, ButtonGroup, Alert } from "react-bootstrap";
import BookDataService from "../services/book.services";

const BooksList = ({ books, getAllHandler }) => {
  const [rndQuotes, setRndQuotes] = useState([]);
  const [rndQuote, setRndQuote] = useState({ title: "", author: "" });
  const [message, setMessage] = useState({ error: false, msg: "" });

  fetch("https://type.fit/api/quotes")
    .then((response) => response.json())
    .then((data) => setRndQuotes(data));

  useEffect(() => {
    setRndQuote(rndQuotes[Math.floor(Math.random() * rndQuotes.length)]);
  }, []);

  const saveHandler = async () => {
    const title = rndQuote.text;
    const author = rndQuote.author;

    const newBook =
      author === ""
        ? { title, author: "Anonymus", dt: new Date() }
        : { title, author, dt: new Date() };

    try {
      await BookDataService.addBooks(newBook);
      setMessage({ error: false, msg: "New Book added successfully!" });
    } catch (err) {
      setMessage({ error: true, msg: err.message });
    }

    getAllHandler();
  };

  const dismissHandler = async (id) => {
    await BookDataService.deleteBook(id);
  };

  return (
    <>
      {message?.msg && (
        <Alert
          variant={message?.error ? "danger" : "success"}
          dismissible
          onClose={() => setMessage("")}
        >
          {message?.msg}
        </Alert>
      )}
      {rndQuote?.title || (
        <div className="mb-3">
          <Card className="mb-1">
            <Card.Body>
              <Card.Text>{rndQuote.text}</Card.Text>
              <Card.Title>- {rndQuote.author}</Card.Title>
            </Card.Body>
          </Card>
          <div className="text-end">
            <ButtonGroup>
              <Button variant="dark" size="md" onClick={() => saveHandler()}>
                Save
              </Button>
              <Button
                variant="danger"
                size="md"
                onClick={(e) => dismissHandler()}
              >
                Dismiss
              </Button>
            </ButtonGroup>
          </div>
        </div>
      )}
    </>
  );
};

export default BooksList;
