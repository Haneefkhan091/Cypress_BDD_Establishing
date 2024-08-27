describe("Pos user creation", () => {
    beforeEach(() => {
        cy.clearCookies();    
        cy.clearLocalStorage();
      cy.visit("http://172.31.44.9/salamdms/#/sign-in");
     
    });
  it("Creating user",()=>{
    cy.get('#email').type('shafiqDev')
    cy.get('#password').type('12345')
    cy.get('.MuiButton-label').click({force:true})
    cy.contain('Mobile App users').click({force:true});
  })
  
  });
  