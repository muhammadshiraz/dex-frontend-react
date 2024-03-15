import React, { useState, useContext, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faWallet,
  faClipboard,
  faCheck,
} from '@fortawesome/free-solid-svg-icons';
import { WalletContext } from '../contexts/WalletContext';

function Wallet() {
  const [connecting, setConnecting] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false); // Added state to track if the address is copied
  const { walletAddress, setWalletAddress } = useContext(WalletContext);

  useEffect(() => {
    // Check if wallet address is stored in local storage
    const storedWalletAddress = localStorage.getItem('walletAddress');
    if (storedWalletAddress) {
      setWalletAddress(storedWalletAddress);
    }
  }, [setWalletAddress]);

  const connectWallet = async () => {
    try {
      // Check if MetaMask is installed
      if (!window.ethereum) {
        throw new Error('MetaMask not detected.');
      }

      // Request accounts from MetaMask
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      // Check if user has provided accounts
      if (accounts.length > 0) {
        // Update wallet address and store it in local storage
        setWalletAddress(accounts[0]);
        localStorage.setItem('walletAddress', accounts[0]);
      } else {
        throw new Error('No accounts found.');
      }

      // Reset error state if previously set
      setError('');
    } catch (error) {
      // Handle errors
      console.error(error);
      setError('Error connecting wallet. Please try again.');
    } finally {
      // Set connecting state to false
      setConnecting(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(walletAddress);
    setCopied(true); // Set copied state to true when address is copied
    setTimeout(() => {
      setCopied(false); // Reset copied state after 2 seconds
    }, 2000);
  };

  return (
    <div className="flex justify-center items-center h-full">
      <div className="bg-gray-800 rounded-md p-8 w-full max-w-md">
        <div className="flex justify-center items-center mb-4">
          <FontAwesomeIcon
            icon={faWallet}
            className="text-5xl text-blue-500 mr-4"
          />
          <h1 className="text-3xl font-semibold text-white">
            Wallet Integration
          </h1>
        </div>
        <div className="flex items-center justify-center mb-4">
          {walletAddress ? (
            <div className="flex flex-col justify-between items-center">
              <p className="text-green-600">Connected: {walletAddress}</p>
              <button
                className="text-blue-500 hover:text-blue-700 focus:outline-none"
                onClick={copyToClipboard}
              >
                <FontAwesomeIcon icon={copied ? faCheck : faClipboard} />
              </button>
            </div>
          ) : (
            <>
              <div className="flex flex-col justify-between items-center">
                <button
                  onClick={connectWallet}
                  className={`inline-block px-6 py-3 rounded-md text-white font-semibold ${
                    connecting
                      ? 'bg-gray-500 cursor-not-allowed'
                      : 'bg-blue-500 hover:bg-blue-600'
                  }`}
                  disabled={connecting}
                >
                  {connecting ? 'Connecting...' : 'Connect Wallet'}
                </button>
                {error && <p className="text-red-600 mt-3">{error}</p>}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Wallet;
