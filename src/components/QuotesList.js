import React, { useState, useEffect } from "react";
import { Row, Col, Form } from "react-bootstrap";
import Quote from "./Quote";

const QuotesList = ({ quotes, getQuotes }) => {
  const [searchBar, setSearchBar] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    getQuotes();
  }, []);

  function searchHandler(e) {
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

  return (
    <div>
      <Row>
        <Form.Control
          type="text"
          placeholder="Search"
          onInput={(e) => searchHandler(e)}
          value={searchBar}
        />
      </Row>
      <Row xs={1} md={2} className="g-2">
        {(searchBar !== "" ? searchResults : quotes).map((quote) => {
          return <Quote key={quote.id} quote={quote} getQuotes={getQuotes} />;
        })}
      </Row>
    </div>
  );
};

export default QuotesList;
