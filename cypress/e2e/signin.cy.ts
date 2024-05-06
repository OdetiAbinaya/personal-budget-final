describe('SignIn Component', () => {
    beforeEach(() => {
      // Visit the SignIn page before each test
      cy.visit('https://budget-tracker-2024.netlify.app/');
    });
  
    it('loads the sign in page', () => {
      cy.contains('Sign in to your account').should('be.visible');
    });
  
    it('allows the user to type into input fields', () => {
      cy.get('input[name="name"]').type('John Doe').should('have.value', 'John Doe');
      cy.get('input[name="email"]').type('john@example.com').should('have.value', 'john@example.com');
      cy.get('input[name="password"]').first().type('password123').should('have.value', 'password123');
      cy.get('input[name="password"]').last().type('password123').should('have.value', 'password123');
    });
  
    it('shows error for non-matching passwords', () => {
      cy.get('input[name="password"]').first().type('password123');
      cy.get('input[name="password"]').last().type('password');
      cy.get('button[type="submit"]').click();
      cy.contains("Entered Password Doesn't match").should('be.visible');
    });
  
    it('registers successfully and redirects on valid data', () => {
      // Mock the API response for successful registration
      cy.intercept('POST', 'https://backendetracker.onrender.com/register', {
        statusCode: 200,
        body: { _id: '12345' }
      }).as('registerRequest');
  
      cy.get('input[name="name"]').type('Jane Doe');
      cy.get('input[name="email"]').type('jane@example.com');
      cy.get('input[name="password"]').first().type('password123');
      cy.get('input[name="password"]').last().type('password123');
      cy.get('button[type="submit"]').click();
      cy.wait('@registerRequest');
      cy.url().should('include', '/login');  // Assuming the user is redirected to the login page
    });
  
    it('fails to register with existing email', () => {
      // Mock the API response for a failed registration due to existing email
      cy.intercept('POST', 'https://backendetracker.onrender.com/register', {
        statusCode: 400,
        body: { message: "User Already Exists" }
      }).as('failedRegisterRequest');
  
      cy.get('input[name="email"]').type('existing@example.com');
      cy.get('input[name="password"]').first().type('password123');
      cy.get('input[name="password"]').last().type('password123');
      cy.get('button[type="submit"]').click();
      cy.wait('@failedRegisterRequest');
      cy.contains('User Already Exsists').should('be.visible');
    });
  });
  