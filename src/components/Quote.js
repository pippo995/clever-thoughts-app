import React from "react";
import QuoteDataService from "../services/quote.services";

const Quote = ({ quote, getQuotes }) => {
  function copyHandler(quote) {
    const quoteClip = quote.text + "\n" + "( " + quote.author + " )";
    navigator.clipboard.writeText(quoteClip);
  }

  function deleteHandler(quote) {
    QuoteDataService.deleteQuote(quote.id);
    getQuotes();
  }

  return (
    <div key={quote.id}>
      <div>
        <p>{quote.text}</p>
        <h4>- {quote.author}</h4>
      </div>
      <div>
        <button onClick={() => copyHandler(quote)}>Copy</button>
        <button onClick={() => deleteHandler(quote)}>Delete</button>
      </div>
    </div>
  );
};

export default Quote;
