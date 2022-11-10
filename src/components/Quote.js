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
    <div key={quote.id} className="mb-3">
      <div>
        <p>{quote.text}</p>
        <h4>- {quote.author}</h4>
      </div>
      <div>
        <button variant="dark" size="md" onClick={() => copyHandler(quote)}>
          Copy
        </button>
        <button variant="danger" size="md" onClick={() => deleteHandler(quote)}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default Quote;
