describe('exercise', () => {
    beforeEach('Call url', () => {
        cy.visit('/');
    });

    it('Get all the rows and scroll', () => {
        // Get all the rows inside the scrollable table
        cy.get('.tableFixHead > table > tbody > tr').each(($row, index) => {
            // Scroll the row into view
            cy.wrap($row).scrollIntoView();
            // Log the text content of the row
            cy.wrap($row).invoke('text').then((text) => {
                cy.log(`Row ${index + 1}: ${text}`);
            });
        });
    });

    it('Get the last row and sum the text, and the sum text will be equal to total amount', () => {
        let sum = 0;
        let totalAmount = 0;

        // Get the total amount from the .totalAmount element
        cy.get('.totalAmount').invoke('text').then((text) => {
            // Extract the number from the text
            totalAmount = parseInt(text.trim().replace('Total Amount Collected:', '').trim(), 10);
        });

        // Get all the rows inside the scrollable table and sum the last column
        cy.get('.tableFixHead > table > tbody > tr > td:last-child').then($cells => {
            const values = [];
            $cells.each((index, cell) => {
                // Get the text content of the cell
                const text = Cypress.$(cell).text().trim();
                values.push(text);
            });

            // Convert the text values to integers and sum them
            values.forEach(text => {
                const value = parseInt(text, 10);
                if (!isNaN(value)) {
                    sum += value;
                }
            });

            // Log the sum of the last column
            cy.log(`Sum of the last column: ${sum}`);

            // Assert the sum is equal to the total amount
            expect(sum).to.equal(totalAmount);
        });
    });

    it('Click all the table rows with Cypress', () => {
        cy.get('.tableFixHead > table > tbody > tr').each(($row) => {
            cy.wrap($row).click();
        });
    });
});
