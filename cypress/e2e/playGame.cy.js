describe("Test E2E", () => {
  it("User plays a game and get input value saved", () => {
    login();
    typeArtist("que");

    cy.get('[data-test="return-to-main-menu"]').click();
    cy.get('[data-test="artist-input"]').should("have.value", "que");
  });

  it("User plays a game and go back to artist albums, play another game, go back to artist albums and home page, input value saved", () => {
    login();
    typeArtist("kaz");

    cy.get('[data-test="return-to-artist-albums"]').click();

    cy.get('[data-test="albums"]').children().first().click();

    checkSound();
    for (let index = 0; index < 5; index++) {
      cy.get('[data-test="answer-0"]').click();
    }
    cy.get('[data-test="return-to-main-menu"]').click();
    cy.get('[data-test="artist-input"]').should("not.have.value", "que");
  });
});

const login = () => {
  cy.visit("http://localhost:3000");

  cy.get('[data-test="login"]').click();

  cy.origin("https://accounts.spotify.com", () => {
    cy.get("input#login-username").click().type(Cypress.env("login"));
    cy.get("input#login-password").click().type(Cypress.env("pass"));
    cy.get("#login-button").click();
    cy.get('[data-testid="auth-accept"]').click();
  });
};

const checkSound = () => {
  cy.get('[data-test="play-btn"]').click();
  cy.wait(5000);
  cy.get('[data-test="stop-btn"]').click();
};

const typeArtist = (name) => {
  cy.get('[data-test="artist-input"]').type(name);

  cy.get('[data-test="artist-card-0"]').click();
  cy.get('[data-test="albums"]').children().last().click();

  checkSound();
  for (let index = 0; index < 5; index++) {
    cy.get('[data-test="answer-0"]').click();
  }
};
