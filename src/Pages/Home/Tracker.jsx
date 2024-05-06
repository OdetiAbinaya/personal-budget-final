import React from 'react';
import {IncomeExpenses} from '../../components/IncomeExpenses'
import {TransactionList} from '../../components/TransactionList'
import {GlobalProvider} from '../../context/GlobalState'
import './tracker.css'

function Tracker() {
    return (
        <GlobalProvider>
            <IncomeExpenses/>
            <div className="container">
            <TransactionList/>
            </div>
        </GlobalProvider>
    );
}

export default Tracker;
