import React, { useState, useEffect } from "react";
import { Button, Card, ButtonGroup, Form } from "react-bootstrap";
import BookDataService from "../services/book.services";
import QuoteService from "../services/quote.services";

const BooksList = ({ books, getAllHandler }) => {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    getAllHandler();
  }, []);

  useEffect(() => {
    const searchTerms = search.split(" ");
    const results = books.filter((book) =>
      searchTerms.some(
        (q) =>
          book.title.toLowerCase().includes(q) ||
          book.author.toLowerCase().includes(q)
      )
    );
    setSearchResults(results);
  }, [search, books]);

  const deleteHandler = async (id) => {
    await BookDataService.deleteBook(id);
    getAllHandler();
  };

  const copyValue = async (doc) => {
    const quote = doc.title + "\n" + "( " + doc.author + " )";
    navigator.clipboard.writeText(quote);
  };

  return (
    <>
      <div>
        <div className="mb-3">
          <Card className="mb-1">
            <Card.Body>
              <Card.Text>random</Card.Text>
              <Card.Title>- rnd</Card.Title>
            </Card.Body>
          </Card>
          <div className="text-end">
            <ButtonGroup>
              <Button
                variant="dark"
                size="md"
                onClick={() => copyValue()}
              >
                Save
              </Button>
              <Button
                variant="danger"
                size="md"
                onClick={(e) => deleteHandler()}
              >
                Dismiss
              </Button>
            </ButtonGroup>
          </div>
        </div>
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
                    onClick={(e) => copyValue(doc)}
                  >
                    Copy
                  </Button>
                  <Button
                    variant="danger"
                    size="md"
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
