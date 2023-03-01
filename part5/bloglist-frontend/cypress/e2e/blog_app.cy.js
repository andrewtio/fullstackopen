describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user = {
      name: "Andrew",
      username: "zenfein",
      password: "zenfein",
    };
    cy.request("POST", `${Cypress.env("BACKEND")}/users`, user);
    cy.visit("http://localhost:3000");
  });

  it("Login form is shown", () => {
    cy.contains("Log in into application");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.contains("Login").should("exist");
      cy.get("#username").type("zenfein");
      cy.get("#password").type("zenfein");
      cy.get("#login-button").click();

      cy.contains("Andrew logged-in");
    });

    it("fails with wrong credentials", function () {
      cy.contains("Login").click();
      cy.get("#username").type("zenfeinn");
      cy.get("#password").type("zenfeinn");
      cy.get("#login-button").click();

      cy.get(".error")
        .should("contain", "Wrong Credentials")
        .and("have.css", "color", "rgb(255, 0, 0)")
        .and("have.css", "border-style", "solid");
    });
  });
});
