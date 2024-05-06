import React, { useState, useEffect } from 'react';
import TokenExpirationTimer from '../TokenExpirationTimer/TokenExpirationTimer';
import { Link, useNavigate } from 'react-router-dom';

function Profile() {
    const TokenExpiration = localStorage.getItem('Token Expiration');
    const loggedInUser = localStorage.getItem('loggedInUser');
    const navigate = useNavigate();

    useEffect(() => {
        if (!loggedInUser) {
            navigate('/login');
        }
    }, []);

    const [users, setUsers] = useState([]);
    const [userName, setUserName] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://backendetracker.onrender.com/users');
                const data = await response.json();
                const userData = data.find(user => user.email === loggedInUser);
                if (userData) {
                    setUserName(userData.name);
                }
                setUsers(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [loggedInUser]);

    return (
        <div>
            <div
                className="relative overflow-hidden before:absolute before:top-0 before:start-1/2 before:bg-[url('https://preline.co/assets/svg/examples/polygon-bg-element.svg')] before:bg-no-repeat before:bg-top before:bg-cover before:size-full before:-z-[1] before:transform before:-translate-x-1/2">
                <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-10">
                    <div className="flex justify-center">
                        <section className="bg-white pt-[70px] pb-[50px] dark:bg-dark">
                            <div className="mx-auto px-4 sm:container">
                                <div className="border-l-[5px] border-primary pl-5">
                                    <h2 className="mb-2 text-2xl font-semibold text-dark dark:text-white">
                                        Profile
                                    </h2>
                                    <p className="text-sm font-medium text-body-color dark:text-dark-6">
                                        About Me: A Brief Overview
                                    </p>
                                </div>
                            </div>
                        </section>
                        <button
                            className="inline-flex items-center gap-x-2 bg-white border border-gray-200 text-sm text-gray-800 p-1 ps-3 rounded-full transition hover:border-gray-300"
                            onClick={() => navigate('/mainpage')}>
                            <i>Return to Main Page</i>
                            <span
                                className="py-1.5 px-2.5 inline-flex justify-center items-center gap-x-2 rounded-full bg-gray-200 font-semibold text-sm text-gray-600">
                                <svg
                                    className="flex-shrink-0 size-4"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                            </span>
                        </button>
                    </div>

                    <div className="mt-5 max-w-3xl text-center mx-auto">
                        <h1 className="block font-bold text-gray-800 text-4xl md:text-5xl lg:text-6xl">
                            Hello {' '}
                            <span className="bg-clip-text bg-gradient-to-tl from-blue-600 to-violet-600 text-transparent">
    {userName.charAt(0).toUpperCase() + userName.slice(1)}
</span>

                        </h1>
                    </div>

                    <div className="mt-5 max-w-3xl text-center mx-auto">
                        <p className="text-lg text-gray-600">This is the space where you can review and make adjustments to your profile information as needed.</p>
                    </div>

                    <div class="relative overflow-hidden">
                        <div class="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-2 sm:py-2">
                            <div class="text-center">
                                <div class="mt-7 sm:mt-12 mx-auto max-w-xl relative">
                                    <form>
                                    {users.map((item) => (
                                               (item.email == loggedInUser)  &&
                                               <>
                                                <div
                                            class="relative z-10 flex space-x-2 p-3 bg-white border rounded-lg shadow-lg shadow-gray-100">
                                           <a
                                        style={{width:'10vw'}}
                                        class="m-1 py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
                                        href="#">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-vcard" viewBox="0 0 16 16">
  <path d="M5 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4m4-2.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5M9 8a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4A.5.5 0 0 1 9 8m1 2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5"/>
  <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zM1 4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H8.96q.04-.245.04-.5C9 10.567 7.21 9 5 9c-2.086 0-3.8 1.398-3.984 3.181A1 1 0 0 1 1 12z"/>
</svg>
                                        Full Name
                                    </a> 
                                    <div class="d-flex justidy-content-center align-items-center w-50">
                                                <input
                                                    type="email"
                                                    name="hs-search-article-1"
                                                    id="hs-search-article-1"
                                                    class="py-2.5 px-4 block w-full border-transparent rounded-lg focus:border-blue-500 focus:ring-blue-500"
                                                    disabled
                                                    placeholder="Search article"
                                                    value={item.name}/>
                                            </div>
                                        </div>
                                        <div
                                            class="mt-4 relative z-10 flex space-x-2 p-3 bg-white border rounded-lg shadow-lg shadow-gray-100">
                                           <a
                                        class="m-1 py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
                                        style={{width:'10vw'}}
                                        href="#">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-envelope-at" viewBox="0 0 16 16">
  <path d="M2 2a2 2 0 0 0-2 2v8.01A2 2 0 0 0 2 14h5.5a.5.5 0 0 0 0-1H2a1 1 0 0 1-.966-.741l5.64-3.471L8 9.583l7-4.2V8.5a.5.5 0 0 0 1 0V4a2 2 0 0 0-2-2zm3.708 6.208L1 11.105V5.383zM1 4.217V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v.217l-7 4.2z"/>
  <path d="M14.247 14.269c1.01 0 1.587-.857 1.587-2.025v-.21C15.834 10.43 14.64 9 12.52 9h-.035C10.42 9 9 10.36 9 12.432v.214C9 14.82 10.438 16 12.358 16h.044c.594 0 1.018-.074 1.237-.175v-.73c-.245.11-.673.18-1.18.18h-.044c-1.334 0-2.571-.788-2.571-2.655v-.157c0-1.657 1.058-2.724 2.64-2.724h.04c1.535 0 2.484 1.05 2.484 2.326v.118c0 .975-.324 1.39-.639 1.39-.232 0-.41-.148-.41-.42v-2.19h-.906v.569h-.03c-.084-.298-.368-.63-.954-.63-.778 0-1.259.555-1.259 1.4v.528c0 .892.49 1.434 1.26 1.434.471 0 .896-.227 1.014-.643h.043c.118.42.617.648 1.12.648m-2.453-1.588v-.227c0-.546.227-.791.573-.791.297 0 .572.192.572.708v.367c0 .573-.253.744-.564.744-.354 0-.581-.215-.581-.8Z"/>
</svg>
                                        Email Id
                                    </a> 
                                    <div class="d-flex justidy-content-center align-items-center w-50">
                                                <input
                                                    type="email"
                                                    name="hs-search-article-1"
                                                    id="hs-search-article-1"
                                                    class="py-2.5 px-4 block w-full border-transparent rounded-lg focus:border-blue-500 focus:ring-blue-500"
                                                    placeholder="Search article"
                                                    disabled
                                                    value={item.email}/>
                                            </div>
                                        </div></>
                                    
                                ))}
                                
                    <div class="mt-8 gap-3 flex justify-center">
                        <a
                            class="inline-flex justify-center items-center gap-x-3 text-center bg-gradient-to-tl from-blue-600 to-violet-600 hover:from-violet-600 hover:to-blue-600 border border-transparent text-white text-sm font-medium rounded-md focus:outline-none focus:ring-1 focus:ring-gray-600 py-3 px-4"
                            href="#">
                            Looks Great
                            <svg  xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle" viewBox="0 0 16 16">
  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
  <path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05"/>
</svg>
                            </a>
                    </div>
                                    </form>

                                    <div
                                        class="hidden md:block absolute top-0 end-0 -translate-y-12 translate-x-20">
                                        <svg
                                            class="w-16 h-auto text-orange-500"
                                            width="121"
                                            height="135"
                                            viewBox="0 0 121 135"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M5 16.4754C11.7688 27.4499 21.2452 57.3224 5 89.0164"
                                                stroke="currentColor"
                                                stroke-width="10"
                                                stroke-linecap="round"/>
                                            <path
                                                d="M33.6761 112.104C44.6984 98.1239 74.2618 57.6776 83.4821 5"
                                                stroke="currentColor"
                                                stroke-width="10"
                                                stroke-linecap="round"/>
                                            <path
                                                d="M50.5525 130C68.2064 127.495 110.731 117.541 116 78.0874"
                                                stroke="currentColor"
                                                stroke-width="10"
                                                stroke-linecap="round"/>
                                        </svg>
                                    </div>

                                    <div
                                        class="hidden md:block absolute bottom-0 start-0 translate-y-10 -translate-x-32">
                                        <svg
                                            class="w-40 h-auto text-cyan-500"
                                            width="347"
                                            height="188"
                                            viewBox="0 0 347 188"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M4 82.4591C54.7956 92.8751 30.9771 162.782 68.2065 181.385C112.642 203.59 127.943 78.57 122.161 25.5053C120.504 2.2376 93.4028 -8.11128 89.7468 25.5053C85.8633 61.2125 130.186 199.678 180.982 146.248L214.898 107.02C224.322 95.4118 242.9 79.2851 258.6 107.02C274.299 134.754 299.315 125.589 309.861 117.539L343 93.4426"
                                                stroke="currentColor"
                                                stroke-width="7"
                                                stroke-linecap="round"/>
                                        </svg>
                                    </div>
                                </div>

                                <div class="mt-5 sm:mt-5">
                                    <Link
                                        class="m-1 py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
                                        to="/dashboard">
                                        <svg
                                            class="flex-shrink-0 size-4"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
                                        Home
                                    </Link>
                                    <Link
                                        class="m-1 py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
                                        to="/transactions">
                                        <svg
                                            class="flex-shrink-0 size-4"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/><path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/></svg>
                                        Transactions
                                    </Link>
                                    <Link
                                        class="m-1 py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
                                        to="/login">
                                        <svg
                                            class="flex-shrink-0 size-4"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"><path
                                            d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
                                        Logout
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </div>

            <h1>
                {TokenExpiration && (<TokenExpirationTimer expirationTime={TokenExpiration}/>)}
            </h1>
        </div>
    )
}

export default Profile