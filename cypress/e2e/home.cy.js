describe("The Home Page", () => {
  it("successfully loads", () => {
    cy.visit("/"); // change URL to match your dev URL
  });
});

describe("Add and remove a quote", () => {
  it("successfully loads", () => {
    cy.visit("/"); // change URL to match your dev URL

    const testQuote = "test quote: " + Math.random();
    const testAuthor = "test author: " + Math.random();

    cy.get("[id=inputQuote]")
    .type(testQuote);
    cy.get("[id=inputAuthor]")
    .type(testAuthor);

    cy.get("[id=buttonAddQuote]")
    .click();

    cy.get("[id=inputQuote]")
    .should('have.value', '');
    cy.get("[id=inputAuthor]")
    .should('have.value', '');

    cy.contains(testQuote);
    cy.contains(testAuthor);

  });
});


/*describe("Add random quote", () => {
  it("successfully loads", () => {
    cy.visit("/"); // change URL to match your dev URL

    const rndQuote = "test quote: " + Math.random();
    const rndAuthor = "test author: " + Math.random();

    cy.get("textArea[id=inputQuote]")
    .type(testQuote);
    cy.get("input[id=inputAuthor]")
    .type(testAuthor);

    cy.get("button[id=buttonAddQuote]")
    .click();

    cy.get("textArea[id=inputQuote]")
    .should('have.value', '');
    cy.get("input[id=inputAuthor]")
    .should('have.value', '');

    cy.contains(testQuote);
    cy.contains(testAuthor);

  });
});*/

describe("Dismiss random quote", () => {
  it("successfully loads", () => {
    cy.visit("/"); // change URL to match your dev URL

    const rndQuote = cy.get("[id=rndQuote]").then((t)=> t.text);
    const rndAuthor = cy.get("[id=rndAuthor]").then((t)=> t.text);

    cy.wait(500);
    cy.get("[id=buttonDismissRndQuote]")
    .click();

    cy.wait(500);
    cy.contains(rndQuote).should('not.exist');
    cy.contains(rndAuthor).should('not.exist');
  });
});

