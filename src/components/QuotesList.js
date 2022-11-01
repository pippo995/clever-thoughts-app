import React, { useState, useEffect } from "react";
import { Button, Card, ButtonGroup, Form } from "react-bootstrap";
import QuoteDataService from "../services/quote.services";

const QuotesList = ({ quotes, getAllHandler }) => {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const searchTerms = search.split(" ");
    const results = quotes.filter((quote) =>
      searchTerms.some(
        (q) =>
          quote.text.toLowerCase().includes(q) ||
          quote.author.toLowerCase().includes(q)
      )
    );
    setSearchResults(results);
  }, [search, quotes]);

  const deleteHandler = async (id) => {
    await QuoteDataService.deleteQuote(id);
    getAllHandler();
  };

  const copyValue = async (doc) => {
    const quote = doc.text + "\n" + "( " + doc.author + " )";
    navigator.clipboard.writeText(quote);
  };

  return (
    <>
      <div>
        <Form.Group className="mb-3">
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
                  <Card.Text>{doc.text}</Card.Text>
                  <Card.Title>- {doc.author}</Card.Title>
                </Card.Body>
              </Card>
              <div className="text-end">
                <ButtonGroup>
                  <Button
                    variant="dark"
                    size="md"
                    onClick={() => copyValue(doc)}
                  >
                    Copy
                  </Button>
                  <Button
                    variant="danger"
                    size="md"
                    onClick={() => deleteHandler(doc.id)}
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

export default QuotesList;
