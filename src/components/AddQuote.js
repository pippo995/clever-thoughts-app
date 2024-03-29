import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import QuoteDataService from "../services/quote.services";

const AddQuote = ({ fetchQuotes }) => {
  const [text, setText] = useState("");
  const [author, setAuthor] = useState("");

  function textHandler(e) {
    setText(e.target.value);
  }

  function authorHandler(e) {
    setAuthor(e.target.value);
  }

  async function addHandler(e) {
    e.preventDefault();

    if (text === "") {
      return;
    }

    const newQuote =
      author === ""
        ? { text, author: "Anonymus", dt: new Date() }
        : { text, author, dt: new Date() };

    await QuoteDataService.addQuotes(newQuote);

    setText("");
    setAuthor("");
    fetchQuotes();
  }

  return (
    <>
      <Form onSubmit={addHandler}>
        <Form.Group className="d-flex flex-column">
          <Form.Control
            id="inputQuote"
            className="mb-1"
            as="textarea"
            style={{ resize: "none" }}
            maxLength="300"
            rows={4}
            placeholder="Quote (max 300 char)"
            value={text}
            onChange={textHandler}
            required
          />

          <Form.Control
            id="inputAuthor"
            className="mb-1"
            type="text"
            placeholder="Author"
            value={author}
            onChange={authorHandler}
          />

          <Button
            id="buttonAddQuote"
            className="align-self-center"
            type="submit"
            size="lg"
          >
            Save
          </Button>
        </Form.Group>
      </Form>
    </>
  );
};

export default AddQuote;
