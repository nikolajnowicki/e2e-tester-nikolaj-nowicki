beforeEach(() => {
  cy.visit("/");
});

describe("Testing movieSort", () => {
  it("Should print movies in decending order A-Z", () => {
    cy.get("input#searchText").should("exist");
    cy.get("input#searchText").type("cars").should("have.value", "cars");
    cy.get("form#searchForm").submit();

    cy.get("div.movie").should("exist");
    cy.get(".movie:first-child > h3").should("contain.text", "Cars");
    cy.get(".movie:nth-of-type(2)").should("contain.text", "Cars 2");
    cy.get(".movie:nth-of-type(3)").should("contain.text", "Cars 3");
  });
});
