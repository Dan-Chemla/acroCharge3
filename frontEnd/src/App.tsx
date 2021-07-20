import React from 'react';
import './App.css';
import AddTransaction from './components/pages/transactions/AddTransaction';
import TransactionList from './components/pages/transactions/transactionList';

function App() {
  return (
    <div className="App">
      <AddTransaction />
      <TransactionList />
    </div>
  );
}

export default App;
