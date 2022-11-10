import React, { useState, useEffect } from "react";
import QuoteDataService from "../services/quote.services";

const AddQuote = ({ getQuotes }) => {
  const [text, setText] = useState("");
  const [author, setAuthor] = useState("");

  useEffect(() => {
    getQuotes();
  }, []);

  const addHandler = async (e) => {
    e.preventDefault();
    
    if (text === "") {
      return;
    }

    const newQuote =
      author === ""
        ? { text, author: "Anonymus", dt: new Date() }
        : { text, author, dt: new Date() };

    try {
      await QuoteDataService.addQuotes(newQuote);
    } catch (err) {}

    setText("");
    setAuthor("");
    getQuotes();
  };

  return (
    <>
      <div>
        <form onSubmit={addHandler}>
          <textarea
            rows={4}
            placeholder="Quote"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <input
            type="text"
            placeholder="Author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />

          <button variant="primary" type="submit">
            Save
          </button>
        </form>
      </div>
    </>
  );
};

export default AddQuote;
