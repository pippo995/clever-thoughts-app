import React, { useState, useEffect } from "react";
import { Form, Alert, Button } from "react-bootstrap";
import BookDataService from "../services/book.services";

const AddBook = ({ getAllHandler }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [message, setMessage] = useState({ error: false, msg: "" });

  useEffect(() => {
    getAllHandler();
  }, []);

  const addHandler = async (e) => {
    e.preventDefault();

    if (title === "") {
      setMessage({ error: true, msg: "Quote is mandatory!" });
      return;
    }

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

    setTitle("");
    setAuthor("");
    getAllHandler();
  };

  return (
    <>
      <div className="mt-3 mb-3">
        {message?.msg && (
          <Alert
            variant={message?.error ? "danger" : "success"}
            dismissible
            onClose={() => setMessage("")}
          >
            {message?.msg}
          </Alert>
        )}
        <Form onSubmit={addHandler}>
          <Form.Group className="mb-3" controlId="formBookTitle">
            <Form.Control
              as="textarea"
              placeholder="Quote"
              value={title}
              rows={3}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBookAuthor">
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

export default AddBook;
