import React, { useState, useEffect,useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { PieChart } from '@mui/x-charts/PieChart';
import { BarChart } from '@mui/x-charts/BarChart';
import Box from '@mui/material/Box';
import { SparkLineChart } from '@mui/x-charts/SparkLineChart';
import { LineChart } from '@mui/x-charts/LineChart';
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';
import ApexCharts from 'apexcharts'; // Import ApexCharts library

export const IncomeExpenses = () => {
    const { transactions } = useContext(GlobalContext);
    const [transactionsData, setTransactionsData] = useState([]);
    const [allValues, setAllValues] = useState([]);
    const amounts = transactions.map(transaction => transaction.amount);
    const total = amounts.reduce((acc, item) => acc + item, 0).toFixed(2);
    const income = amounts.filter(item => item > 0).reduce((acc, item) => acc + item, 0).toFixed(2);
    const expense = (-amounts.filter(item => item < 0).reduce((acc, item) => acc + item, 0)).toFixed(2);
    const userEmail = localStorage.getItem('loggedInUser');



    const fetchTransactions = () => {
      fetch('https://backendetracker.onrender.com/get-transactions')
          .then(res => res.json())
          .then(data => {
              const filteredData = data.filter(item => item.userEmail === userEmail);
              if (filteredData.length > 0) {
                  setTransactionsData(filteredData);
                  const values = filteredData.map(item => item.amount);
                  setAllValues(values);
              } else {
                  console.log('User data not found in transactions.');
                  setTransactionsData([]);
              }
          })
          .catch(err => console.error(err));
  };
  
  useEffect(() => {
      if (userEmail) {
          fetchTransactions();
      }
  }, [userEmail]);
  
    
// Filter transactions based on their amount
const positiveTransactions = transactionsData.filter(transaction => transaction.amount > 0);
const negativeTransactions = transactionsData.filter(transaction => transaction.amount < 0);

// Calculate the total amount for positive and negative transactions
const totalPositiveAmount = positiveTransactions.reduce((total, transaction) => total + transaction.amount, 0);
const totalNegativeAmount = negativeTransactions.reduce((total, transaction) => total + transaction.amount, 0);

// Calculate the overall total amount
const totalAmount = transactionsData.reduce((total, transaction) => total + transaction.amount, 0);

// Calculate average income and expense
const averageIncome = totalPositiveAmount / positiveTransactions.length;
const averageExpense = Math.abs(totalNegativeAmount) / negativeTransactions.length;

// Assume percentage difference (you can adjust these values)
const incomePercentageDifference = 0.1; // 10% decrease
const expensePercentageDifference = 0.1; // 10% increase

// Apply adjustment factor (you can adjust these values)
const adjustmentFactor = 0.05; // ±5% adjustment

// Calculate expected income and expense
const expectedIncome = averageIncome * (1 - incomePercentageDifference + Math.random() * adjustmentFactor * 2);
const expectedExpense = averageExpense * (1 + expensePercentageDifference + Math.random() * adjustmentFactor * 2);

const seriesData = [
    { value: parseFloat(totalAmount), label: 'CURRENT' },
    { value: parseFloat(totalPositiveAmount), label: 'INCOME' },
    { value: parseFloat(Math.abs(totalNegativeAmount)), label: 'EXPENSE' }
];

 

    return (
        <div className='container'>
<div className="row d-flex justify-content-evenly align-items-stretch mt-3">
<div className="col-12 col-md-4 col-lg-4" >
<ProductCard price={totalAmount} title="Current Balance" color="#02b2af" desc="This represents the entirety of funds available or remaining"/>
</div>
<div className="col-12 col-md-4 col-lg-4" >
<ProductCard price={totalPositiveAmount} title="Income" color="#2e96ff" desc="The source or means from which funds are acquired"/>
</div>
  <div className="col-12 col-md-4 col-lg-4" >
  <ProductCard price={Math.abs(totalNegativeAmount)} title="Expense" color="#b800d8" desc="The method or avenue through which funds are spent or utilized"/>
  </div>
            </div>

            <div className="row d-flex justify-content-evenly align-items-stretch mt-3">
  <div className="col-12 col-md-5 col-lg-5 d-flex" style={{ boxShadow: "rgba(136, 165, 191, 0.48) 6px 2px 16px 0px, rgba(255, 255, 255, 0.8) -6px -2px 16px 0px", backgroundColor: '#f6fbff' }}> 
      <PieChart
      className='mt-2 fs-6'
        series={[
          {
            data: seriesData,
            innerRadius: 30,
            outerRadius: 100,
            paddingAngle: 5,
            cornerRadius: 5,
            startAngle: -180,
            endAngle: 180,
            cx: 150,
            cy: 150,
          }
        ]}
        width={'390'}
        height={'300'}
      />
  </div>
  <div className="col-12 col-md-5 col-lg-5" style={{ boxShadow: "rgba(136, 165, 191, 0.48) 6px 2px 16px 0px, rgba(255, 255, 255, 0.8) -6px -2px 16px 0px", backgroundColor: '#f6fbff' }}> 
  <div className="pt-5 px-5 text-center" >
  <BarChart
  xAxis={[{ scaleType: 'band', data: ['CURRENT', 'INCOME', 'EXPENSE'] }]}
  series={[
    { data: [totalAmount * 0.9, expectedIncome, expectedExpense * 0.6], label: 'Expected' },
    { data: [totalAmount, totalPositiveAmount, Math.abs(totalNegativeAmount)], label: 'Actual' }
  ]}
  width={'300'}
  height={'300'}
/>
    </div>
  </div>

  <div className="mt-3 col-12 col-md-5 col-lg-5" style={{ boxShadow: "rgba(136, 165, 191, 0.48) 6px 2px 16px 0px, rgba(255, 255, 255, 0.8) -6px -2px 16px 0px", backgroundColor: '#f6fbff' }}> 
  <div className="pt-5 px-5 text-center" >
  {/* <Box sx={{ flexGrow: 1 }}>
  <SparkLineChart data={allValues} height={100} area />
</Box> */}
<label className='fw-400' style={{fontSize:'2em'}}><i>All Transactions From <b className='text-warning'>Start</b> to <b className='text-success'>End</b></i></label>
    <LineChart
      xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
      label="Hello"
      series={[
        {
          data:allValues,
        },
      ]}
      width={500}
      height={300}
    />
{/* <Gauge width={300} height={300} value={60} 
 innerRadius="80%"
 outerRadius="100%"
 cornerRadius="50%"
 sx={(theme) => ({
   [`& .${gaugeClasses.valueText}`]: {
     fontSize: 40,
   },
   [`& .${gaugeClasses.valueArc}`]: {
     fill: '#52b202',
   },
   [`& .${gaugeClasses.referenceArc}`]: {
     fill: theme.palette.text.disabled,
   },
 })}
 />
  */}


</div>
  </div>
</div>
        </div>
    )
}






const ProductCard = ({ price, title,color,desc }) => (
  <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
      <div className="rounded-2xl bg-gray-50 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
          <div className="mx-auto max-w-xs px-8">
              <h1 className="text-base font-semibold text-gray-600 fw-bold fs-5">{title}</h1>
              <p className="mt-6 flex items-baseline justify-center gap-x-2" style={{color:color}}>
              <span className="text-3xl font-semibold leading-6 tracking-wide">$</span>
                  <span className="text-5xl font-bold tracking-tight">{price}</span>
              </p>
              <p className="mt-6 text-md leading-5 ">
                 <i>{desc}</i>
              </p>
          </div>
      </div>
  </div>
);