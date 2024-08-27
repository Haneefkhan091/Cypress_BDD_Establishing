describe.only('Dropdown Interaction Test', () => {
    beforeEach("call url", () => {
        cy.visit('https://rahulshettyacademy.com/AutomationPractice/');
    });

    it('Visits the webpage, clicks on dropdown menu, and selects an option', () => {
        const expectedRowsText = [
            'Rahul Shetty Selenium Webdriver with Java Basics + Advanced + Interview Guide 30',
            'Rahul Shetty Appium (Selenium) - Mobile Automation Testing from Scratch 30',
            'Rahul Shetty WebSecurity Testing for Beginners-QA knowledge to next level 20',
            'Rahul Shetty Advanced Selenium Framework Pageobject, TestNG, Maven, Jenkins,C 20',
            'Rahul Shetty Write effective QA Resume that will turn to interview call 0',
        ];

        cy.get('.table-display')
            .find('tbody tr')
            .filter(':contains("0")')
            .should('have.length', expectedRowsText.length) // Ensure the number of rows matches
            .each(($row, index) => {
                cy.wrap($row)
                    .invoke('text')
                    .then((text) => {
                        // Trim the text to remove any excess whitespace, newlines, and extra spaces
                        const trimmedText = text.replace(/\s\s+/g, ' ').trim();
                        // Assert that the text matches the expected value
                        expect(trimmedText).to.equal(expectedRowsText[index]);
                    });
            });
    });
});
