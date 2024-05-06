describe('Login Component', () => {
  beforeEach(() => {
    // Start each test with a fresh login page
    cy.visit('https://budget-tracker-2024.netlify.app/login');
  });

  it('successfully loads the login page', () => {
    cy.contains('Sign in to your account').should('be.visible');
  });

  it('allows the user to enter email and password', () => {
    cy.get('input[name=email]').type('user@example.com').should('have.value', 'user@example.com');
    cy.get('input[name=password]').type('password123').should('have.value', 'password123');
  });

  it('shows error message on failed login', () => {
    // Mock the API response for a failed login attempt
    cy.intercept('POST', 'https://backendetracker.onrender.com/login', {
      statusCode: 401,
      body: {
        message: 'Login failed'
      }
    });

    cy.get('input[name=email]').type('wrong@example.com');
    cy.get('input[name=password]').type('wrongpassword{enter}');

    cy.url().should('include', '/login');

  });

  it('redirects to dashboard on successful login', () => {
    // Mock the API response for a successful login attempt
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

    cy.url().should('include', '/dashboard');
    cy.contains('Transactions').should('be.visible');
  });
});
