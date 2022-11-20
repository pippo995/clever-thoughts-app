import React, { useState } from "react";
import { Row, Col, Form } from "react-bootstrap";
import Quote from "./Quote";

const QuotesList = ({ quotes, fetchQuotes }) => {
  const [searchBar, setSearchBar] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  function searchHandler(e) {
    setSearchBar(e.target.value);

    if (e.target.value.trim() !== "") {
      const searchTerms = e.target.value
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

  return (
    <div>
      <Row className="g-2 mb-2">
        <Col>
          <Form.Control
            id="searchText"
            type="text"
            placeholder="Search"
            onChange={(e) => searchHandler(e)}
            value={searchBar}
          />
        </Col>
      </Row>

      <Row xs={1} md={2} className="g-2 mb-3">
        {(searchBar.trim() !== "" ? searchResults : quotes).map((quote) => {
          return (
            <Quote key={quote.id} quote={quote} fetchQuotes={fetchQuotes} />
          );
        })}
      </Row>
    </div>
  );
};

export default QuotesList;
