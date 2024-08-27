describe("broken links checking", () => {
    beforeEach(() => {
        cy.clearCookies();    
        cy.clearLocalStorage();
      cy.visit("http://124.109.33.106:8090/");
     
    });
  it("Checking broken links",()=>{
    cy.get('#password_protected_pass').type('wp_ubank@@@1122@@@')
    cy.get('#wp-submit').click({force:true})
    cy.get('.close-modal > .fa').click()
    cy.checkBrokenLinks()
  })
  
  });
  