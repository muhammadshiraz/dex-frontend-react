import React, { useState, useEffect, useMemo } from 'react';
import { format } from 'date-fns';
import { getTransactionHistory } from '../utils/web3'; // Import the function

function TransactionHistory() {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState('');

  const dummyTransactions = useMemo(
    () => [
      {
        timestamp: Date.now() / 1000 - 3600, // 1 hour ago
        from: '0x123...',
        to: '0x456...',
        value: 0.5, // ETH
      },
      {
        timestamp: Date.now() / 1000 - 7200, // 2 hours ago
        from: '0x789...',
        to: '0xabc...',
        value: 1.2, // ETH
      },
      // Add more dummy transactions as needed
    ],
    []
  );

  useEffect(() => {
    const fetchTransactionHistory = async () => {
      try {
        if (!window.ethereum) {
          throw new Error('Metamask not installed.');
        }

        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });

        if (!accounts.length) {
          throw new Error('No accounts found.');
        }

        const address = accounts[0];
        console.log('Fetching transactions for address:', address);

        const fetchedTransactions = await getTransactionHistory(address); // Call the function to get transactions
        console.log('Fetched transactions:', fetchedTransactions);

        if (fetchedTransactions.length === 0) {
          // If no transactions found, set dummy transactions
          setTransactions(dummyTransactions);
        } else {
          // Otherwise, set fetched transactions
          setTransactions(fetchedTransactions);
        }
      } catch (error) {
        console.error(error);
        setError('Error fetching transaction history. Please try again.');
      }
    };

    fetchTransactionHistory();
  }, [dummyTransactions]);

  return (
    <div className="px-4 py-6 md:px-8">
      <h1 className="text-3xl font-semibold mb-6">Transaction History</h1>
      {error && <p className="text-red-600">{error}</p>}
      <div className="overflow-auto max-h-96">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="text-left border-b border-gray-300 py-2">Date</th>
              <th className="text-left border-b border-gray-300 py-2">From</th>
              <th className="text-left border-b border-gray-300 py-2">To</th>
              <th className="text-left border-b border-gray-300 py-2">
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
            {(transactions.length === 0 ? dummyTransactions : transactions).map(
              (transaction, index) => (
                <tr key={index} className="border-b border-gray-300">
                  <td className="py-3">
                    {format(
                      new Date(transaction.timestamp * 1000),
                      'MM/dd/yyyy HH:mm:ss'
                    )}
                  </td>
                  <td className="py-3">{transaction.from}</td>
                  <td className="py-3">{transaction.to}</td>
                  <td className="py-3">{transaction.value} ETH</td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TransactionHistory;
