import React, { useState, useEffect } from 'react';
import {IncomeExpenses} from '../../components/IncomeExpenses'
import {TransactionList} from '../../components/TransactionList'
import {GlobalProvider} from '../../context/GlobalState'
import './tracker.css'
import Nav from './Nav';
import Transaction from './Transactions';
import axios from 'axios-https-proxy-fix';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import {Link, useNavigate} from 'react-router-dom';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});



function Home() {
  const [text, setText] = useState('');
  const [amount, setAmount] = useState(0);
  const userEmail = localStorage.getItem('loggedInUser');
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate()
  const loggedInUser = localStorage.getItem('loggedInUser');
  if (loggedInUser===null) {
    navigate('/login');
}
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const onSubmit = async (e) => {
    axios
    .post('https://backendetracker.onrender.com/transactions', {userEmail,text, amount})
    .then(result => {
    })
    .catch(err => console.log(err))
  };



  return (
    loggedInUser!=null ?  <GlobalProvider>
            <Nav H={true} T={false} />
            <IncomeExpenses/>
            <div className="container">


            <React.Fragment>
      <Button onClick={handleClickOpen} style={{position:'fixed',right:20,bottom:30}}>
      <Fab color="primary" aria-label="add">
  <AddIcon />
</Fab>
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Add new transaction"}</DialogTitle>
        <DialogContent>
        <form onSubmit={onSubmit}>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <p className="mt-1 text-sm leading-6 text-gray-600">Please input a positive value when adding income and a negative value when adding expenses.</p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="source" className="block text-sm font-medium leading-6 text-gray-900">
                Name of the Source
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="source"
                  id="source"
                  autoComplete="given-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={text}
                  onChange={(e) => setText(e.target.value)}/>
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="amount" className="block text-sm font-medium leading-6 text-gray-900">
                Amount ($)
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  name="amount"
                  id="amount"
                  autoComplete="family-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  />
                  </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button type="button" className="text-sm font-semibold leading-6 text-gray-900" onClick={handleClose}>
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </form>
        </DialogContent>
      </Dialog>
    </React.Fragment>
            </div>
        </GlobalProvider>
        :
        <div className='container' style={{position:'absolute',left:'50%',top:'50%',transform:'translate(-50%,-50%)',width:'fit-content'}}>
        <button className='btn btn-primary' onClick={handleLogin}>Click Here To Login..!!</button>
        </div>
    );
}

export default Home;