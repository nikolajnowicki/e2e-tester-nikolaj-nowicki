beforeEach(() => {
  cy.visit("/");
});

//----------------------------------------------------------------//
// Testing With Mock Data                                         //
//----------------------------------------------------------------//

it("Testing Create Html With Mock Data And MovieSort", () => {
  cy.intercept("GET", "http://omdbapi.com/?apikey=416ed51a&s=*", {
    fixture: "omdbResponse",
  }).as("omdbCall");
  cy.get("#searchText").type("Mock");
  cy.get("#search").click();
  cy.wait("@omdbCall");
  cy.get("#movie-container").should("exist");
  cy.get("h3").should("exist");
  cy.get("img").should("exist");
  cy.get(".movie:nth-of-type(1)").should("contain", "Mock Movie 1");
  cy.get(".movie:nth-of-type(2)").should("contain", "Mock Movie 2");
  cy.get(".movie:nth-of-type(3)").should("contain", "Mock Movie 3");
  cy.get(".movie:nth-of-type(4)").should("contain", "Mock Movie 4");
});

it("should not get mock data with incorrect url", () => {
  cy.intercept("GET", "http://omdbapi.com/?apikey=416ed51a&s=*", {
    fixture: "badResponse",
  }).as("omdbCall");
  cy.get("#searchText").type(" ");
  cy.get("#search").click();
  cy.wait("@omdbCall");
  cy.get("#movie-container").should("not.contain", "Mock");
  cy.get("p").should("exist").should("contain", "Inga sökresultat att visa");
});

//----------------------------------------------------------------//
// Testing With API Data                                          //
//----------------------------------------------------------------//

describe("Testing Create Html Functionality", () => {
  it("Should render html when searching for a movie", () => {
    cy.get("input#searchText").should("exist");
    cy.get("input").should("have.attr", "placeholder", "Skriv titel här");
    cy.get("input#searchText")
      .type("star wars")
      .should("have.value", "star wars");
    cy.get("form#searchForm").submit();
    cy.get("button").should("contain", "Sök");
    cy.get("button#search").click();

    // When html is rendered the following should exist //

    cy.get("div.movie").should("exist");
    cy.get(".movie:first-child > h3").should(
      "contain.text",
      "Star Wars: Episode IV - A New Hope"
    );
  });
});

describe("Testing movieSort with API data", () => {
  it("Should print movies from A-Z", () => {
    cy.get("input#searchText").should("exist");
    cy.get("input#searchText").type("cars").should("have.value", "cars");
    cy.get("form#searchForm").submit();

    cy.get("div.movie").should("exist");
    cy.get(".movie:first-child > h3").should("contain.text", "Cars");
    cy.get(".movie:nth-of-type(2)").should("contain.text", "Cars 2");
    cy.get(".movie:nth-of-type(3)").should("contain.text", "Cars 3");
  });
});

describe("Testing what happends when no input is specified", () => {
  it("should display error message", () => {
    cy.get("#searchText").type(" ");
    cy.get("#search").click();
    cy.get("#movie-container").should("exist");
    cy.get("p").should("contain", "Inga sökresultat att visa");
  });
});
