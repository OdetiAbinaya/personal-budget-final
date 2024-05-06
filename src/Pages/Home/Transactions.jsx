import React, { useState, useEffect } from 'react';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import Paper from '@mui/material/Paper';
import Alert from '@mui/material/Alert';
import { GlobalContext } from '../../context/GlobalState';
import axios from 'axios-https-proxy-fix';
import Nav from './Nav';


function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

export default function Transactions() {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [transactions, setTransactions] = useState([]);
  const userEmail = localStorage.getItem('loggedInUser');


  const fetchTransactions = () => {
    fetch('https://backendetracker.onrender.com/get-transactions')
      .then(res => res.json())
      .then(data => {
        setTransactions(data);
      })
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const handleRemoveTransaction = (id) => {
    axios.delete(`https://backendetracker.onrender.com/transactions/${id}`)
        .then(response => {
            fetchTransactions();
        })
        .catch(error => {
            console.error('Error deleting transaction:', error);
        });
};

  return (
    <>
    <Nav H={false} T={true}/>
    <Box sx={{ bgcolor: 'background.paper'}}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="All Transactions" {...a11yProps(0)} />
          <Tab label="Income" {...a11yProps(1)} />
          <Tab label="Expense" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className='fw-bold'>Income/Expense</TableCell>
            <TableCell className='fw-bold'>Source</TableCell>
            <TableCell className='fw-bold'>Amount</TableCell>
            <TableCell className='fw-bold text-center'>Type</TableCell>
            <TableCell className='fw-bold text-center'>Date</TableCell>
            <TableCell className='fw-bold text-center'>Remove</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { transactions.map(transaction => (
            userEmail == transaction.userEmail ?
            <TableRow key={transaction.id}>
  <TableCell>{transaction.amount < 0 ? <span className="text-danger">Expense</span> : <span className="text-success">Income</span>}</TableCell>
  <TableCell>{transaction.text}</TableCell>
  <TableCell>
    <span>{transaction.amount}</span>
  </TableCell>
  <TableCell>
    {transaction.amount < 0 ? 
      <Alert severity="error">Debited</Alert> :
      <Alert severity="success">Credited</Alert>
    }
  </TableCell>
  <TableCell className='text-center'>{transaction.createdAt}</TableCell>
  <TableCell className='text-center'>
    <button onClick={() => handleRemoveTransaction(transaction._id)}>
    <svg className='text-danger' xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
</svg>
    </button>
  </TableCell>
</TableRow>

            :
         <></>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
          <TableCell className='fw-bold'>Mode</TableCell>
            <TableCell className='fw-bold'>Source</TableCell>
            <TableCell className='fw-bold'>Amount</TableCell>
            <TableCell className='fw-bold text-center'>Type</TableCell>
            <TableCell className='fw-bold text-center'>Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { transactions.map(transaction => (
            (userEmail == transaction.userEmail && transaction.amount > 0 ) ?
            <TableRow key={transaction.id}>
                    <TableCell><span class="text-success">Income</span></TableCell>
              <TableCell>{transaction.text}</TableCell>
              <TableCell >
  <span >
    {transaction.amount}
  </span>
</TableCell>
<TableCell>{transaction.amount < 0 ? 
  <Alert severity="error">Debited</Alert>
 
: 
<Alert severity="success">Credited</Alert>

}</TableCell>
<TableCell className='text-center'>{transaction.createdAt}</TableCell>
            </TableRow>
            :
         <></>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className='fw-bold'>Mode</TableCell>
            <TableCell className='fw-bold'>Source</TableCell>
            <TableCell className='fw-bold'>Amount</TableCell>
            <TableCell className='fw-bold text-center'>Type</TableCell>
            <TableCell className='fw-bold text-center'>Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { transactions.map(transaction => (
            (userEmail == transaction.userEmail && transaction.amount < 0 ) ?
            <TableRow key={transaction.id}>
                    <TableCell><span class="text-danger">Expense</span></TableCell>
              <TableCell>{transaction.text}</TableCell>
              <TableCell >
  <span >
    {transaction.amount}
  </span>
</TableCell>
<TableCell>{transaction.amount < 0 ? 
  <Alert severity="error">Debited</Alert>
: 
<Alert severity="success">Credited</Alert>

}</TableCell>
<TableCell className='text-center'>{transaction.createdAt}</TableCell>
            </TableRow>
            :
         <></>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        </TabPanel>
      </SwipeableViews>
    </Box>
    
    </>
    
  );
}