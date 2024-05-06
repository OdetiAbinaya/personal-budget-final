import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import SignIn from './SignIn';
import axios from 'axios';

// Mock modules
jest.mock('axios');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn().mockImplementation(() => jest.fn())
}));

describe('SignIn Component', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <SignIn />
      </BrowserRouter>
    );
  });

  test('renders all input fields and the submit button', () => {
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  test('allows input to be entered in all fields', async () => {
    const nameInput = screen.getByLabelText(/full name/i);
    const emailInput = screen.getByLabelText(/email address/i);
    const passwordInput = screen.getAllByLabelText(/password/i)[0];

    await userEvent.type(nameInput, 'John Doe');
    await userEvent.type(emailInput, 'john@example.com');
    await userEvent.type(passwordInput, 'password123');

    expect(nameInput.value).toBe('John Doe');
    expect(emailInput.value).toBe('john@example.com');
    expect(passwordInput.value).toBe('password123');
  });


  test('shows error when passwords do not match', async () => {
    const passwordInput = screen.getAllByLabelText(/password/i)[0];
    const signInButton = screen.getByRole('button', { name: /sign in/i });

    await userEvent.type(passwordInput, 'password123');
    userEvent.click(signInButton);

    await waitFor(() => {
      expect(screen.getByText(/entered password doesn't match/i)).toBeInTheDocument();
    });
  });
  /*

  test('submits form and navigates on successful registration', async () => {
    const nameInput = screen.getByLabelText(/full name/i);
    const emailInput = screen.getByLabelText(/email address/i);
    const passwordInput = screen.getAllByLabelText(/password/i)[0];
    const confirmPasswordInput = screen.getAllByLabelText(/password/i)[1];
    const signInButton = screen.getByRole('button', { name: /sign in/i });

    // Mock Axios and Navigate
    axios.post.mockResolvedValue({ data: { _id: '12345' } });

    await userEvent.type(nameInput, 'John Doe');
    await userEvent.type(emailInput, 'john@example.com');
    await userEvent.type(passwordInput, 'password123');
    await userEvent.type(confirmPasswordInput, 'password123');
    userEvent.click(signInButton);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('https://backendetracker.onrender.com/register', {
        name: 'John Doe', email: 'john@example.com', password: 'password123'
      });
    });
  });
  */
});