import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSun,
  faMoon,
  faClipboard,
  faCheck,
  faBars,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { WalletContext } from '../contexts/WalletContext';
import '../styles/layouts/Header.scss'; // Import SCSS file

function Header({ isDarkMode, toggleDarkMode }) {
  const [connecting, setConnecting] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const { walletAddress, setWalletAddress } = useContext(WalletContext);

  useEffect(() => {
    const storedWalletAddress = localStorage.getItem('walletAddress');
    if (storedWalletAddress) {
      setWalletAddress(storedWalletAddress);
    }
  }, [setWalletAddress]);

  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        throw new Error('MetaMask not detected.');
      }
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      if (accounts.length > 0) {
        setWalletAddress(accounts[0]);
        localStorage.setItem('walletAddress', accounts[0]);
      } else {
        throw new Error('No accounts found.');
      }
      setConnecting(false);
    } catch (error) {
      console.error(error);
    } finally {
      setConnecting(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(walletAddress);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <header
      className={`header py-4 px-8 flex justify-between items-center ${
        isDarkMode ? 'bg-dark shadow-white' : 'bg-[#FFFFFF]'
      }`}
    >
      <Link to="/">
        <div className="flex items-end">
          <img src="/logo.png" alt="Nordek" className="h-9 mr-1.5" />
          <h1 className="text-xl font-medium uppercase">Nordek DEX App</h1>
        </div>
      </Link>
      <nav className="hidden md:flex space-x-8">
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
        <Link to="/transaction-history" className="hover:text-gray-400">
          Transaction History
        </Link>
      </nav>
      <div className="flex items-center space-x-4">
        {walletAddress ? (
          <div className="flex items-center bg-[#F0F3FF] rounded-lg px-3 py-1.5">
            <div className={`${isDarkMode ? 'text-[#4A4A4A]' : ''}`}>
              {walletAddress.substring(0, 5)}...
              {walletAddress.substring(walletAddress.length - 4)}
            </div>
            <button
              className="ml-2 text-blue-500 hover:text-blue-700 focus:outline-none"
              onClick={copyToClipboard}
            >
              <FontAwesomeIcon icon={copied ? faCheck : faClipboard} />
            </button>
          </div>
        ) : (
          <button
            onClick={connectWallet}
            className="px-2 py-2 rounded-lg"
            disabled={connecting}
          >
            {connecting ? 'Connecting...' : 'Connect'}
          </button>
        )}
        <div>
          <button
            onClick={toggleDarkMode}
            className={`text-2xl ${
              isDarkMode ? 'text-white' : 'text-[#4A4A4A]'
            }`}
          >
            {isDarkMode ? (
              <FontAwesomeIcon icon={faSun} />
            ) : (
              <FontAwesomeIcon icon={faMoon} />
            )}
          </button>
        </div>
      </div>
      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="text-2xl text-[#4A4A4A] focus:outline-none"
        >
          {showMenu ? (
            <FontAwesomeIcon icon={faTimes} />
          ) : (
            <FontAwesomeIcon icon={faBars} />
          )}
        </button>
      </div>
      {/* Mobile Menu */}
      {showMenu && (
        <div className="mobile-menu top-0 h-screen">
          <div className="menu-items">
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
            <Link to="/transaction-history" className="hover:text-gray-400">
              Transaction History
            </Link>
          </div>
          <button className="close-menu" onClick={() => setShowMenu(false)}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;
