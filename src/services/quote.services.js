class QuoteService {
  getQuote = () => {
    fetch("https://type.fit/api/quotes")
      .then(function (response) {
        return response.json();
      })
      .then(function (response) { 
        const rnd = Math.floor(Math.random() * response.lenght);
        return response[rnd]; 
      });
  };
}
