import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSun,
  faMoon,
  faClipboard,
  faCheck,
} from '@fortawesome/free-solid-svg-icons';
import { WalletContext } from '../contexts/WalletContext';

function Header({ isDarkMode, toggleDarkMode }) {
  const [connecting, setConnecting] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false); // Added state to track if the address is copied
  const { walletAddress, setWalletAddress } = useContext(WalletContext);

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
    <header
      className={`text-white py-4 px-8 border-b-[0.5px] border-solid border-white flex justify-between items-center ${isDarkMode ? 'dark:bg-dark shadow-white' : 'bg-gray-600'}`}
    >
      <Link to="/">
        <div className="flex items-center">
          <img src="/logo.svg" alt="Nordek" className="w-28 mr-1" />
          <h1 className="text-lg font-medium">DEX App</h1>
        </div>
      </Link>
      <nav className="flex space-x-4">
        <Link to="/" className="hover:text-gray-400">
          Wallet Integration
        </Link>
        <Link to="/token-management" className="hover:text-gray-400">
          Token Management
        </Link>
        <Link to="/token-discovery" className="hover:text-gray-400">
          Token Discovery
        </Link>
        <Link to="/token-information" className="hover:text-gray-400">
          Token Information
        </Link>
        <Link to="/token-swapping" className="hover:text-gray-400">
          Token Swapping
        </Link>
        <Link to="/transaction-history" className="hover:text-gray-400">
          Transaction History
        </Link>
        {/* Add other route links as needed */}
      </nav>
      <div className="flex items-center space-x-4">
        {walletAddress ? (
          <p>
            Connected: {walletAddress}
            <button
              className="text-blue-500 hover:text-blue-700 focus:outline-none"
              onClick={copyToClipboard}
            >
              <FontAwesomeIcon icon={copied ? faCheck : faClipboard} />
            </button>
          </p>
        ) : (
          <button
            onClick={connectWallet}
            className="border border-white px-4 py-2 rounded-lg hover:bg-gray-800"
            disabled={connecting}
          >
            {connecting ? 'Connecting...' : 'Connect Wallet'}
          </button>
        )}
        <div>
          <button
            onClick={toggleDarkMode}
            className="text-gray-400 hover:text-black-400 text-3xl"
          >
            {isDarkMode ? (
              <FontAwesomeIcon icon={faSun} />
            ) : (
              <FontAwesomeIcon icon={faMoon} />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
