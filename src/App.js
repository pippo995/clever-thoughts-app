import { useState } from "react";
import AddQuote from "./components/AddQuote";
import RndQuote from "./components/RndQuote";
import QuotesList from "./components/QuotesList";
import QuoteDataService from "./services/quote.services";

function App() {
  const [width, setWidth] = useState(window.innerWidth);
  const [quotes, setQuotes] = useState([]);

  function handleResize() {
    setWidth(window.innerWidth);
  }

  window.addEventListener("resize", handleResize);

  const getQuotes = async () => {
    console.log("getQuotes");

    const data = await QuoteDataService.getAllQuotes();
    setQuotes(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  return (
    <>
      <div>Quotes App</div>
      <AddQuote getQuotes={getQuotes} />
      {width > 500 ? <RndQuote getQuotes={getQuotes} /> : null}
      <QuotesList quotes={quotes} getQuotes={getQuotes} />
    </>
  );
}

export default App;
