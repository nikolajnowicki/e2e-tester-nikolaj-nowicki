beforeEach(() => {
  cy.visit("/");
});

describe("Testing Create Html Functionality", () => {
  it("Should render html when searching for a movie", () => {
    cy.get("input#searchText").should("exist");
    cy.get("input#searchText")
      .type("star wars")
      .should("have.value", "star wars");
    cy.get("form#searchForm").submit();
    cy.get("button").contains("Sök").should("exist");
    cy.get("button#search").click();

    // When html is rendered the following should exist //

    cy.get("div.movie").should("exist");
    cy.get(".movie:first-child > h3").should(
      "contain.text",
      "Star Wars: Episode IV - A New Hope"
    );
  });
});
