describe("The Home Page", () => {
  it("successfully loads", () => {
    cy.visit("/"); // change URL to match your dev URL
  });
});

describe("Add a quote", () => {
  it("successfully loads", () => {
    cy.visit("/"); // change URL to match your dev URL

    const testQuote = "test quote: " + Math.random();
    const testAuthor = "test author: " + Math.random();

    cy.get("[id=inputQuote]").type(testQuote);
    cy.get("[id=inputAuthor]").type(testAuthor);

    cy.get("[id=buttonAddQuote]").click();

    cy.get("[id=inputQuote]").should("have.value", "");
    cy.get("[id=inputAuthor]").should("have.value", "");

    cy.contains(testQuote);
    cy.contains(testAuthor); 
  });
});

describe("Search for quotes", () => {
  it("successfully loads", () => {
    cy.visit("/"); // change URL to match your dev URL

    const searchTerm = "Search term: " + Math.random();

    cy.get("[id=searchText]").type(searchTerm);
  });
});