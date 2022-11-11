import React, { useState, useEffect } from "react";
import QuoteDataService from "../services/quote.services";

const RndQuote = ({ getQuotes }) => {
  const [rndQuotes, setRndQuotes] = useState([]);
  const [rndQuote, setRndQuote] = useState({ text: "", author: "" });

  useEffect(() => {
    setRndQuotes(fetchRndQuotes());
    console.log(rndQuotes);
  }, []);

  async function saveHandler() {
    const text = rndQuote.text;
    const author = rndQuote.author;

    const newQuote =
      author === null
        ? { text, author: "Anonymus", dt: new Date() }
        : { text, author, dt: new Date() };

    try {
      await QuoteDataService.addQuotes(newQuote);
    } catch (err) {}

    getQuotes();
    fetchRndQuotes();
  };

  function dismissHandler () {
    fetchRndQuotes();
  };

  function fetchRndQuotes () {
    return fetch("https://type.fit/api/quotes")
      .then((response) => response.json())
      .then((data) =>
        setRndQuote(data[Math.floor(Math.random() * data.length)])
      );
  }

  return (
    <>
      <div>
        <div>
          <p>{rndQuote.text}</p>
          <h4>- {rndQuote.author !== null ? rndQuote.author : "Anonymus"}</h4>
        </div>
        <div>
          <div>
            <button onClick={saveHandler}>
              Save
            </button>
            <button onClick={dismissHandler}>
              Dismiss
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default RndQuote;
