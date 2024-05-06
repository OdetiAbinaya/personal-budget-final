describe('Profile Component', () => {
    beforeEach(() => {
      // Visit the SignIn page before each test
      cy.visit('https://budget-tracker-2024.netlify.app/login');

      cy.intercept('POST', 'https://backendetracker.onrender.com/login', {
        statusCode: 200,
        body: {
          token: '123456',
          expirationTime: Math.floor(Date.now() / 1000) + 3600, // Current time + 1 hour
          message: 'Success'
        }
      });
  
      cy.get('input[name=email]').type('user@example.com');
      cy.get('input[name=password]').type('password123{enter}');
  
      // Simulate setting items in localStorage
      cy.window().then((win) => {
        win.localStorage.setItem('token', '123456');
      });
    });
  
    it('page should be navigated to profile', () => {
        cy.visit('https://budget-tracker-2024.netlify.app/profile');
        cy.contains('Looks Great').should('be.visible');
    });
  });