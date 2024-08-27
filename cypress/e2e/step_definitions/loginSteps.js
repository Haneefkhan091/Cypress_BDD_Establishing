import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";

Given('I open the login page', () => {
  cy.visit('/');
});

When('I submit login with username {string} and password {string}', (username, password) => {
  cy.get('input[name="username"]').type(username);
  cy.get('input[name="password"]').type(password);
  cy.get('#signInBtn').click();
});

Then('I should see the dashboard', () => {
  cy.url().should('include', '/angularpractice/shop');
});
