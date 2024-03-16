// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { WalletProvider } from './contexts/WalletContext';
import Header from './layouts/Header';
import TokenManagement from './components/TokenManagement';
import TokenDiscovery from './components/TokenDiscovery';
import TokenInformation from './components/TokenInformation';
import TokenSwapping from './components/TokenSwapping';
import TransactionHistory from './components/TransactionHistory';
import './styles/main.scss'; // Import SCSS file

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [error, setError] = useState('');
  const [walletAddress, setWalletAddress] = useState('');

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  const connectWallet = async () => {
    try {
      // Check if MetaMask is installed
      if (!window.ethereum) {
        throw new Error('MetaMask not detected.');
      }

      setConnecting(true);

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

  return (
    <WalletProvider>
      <Router>
        <div
          className={`App ${isDarkMode ? 'bg-[#1e1e1e] text-white' : 'bg-[#F0F3FF] text-[#4A4A4A]'} h-screen overflow-hidden`}
        >
          <Header
            isDarkMode={isDarkMode}
            toggleDarkMode={toggleDarkMode}
            connectWallet={connectWallet}
            connecting={connecting}
            error={error}
            walletAddress={walletAddress}
          />
          <Routes>
            <Route path="/" element={<TokenSwapping />} />
            <Route path="/token-management" element={<TokenManagement />} />
            <Route path="/token-discovery" element={<TokenDiscovery />} />
            <Route path="/token-information" element={<TokenInformation />} />
            <Route
              path="/transaction-history"
              element={<TransactionHistory />}
            />
          </Routes>
        </div>
      </Router>
    </WalletProvider>
  );
}

export default App;
