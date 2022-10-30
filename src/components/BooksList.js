import React, { useState, useEffect } from "react";
import { Button, Card, ButtonGroup, Form } from "react-bootstrap";
import BookDataService from "../services/book.services";

const BooksList = ({ books, getAllHandler }) => {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    getAllHandler();
  }, []);

  useEffect(() => {
    const results = books.filter((book) =>
      book.title.toLowerCase().includes(search) || book.author.toLowerCase().includes(search)
    );
    setSearchResults(results);
  }, [search, books]);

  const deleteHandler = async (id) => {
    await BookDataService.deleteBook(id);
    getAllHandler();
  };

  return (
    <>
      <div>
        <Form.Group className="mb-3" controlId="">
          <Form.Control
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Form.Group>
        {searchResults.map((doc) => {
          return (
            <div className="mb-3">
              <Card key={doc.id} className="mb-1">
                <Card.Body>
                  <Card.Text>{doc.title}</Card.Text>
                  <Card.Title>- {doc.author}</Card.Title>
                </Card.Body>
              </Card>
              <div className="text-end">
                <ButtonGroup>
                  <Button
                    variant="dark"
                    size="md"
                    class="delete"
                    onClick={(e) => deleteHandler(doc.id)}
                  >
                    Copy
                  </Button>
                  <Button
                    variant="danger"
                    size="md"
                    class="delete"
                    onClick={(e) => deleteHandler(doc.id)}
                  >
                    Delete
                  </Button>
                </ButtonGroup>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default BooksList;
