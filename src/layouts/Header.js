import React, { useState, useContext, useEffect, useRef } from 'react';
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
  const mobileMenuRef = useRef(null); // Create a ref for the mobile menu

  useEffect(() => {
    const storedWalletAddress = localStorage.getItem('walletAddress');
    if (storedWalletAddress) {
      setWalletAddress(storedWalletAddress);
    }
  }, [setWalletAddress]);

  useEffect(() => {
    // Add or remove the 'open' class based on the showMenu state
    if (mobileMenuRef.current) {
      if (showMenu) {
        mobileMenuRef.current.classList.add('open');
      } else {
        mobileMenuRef.current.classList.remove('open');
      }
    }
  }, [showMenu]);

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
          <h1 className="text-xl font-medium uppercase hidden md:flex">
            Nordek DEX App
          </h1>
        </div>
      </Link>
      <nav className="hidden xl:flex space-x-8">
        <Link to="/" className="hover:text-gray-400">
          Swap
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
      <div className="flex items-center xl:space-x-4 space-x-7">
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
        {/* Mobile Menu Button */}
        <div className="xl:hidden">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className={`text-2xl focus:outline-none ${
              isDarkMode ? 'text-white' : 'text-[#4A4A4A]'
            }`}
          >
            {showMenu ? (
              <FontAwesomeIcon icon={faTimes} />
            ) : (
              <FontAwesomeIcon icon={faBars} />
            )}
          </button>
        </div>
      </div>
      {/* Mobile Menu Overlay */}
      {showMenu && (
        <div
          className={`mobile-menu-overlay ${isDarkMode ? 'dark-overlay' : 'light-overlay'}`}
          onClick={() => setShowMenu(false)}
        ></div>
      )}
      {/* Mobile Menu */}
      <div
        ref={mobileMenuRef}
        className={`mobile-menu ${showMenu ? 'open' : ''} ${
          isDarkMode ? 'dark-mode' : ''
        }`}
      >
        <div className="menu-items mt-12">
          <Link
            to="/"
            className="hover:text-gray-400 menu-item"
            onClick={() => setShowMenu(false)}
          >
            Swap
          </Link>
          <Link
            to="/token-management"
            className="hover:text-gray-400 menu-item"
            onClick={() => setShowMenu(false)}
          >
            Token Management
          </Link>
          <Link
            to="/token-discovery"
            className="hover:text-gray-400 menu-item"
            onClick={() => setShowMenu(false)}
          >
            Token Discovery
          </Link>
          <Link
            to="/token-information"
            className="hover:text-gray-400 menu-item"
            onClick={() => setShowMenu(false)}
          >
            Token Information
          </Link>
          <Link
            to="/transaction-history"
            className="hover:text-gray-400 menu-item"
            onClick={() => setShowMenu(false)}
          >
            Transaction History
          </Link>
        </div>
        <button
          className={`close-menu ${
            isDarkMode ? 'text-white' : 'text-[#4A4A4A]'
          }`}
          onClick={() => setShowMenu(false)}
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>
    </header>
  );
}

export default Header;
