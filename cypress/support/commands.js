// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//

/// <reference types="cypress" />
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


//######## Find Broken Links ###########
Cypress.Commands.add("checkBrokenLinks", () => {
    let brokenLinks = 0;
    let activeLinks = 0;
  
    cy.get("a")
      .each(($link, index) => {
        const href = $link.attr("href");
        if (href) {
          cy.request({ url: href, failOnStatusCode: false }).then((response) => {
            if (response.status >= 400) {
              cy.log(`**** link ${index + 1} is a Broken Link *** ${href} `);
              brokenLinks++;
            } else {
              cy.log(`*** link ${index + 1} is an Active Link ***`);
              activeLinks++;
            }
          });
        }
      })
      .then(($links) => {
        const totalLinks = $links.length;
        cy.step("==========Total links==========");
        cy.log(`**** total links **** ${totalLinks}`);
        cy.step("==========broken links==========");
        cy.log(`**** broken links **** ${brokenLinks}`);
        cy.step("==========active links==========");
        cy.log(`**** active links **** ${activeLinks}`);
      });
  });