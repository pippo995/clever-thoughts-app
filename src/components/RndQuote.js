import React, { useState, useEffect } from "react";
import QuoteDataService from "../services/quote.services";

const RndQuote = ({ getQuotes }) => {
  const [rndQuote, setRndQuote] = useState({ text: "", author: "" });
  const [hideComponent, setHideComponent] = useState(false);

  useEffect(() => {
    fetch("https://type.fit/api/quotes")
      .then((response) => response.json())
      .then((data) =>
        setRndQuote(data[Math.floor(Math.random() * data.length)])
      );
  }, []);

  const saveHandler = async () => {
    const text = rndQuote.text;
    const author = rndQuote.author;

    const newQuote =
      author === null
        ? { text, author: "Anonymus", dt: new Date() }
        : { text, author, dt: new Date() };

    try {
      await QuoteDataService.addQuotes(newQuote);
    } catch (err) {
    }

    getQuotes();
    setHideComponent(true);
  };

  const dismissHandler = () => {
    fetch("https://type.fit/api/quotes")
      .then((response) => response.json())
      .then((data) =>
        setRndQuote(data[Math.floor(Math.random() * data.length)])
      );
  };

  return (
    <>
      {!hideComponent ? (
        <div className="mt-3 mb-3">
          <div>
              <p>{rndQuote.text}</p>
              <h4>
                - {rndQuote.author !== null ? rndQuote.author : "Anonymus"}
              </h4>
          </div>
          <div className="text-end">
            <div>
              <button variant="dark" size="md" onClick={() => saveHandler()}>
                Save
              </button>
              <button
                variant="danger"
                size="md"
                onClick={() => dismissHandler()}
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default RndQuote;
