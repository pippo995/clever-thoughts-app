import React, { useState, useEffect } from "react";
import Quote from "./Quote";

const QuotesList = ({ quotes, getQuotes }) => {
  const [searchBar, setSearchBar] = useState("");
  const [searchResults, setSearchResults] = useState([]);

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
      <input
        type="text"
        placeholder="Search"
        onInput={(e) => searchHandler(e)}
        value={searchBar}
      />
      {(searchBar !== "" ? searchResults : quotes).map((quote) => {
        return <Quote quote={quote} getQuotes={getQuotes}/>;
      })}
    </div>
  );
};

export default QuotesList;
