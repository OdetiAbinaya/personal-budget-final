import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import Login from './Login';
import axios from 'axios';
import { MemoryRouter } from 'react-router-dom';


// Mock modules
jest.mock('axios');

// Mock useNavigate hook
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
  }));

describe('Login Component', () => {
  const setup = () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
  };

  test('renders correctly', () => {
    setup();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  test('allows input to be entered', async () => {
    setup();
    const emailInput = screen.getByLabelText(/email address/i);
    const passwordInput = screen.getByLabelText(/password/i);
    await userEvent.type(emailInput, 'test@example.com');
    await userEvent.type(passwordInput, 'password');
    expect(emailInput.value).toBe('test@example.com');
    expect(passwordInput.value).toBe('password');
  });
  /*

  it('should handle form submission', async () => {
    const mockResponse = {
      data: {
        token: 'mockToken',
        userid: 'mockUserId',
      },
    };

    axios.post.mockResolvedValue(mockResponse); // Mock axios post method
    // Mock useNavigate function
    const mockNavigate = jest.fn();
    require('react-router-dom').useNavigate.mockReturnValue(mockNavigate);

    const { getByText, getByPlaceholderText } = render(<Login/>, { wrapper: MemoryRouter });


    // Fill in the form fields
    fireEvent.change(getByText(/email address/i), { target: { value: 'demo@gmail.com' } });
    fireEvent.change(getByText(/password/i), { target: { value: 'demo@gmail.com' } });

    // Trigger form submission
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    // Wait for form submission and redirection
    await waitFor(() => {
        expect(axios.post).toHaveBeenCalledWith(`https://backendetracker.onrender.com/login`, {
            email: '',
            password: ''
          });
          
      expect(localStorage.getItem('token')).toBe('mockToken');
      expect(localStorage.getItem('loggedInUser')).toBe('');
      expect(localStorage.getItem('userid')).toBe('mockUserId');
      expect(mockNavigate).toHaveBeenCalledWith('/homepage');
    });
  });

  */

  // Additional tests for success and error handling can be added here
});
