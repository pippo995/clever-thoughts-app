import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import QuoteDataService from "../services/quote.services";

const AddQuote = ({ getQuotes }) => {
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

    try {
      await QuoteDataService.addQuotes(newQuote);
    } catch (err) {}

    setText("");
    setAuthor("");
    getQuotes();
  }

  return (
    <>
      <Form onSubmit={addHandler}>
        <Form.Group>
          <Form.Control
            as="textarea"
            style={{ resize: "none" }}
            rows={4}
            placeholder="Quote"
            value={text}
            onChange={textHandler}
          />

          <Form.Control
            type="text"
            placeholder="Author"
            value={author}
            onChange={authorHandler}
          />

          <Button type="submit">Save</Button>
        </Form.Group>
      </Form>
    </>
  );
};

export default AddQuote;
