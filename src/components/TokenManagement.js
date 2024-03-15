import React, { useState, useEffect } from 'react';
import Web3 from 'web3';

function TokenManagement() {
  const [ethBalance, setEthBalance] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const handleAccountsChanged = (accounts) => {
      console.log('Accounts changed:', accounts);
      if (accounts.length > 0) {
        console.log('Account connected:', accounts[0]);
        getEthBalance(accounts[0]);
      } else {
        console.log('No accounts found');
        setEthBalance('');
      }
    };

    const fetchData = async () => {
      try {
        // Check if MetaMask is installed
        if (!window.ethereum) {
          throw new Error('MetaMask not detected.');
        }

        // Check if MetaMask is already connected
        if (window.ethereum.selectedAddress) {
          console.log('MetaMask already connected');
          await getEthBalance(window.ethereum.selectedAddress);
        } else {
          console.log('MetaMask not connected');
          // If MetaMask is not connected, add event listener to detect connection
          window.ethereum.on('accountsChanged', handleAccountsChanged);
        }
      } catch (error) {
        setError('Error fetching data. Please try again.');
        console.error(error);
      }
    };

    fetchData();

    // Cleanup function
    return () => {
      window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
    };
  }, []);

  const getEthBalance = async (account) => {
    try {
      console.log('Fetching balance for account:', account);
      const web3 = new Web3(window.ethereum);
      const balance = await web3.eth.getBalance(account);
      console.log('Balance:', balance);
      setEthBalance(web3.utils.fromWei(balance, 'ether'));
    } catch (error) {
      setError('Error fetching ETH balance. Please try again.');
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-6">Token Management</h1>
      {error && <p className="text-red-600">{error}</p>}
      <div className="bg-white rounded-md shadow-md p-4">
        <p className="text-lg font-semibold mb-2">ETH Balance</p>
        <p className="text-2xl text-right">{ethBalance} ETH</p>
      </div>
    </div>
  );
}

export default TokenManagement;
