import React, { useState, useEffect } from "react";
import { Form, Alert, Button } from "react-bootstrap";
import QuoteDataService from "../services/quote.services";

const AddQuote = ({ getAllHandler}) => {
  const [text, setText] = useState("");
  const [author, setAuthor] = useState("");
  const [message, setMessage] = useState({ error: false, msg: "" });

  useEffect(() => {
    getAllHandler();
  }, []);

  const addHandler = async () => {

    if (text === "") {
      setMessage({ error: true, msg: "Text is mandatory!" });
      return;
    }

    const newQuote =
      author === ""
        ? { text, author: "Anonymus", dt: new Date() }
        : { text, author, dt: new Date() };

    try {
      await QuoteDataService.addQuotes(newQuote);
      setMessage({ error: false, msg: "New quote added successfully!" });
    } catch (err) {
      setMessage({ error: true, msg: err.message });
    }

    setText("");
    setAuthor("");
    getAllHandler();
  };

  return (
    <>
      <div className="mt-3 mb-3">
        {message.error ? (
          <Alert
            variant={message?.error ? "danger" : "success"}
            dismissible
            onClose={() => setMessage("")}
          >
            {message?.msg}
          </Alert>
        ) : null}
        <Form onSubmit={addHandler}>
          <Form.Group className="mb-3">
            <Form.Control
              as="textarea"
              rows={4}
              placeholder="Quote"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </Form.Group>
          <div className="d-grid">
            <Button variant="primary" type="submit">
              Save
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default AddQuote 
