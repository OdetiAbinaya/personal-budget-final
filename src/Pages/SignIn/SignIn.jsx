import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios-https-proxy-fix';

function SignIn() {
    const [name,
        setName] = useState()
    const [email,
        setEmail] = useState()
        const [password,
            setPassword] = useState()
            const [cPassword,
                setCPassword] = useState()
        const [passwordVisible, setPasswordVisible] = useState(false); 
        const [passwordCVisible, setCPasswordVisible] = useState(false); 
        const [error, setError] = useState(''); 
        const navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault();
       if(password == cPassword){
        axios.post('https://backendetracker.onrender.com/register', {name, email, password})
        .then(result => {
            if (result.data && result.data._id) {
                navigate('/login')
            } else {
                console.log('Registration failed: Email already exists');
            }
        })
        .catch(err => {
            setError('User Already Exsists')
            console.log(err);
        });
       }
       else{
        setError("Entered Password Doesn't match")
        console.log("Incorrect Password")
       }
    }
    return (
        <div>
            {
            error!=''
            ?
            <div className="alert alert-danger text-center" role="alert"><i>{error}</i></div>
            :
            <div className="alert alert-primary text-center" role="alert"><i>Kindly fill in all the required details.</i></div>
            }
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
                                htmlFor="name"
                                className="block text-sm font-medium leading-6 text-gray-900">
                                Full Name
                            </label>
                            <div className="mt-2">
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    autoComplete="name"
                                    required
                                    className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    onChange={(e) => setName(e.target.value)}/>
                            </div>
                        </div>

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
                            <div className="relative">
                                <input
                                    id="password"
                                    name="password"
                                    type={passwordVisible ? 'text' : 'password'} // Toggle password visibility
                                    autoComplete="current-password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 px-3 py-1.5 text-sm font-medium text-gray-600"
                                    onClick={() => setPasswordVisible(!passwordVisible)} // Toggle password visibility
                                >
                                    {passwordVisible ? 'Hide' : 'Show'}
                                </button>
                            </div>
                        </div>

                        <div>
                        <div className="flex items-center justify-between">
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium leading-6 text-gray-900">
                                    Confirm Password
                                </label>
                            </div>
                            <div className="relative">
                                <input
                                    id="password"
                                    name="password"
                                    type={passwordCVisible ? 'text' : 'password'} // Toggle password visibility
                                    autoComplete="current-password"
                                    required
                                    value={cPassword}
                                    onChange={(e) => setCPassword(e.target.value)}
                                    className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 px-3 py-1.5 text-sm font-medium text-gray-600"
                                    onClick={() => setCPasswordVisible(!passwordCVisible)} // Toggle password visibility
                                >
                                    {passwordCVisible ? 'Hide' : 'Show'}
                                </button>
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
                            to="/login"
                            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                            Click here to Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default SignIn
