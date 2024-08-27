describe.only('Dropdown Interaction Test', () => {
    beforeEach("call url",()=>{
      cy.visit('https://sankey.cap-stone.pk/3%7C2%7C1/NA/farman/admin/sankeys')
  
    })
    it('Visits the webpage, clicks on dropdown menu, and selects an option', () => {
    
        cy.get('tbody > :nth-child(1) > .flex > :nth-child(2)').click({force: true})
        cy.contains('Delete').click({force:true})
    });
    })