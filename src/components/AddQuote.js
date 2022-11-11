import React, { useState } from "react";
import QuoteDataService from "../services/quote.services";

const AddQuote = ({ getQuotes }) => {
  const [text, setText] = useState("");
  const [author, setAuthor] = useState("");

  function textHandler(e) {
    setText(e.target.value);
  }

  function authorHandler(e) {
    setAuthor(e.target.value);
  }

  async function addHandler(e) {
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
  }

  return (
    <>
      <div>
        <form onSubmit={addHandler}>
          <textarea
            rows={4}
            placeholder="Quote"
            value={text}
            onChange={textHandler}
          />

          <input
            type="text"
            placeholder="Author"
            value={author}
            onChange={authorHandler}
          />

          <button>Save</button>
        </form>
      </div>
    </>
  );
};

export default AddQuote;
