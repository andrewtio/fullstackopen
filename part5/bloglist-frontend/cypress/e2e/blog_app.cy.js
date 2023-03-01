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
      cy.contains("Login").should("exist");
      cy.get("#username").type("zenfeinn");
      cy.get("#password").type("zenfeinn");
      cy.get("#login-button").click();

      cy.get(".error")
        .should("contain", "Wrong Credentials")
        .and("have.css", "color", "rgb(255, 0, 0)")
        .and("have.css", "border-style", "solid");
    });
  });

  describe("When logged in", function () {
    beforeEach(function () {
      cy.login({ username: "zenfein", password: "zenfein" });
    });

    it("A blog can be created", function () {
      cy.contains("New Blog").click();
      cy.get("#title").type("kanzlei");
      cy.get("#author").type("muditha");
      cy.get("#url").type("www.ditha.com");
      cy.get("#submit-button").click();

      cy.get(".message")
        .should("contain", "A new blog kanzlei by muditha has been added")
        .and("have.css", "color", "rgb(0, 128, 0)")
        .and("have.css", "border-style", "solid");

      cy.get(".blog").should("contain", "kanzlei muditha");
    });
  });

  describe("A Blog Exist", function () {
    this.beforeEach(function () {
      cy.login({ username: "zenfein", password: "zenfein" });
      cy.createBlog({
        title: "first title",
        author: "first author",
        url: "first url",
      });
    });

    it("A blog can be liked", function () {
      cy.get(".blog").contains("show").click();
      cy.get(".blog").should("contain", "Likes: 0").click();

      cy.get(".blog").contains("like").click();
      cy.get(".blog").contains("show").click();
      cy.get(".blog").should("contain", "Likes: 1").click();
    });
  });
});
