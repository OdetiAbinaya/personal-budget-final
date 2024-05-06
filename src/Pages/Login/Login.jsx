import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios-https-proxy-fix';
import TokenExpirationTimer from '../TokenExpirationTimer/TokenExpirationTimer';

function Login() {

    const [email,
        setEmail] = useState()
    const [password,
        setPassword] = useState()
    const navigate = useNavigate()
    const [token, setToken] = useState('');
    const [tokenExpiration, setTokenExpiration] = useState(null);
  

      const handleLogin = async () => {
        try {
            const response = await axios.post('https://backendetracker.onrender.com/login', { email, password });
            const { token, expirationTime, message } = response.data;
            if (message === "Success" && token && expirationTime) {
                const expirationDate = new Date(expirationTime * 1000);
                setToken(token);
                setTokenExpiration(expirationTime);
                localStorage.setItem('loggedInUser', email);
                localStorage.setItem('token', token);
                localStorage.setItem('Token Expiration', expirationTime);
                navigate('/dashboard')

            } else {
                console.error("Login failed:", message);
            }
        } catch (error) {
            console.error('Login failed:', error);
        }
    };
    

      
      const handleSubmit = (e) => {
        e.preventDefault();
        handleLogin();
      };

    
    return (
        <div>
            <div
                className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        className="mx-auto h-20 w-auto"
                        src="https://logowik.com/content/uploads/images/843_aletter.jpg"
                        alt="Your Company"/>
                    <h2
                        className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Sign in to your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" action="#" method="POST">

                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium leading-6 text-gray-900">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    onChange={(e) => setEmail(e.target.value)}/>
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium leading-6 text-gray-900">
                                    Password
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    onChange={(e) => setPassword(e.target.value)}/>
                            </div>
                        </div>

                        <div>
                            <button
                                onClick={handleSubmit}
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                Sign in
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Already a member?{' '}
                        <Link
                            to="/   "
                            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                            Click here to Signup
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Login
