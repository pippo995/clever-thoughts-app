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

    cy.get("textarea[id=formBookTitle]")
    .type(testQuote);
    cy.get("input[id=formBookAuthor]")
    .type(testAuthor);

    cy.get("button[type=submit]")
    .click();

    cy.get("textarea[id=formBookTitle]")
    .should('have.value', '');
    cy.get("input[id=formBookAuthor]")
    .should('have.value', '');

    cy.contains(testQuote);
    cy.contains(testAuthor);

  });
});
