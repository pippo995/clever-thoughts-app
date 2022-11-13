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

    /*cy.get("textarea")
    .type(testQuote);
    cy.get("input")
    .type(testAuthor);

    cy.get("button[type=submit]")
    .click();

    cy.get("textarea")
    .should('have.value', '');
    cy.get("input")
    .should('have.value', '');

    cy.contains(testQuote);
    cy.contains(testAuthor);*/

  });
});
