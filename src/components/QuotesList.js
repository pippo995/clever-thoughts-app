import React, { useState, useEffect } from "react";
import { Button, Card, ButtonGroup, Form } from "react-bootstrap";
import QuoteDataService from "../services/quote.services";

const QuotesList = ({ quotes, getQuotes }) => {
  const [searchBar, setSearchBar] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  console.log("render");

  useEffect(() => {
    console.log("useEffect");
    setSearchResults(quotes);
  });

  function searchHandler(e) {
    console.log("search:" + e.target.value);

    setSearchBar(e.target.value);

    if (searchBar.trim() !== "") {
      const searchTerms = searchBar
        .split(" ")
        .filter((s) => s.trim().length !== 0);
      const results = quotes.filter((quote) =>
        searchTerms.some(
          (q) =>
            quote.text.toLowerCase().includes(q) ||
            quote.author.toLowerCase().includes(q)
        )
      );
      setSearchResults(results);
    } else {
      setSearchResults(quotes);
    }
  }

  function deleteHandler(id) {
    QuoteDataService.deleteQuote(id);
    getQuotes();
  }

  function copyHandler(quote) {
    const quoteClip = quote.text + "\n" + "( " + quote.author + " )";
    navigator.clipboard.writeText(quoteClip);
  }

  return (
    <>
      <div>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="Search"
            onInput={(e) => searchHandler(e)}
            value={searchBar}
          />
        </Form.Group>
        {searchResults.map((quote) => {
          return (
            <div key={quote.id} className="mb-3">
              <Card className="mb-1">
                <Card.Body>
                  <Card.Text>{quote.text}</Card.Text>
                  <Card.Title>- {quote.author}</Card.Title>
                </Card.Body>
              </Card>
              <div className="text-end">
                <ButtonGroup>
                  <Button
                    variant="dark"
                    size="md"
                    onClick={() => copyHandler(quote)}
                  >
                    Copy
                  </Button>
                  <Button
                    variant="danger"
                    size="md"
                    onClick={() => deleteHandler(quote.id)}
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
