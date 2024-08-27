describe.only('Dropdown Interaction Test', () => {
  beforeEach("call url",()=>{
    cy.visit('https://sankey.cap-stone.pk/3%7C2%7C1/NA/farman/admin/create-sankeys');

  })
  it('Visits the webpage, clicks on dropdown menu, and selects an option', () => {
  //  cy.get("select[class='bg-white w-[389px] h-[32px] rounded-[2px] border-[1px] border-solid border-[#DCDDDC] py-[4px] px-[12px] gap-[10px]']").select('Emission')
  //  cy.get('#name').type("Emission") 
  cy.get("select[class='bg-white w-[389px] h-[32px] rounded-[2px] border-[1px] border-solid border-[#DCDDDC] py-[4px] px-[12px] gap-[10px]']")
  .find('option')
  .then((dropdownOptions) => {
    // Randomly select one option
    const randomIndex = Math.floor(Math.random() * dropdownOptions.length);
    const selectedOption = dropdownOptions[randomIndex];
    const selectedText = selectedOption.text.trim();

    // Log the selected option text
    cy.log(`Selected option: ${selectedText}`);

    // Click to select the option
    cy.wrap(selectedOption).parent().select(selectedText);

    // Type the selected option into the locator #name
    cy.get('#name').type(selectedText);
    cy.get('button:nth-of-type(2)').click({force:true})
  })   

  });
  })