import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import Stack from '@mui/material/Stack';
import axios from 'axios-https-proxy-fix';

function TokenExpirationTimer({ expirationTime }) {
  const [remainingTime, setRemainingTime] = useState(expirationTime);
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const trigger = useRef(null);
  const modal = useRef(null);
  const [token, setToken] = useState('');
  const [tokenExpiration, setTokenExpiration] = useState(null);
  const userEmail = localStorage.getItem('loggedInUser');
  const tokenExpirationStore = localStorage.getItem('Token Expiration');

  useEffect(() => {
    setRemainingTime(tokenExpirationStore);
  }, [tokenExpirationStore]);

  const calculateRemainingTime = () => {
    const now = Math.floor(Date.now() / 1000);
    return tokenExpirationStore - now;
  };

  const updateRemainingTime = () => {
    const timeLeft = calculateRemainingTime();
    setRemainingTime(timeLeft);

    if (timeLeft <= 0) {
      localStorage.setItem('loggedInUser', '');
      localStorage.setItem('token', '');
      localStorage.setItem('Token Expiration', '');      
      navigate('/login');
      clearTimeout(timeoutId);
    }

    if(timeLeft > 19 && timeLeft < 21){
        setModalOpen(true);
    }
    
    if(timeLeft >  21){
      setModalOpen(false);
    }
  };

  const timeoutId = setTimeout(updateRemainingTime, 1000);

  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;
  const remainingTimeString = `${minutes} minutes ${seconds} seconds`;

  const handleTokenRefresh = async () => {
    try {
      const response = await axios.post('https://backendetracker.onrender.com/updatetoken', {userEmail} );
      const { token, expirationTime, message } = response.data;
      if (message === "Success" && token && expirationTime) {
          const expirationDate = new Date(expirationTime * 1000);
          console.log("Token expires at:", expirationDate);
          setToken(token);
          setTokenExpiration(expirationTime);
          localStorage.setItem('token', token);
          localStorage.setItem('Token Expiration', expirationTime);
          setRemainingTime(expirationTime);
      } else {
          console.error("Login failed:", token);
      }
    } catch (error) {
        console.error('Login failed:', token);
    }
  };


  return (
    <div>
      <div className="container mx-auto ">
        <div
          className={`fixed left-0 top-0 flex h-full min-h-screen w-full items-center justify-center bg-dark/90 px-4 py-5 ${
            modalOpen ? "block" : "hidden"
          }`}
          style={{backgroundColor:'#00000073',zIndex:9999}}
          >
          <div
            ref={modal}
            onFocus={() => setModalOpen(true)}
            onBlur={() => setModalOpen(false)}
            className="w-full max-w-[570px] rounded-[20px] bg-white px-8 py-12 text-center dark:bg-dark-2 md:px-[70px] md:py-[60px]"
          >
            <h3 className="pb-[18px] text-xl font-semibold text-dark dark:text-white sm:text-2xl">
              Your Token Is About To Expire
            </h3>
            <span
              className={`mx-auto mb-6 inline-block h-1 w-[90px] rounded bg-primary`}
            ></span>
            <p className="mb-10 text-base leading-relaxed text-body-color dark:text-dark-6">
               In order to proceed with your browsing, please refresh to update the token.
               <br/>
               <br/>
               Here the token expires in: <i>{remainingTimeString} </i>
            </p>
            <div className="-mx-3 flex flex-wrap">
              <div className="w-1/2 px-3">
                <button
                  onClick={() => setModalOpen(false)}
                  className="block w-full rounded-md border border-stroke p-3 text-center text-base font-medium text-dark transition hover:border-red-600 hover:bg-red-600 hover:text-white dark:text-white"
                >
                  Cancel
                </button>
              </div>
              <div className="w-1/2 px-3">
                <button className="block w-full rounded-md border border-primary bg-primary p-3 text-center text-base font-medium text-white transition hover:bg-blue-dark" onClick={handleTokenRefresh}>
                  <a> Refresh </a>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      

      <Alert
        className="py-3"
        severity={remainingTime <= 20 ? 'warning' : 'success'}
        style={{ position: 'fixed', top: 60, right: 0 }}
      >
        <span  className="d-flex align-items-center">
        Here the token expires in: {remainingTimeString} 
       <svg onClick={handleTokenRefresh} style={{fontWeight:'bold'}} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-arrow-clockwise ms-5" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z"/>
  <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466"/>
</svg>
        </span>
      </Alert>
    </div>
  );
}

export default TokenExpirationTimer;
