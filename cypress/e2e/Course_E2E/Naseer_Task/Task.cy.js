describe('Login and Create Multiple Unique Users', () => {
    const usernames = ['Nauman', 'Ali', 'Sara', 'Ahmed', 'Fatima', 'Hassan', 'Ayesha', 'Bilal', 'Zainab', 'Umar'];

    before(() => {
        // Clear all cookies and local storage before starting the test suite
        cy.clearCookies();
        cy.clearLocalStorage();

        // Log in only once and preserve the session
        cy.session('login', () => {
            cy.visit('http://sn.neptune.s3-website-eu-west-1.amazonaws.com/');
            cy.get(':nth-child(1) > input').type('super@sleeknote.com');
            cy.get(':nth-child(2) > input').type('super@1234');
            cy.get('button').click();
            cy.url().should('include', '/home');
            cy.wait(2000);
        });
    });

    it('creates 10 unique users', () => {
        // Navigate to the home page after restoring the session
        cy.visit('http://sn.neptune.s3-website-eu-west-1.amazonaws.com/home', { failOnStatusCode: false });

        // Wait for the home page to load fully before proceeding
        cy.get('h1').should('contain', 'Neptune Admin Panel');

        // Loop to create 10 unique users
        for (let i = 0; i < usernames.length; i++) {
            const username = usernames[i];
            const uniqueEmail = `${username.toLowerCase()}.${Date.now()}@gmail.com`; // Generate a more readable unique email

            // Click the button to bring up the user creation form
            cy.get('button').click({ multiple: true });

            // Optionally add a wait if necessary
            cy.wait(2000);

            // Fill in the form with the user's details
            cy.get('._form-label_6gqh1_733 > [type="text"]').should('be.visible').type(username);
            cy.wait(1000);
            cy.get('[type="email"]').should('be.visible').type(uniqueEmail);
            cy.wait(1000);
            cy.get('[name="organization_id"]').should('be.visible').select('naptune1');
            cy.wait(1000);
            cy.get('[name="role_id"]').should('be.visible').select('Admin');
            cy.wait(1000);
            cy.get('[name="subscription_id"]').should('be.visible').select('Standard');
            cy.wait(1000);
            cy.get(':nth-child(12) > input').should('be.visible').type(`password${i + 1}`);
            cy.get(':nth-child(14) > input').should('be.visible').type(`password${i + 1}`);
            
            cy.wait(1000);
            cy.get('._create-btn_6gqh1_981').click();
            cy.wait(2000);

            // Check if the modal exists before clicking it
            cy.get('body').then(($body) => {
                if ($body.find('._modal-tital_6gqh1_669 > div').length > 0) {
                    cy.get('._modal-tital_6gqh1_669 > div').click();
                } else {
                    cy.log('Modal title not found, skipping click.');
                }
            });
        }
    });
});
