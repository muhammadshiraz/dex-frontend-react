import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { getTransactionHistory } from '../utils/web3'; // Import the function

function TransactionHistory() {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState('');

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

        setTransactions(fetchedTransactions);
      } catch (error) {
        console.error(error);
        setError('Error fetching transaction history. Please try again.');
      }
    };

    fetchTransactionHistory();
  }, []);

  return (
    <div className="px-8 py-6">
      <h1 className="text-3xl font-semibold mb-6">Transaction History</h1>
      {error && <p className="text-red-600">{error}</p>}
      {transactions.length === 0 ? (
        <p className="text-gray-600">No transactions found.</p>
      ) : (
        <div className="overflow-auto max-h-96">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="text-left border-b border-gray-300 py-2">
                  Date
                </th>
                <th className="text-left border-b border-gray-300 py-2">
                  From
                </th>
                <th className="text-left border-b border-gray-300 py-2">To</th>
                <th className="text-left border-b border-gray-300 py-2">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction, index) => (
                <tr key={index} className="border-b border-gray-300">
                  <td className="py-3">
                    {transaction &&
                      format(
                        new Date(transaction.timestamp * 1000),
                        'MM/dd/yyyy HH:mm:ss'
                      )}
                  </td>
                  <td className="py-3">{transaction.from}</td>
                  <td className="py-3">{transaction.to}</td>
                  <td className="py-3">{transaction.value} ETH</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default TransactionHistory;
