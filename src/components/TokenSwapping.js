import React, { useState } from 'react';
import { motion } from 'framer-motion';

function TokenSwapping() {
  const [fromToken, setFromToken] = useState('');
  const [toToken, setToToken] = useState('');
  const [swapAmount, setSwapAmount] = useState('');
  const [estimatedReceivedAmount, setEstimatedReceivedAmount] = useState('');
  const [isSwapping, setIsSwapping] = useState(false);

  const handleSwap = async () => {
    // Placeholder logic for demonstration
    const estimatedAmount = parseFloat(swapAmount) * 1.2; // Placeholder calculation
    setEstimatedReceivedAmount(estimatedAmount.toFixed(2)); // Rounded to 2 decimal places

    // Simulating swap animation
    setIsSwapping(true);
    setTimeout(() => {
      setIsSwapping(false);
    }, 1000); // Assuming the swap animation takes 1 second
  };

  return (
    <div className="flex flex-col justify-start items-center mt-8 px-4 md:px-8">
      <h1 className="text-4xl font-bold mb-8">Token Swapping</h1>
      <div className="bg-white rounded-lg p-8 shadow-lg max-w-md w-full">
        <div className="flex flex-col space-y-4">
          <div>
            <label className="text-lg font-semibold mb-2 text-gray-800">
              From Token:
            </label>
            <input
              type="text"
              value={fromToken}
              onChange={(e) => setFromToken(e.target.value)}
              placeholder="Enter token symbol"
              className="border border-gray-300 rounded px-4 py-2 focus:outline-none w-full text-gray-800"
            />
          </div>
          <div>
            <label className="text-lg font-semibold mb-2 text-gray-800">
              To Token:
            </label>
            <input
              type="text"
              value={toToken}
              onChange={(e) => setToToken(e.target.value)}
              placeholder="Enter token symbol"
              className="border border-gray-300 rounded px-4 py-2 focus:outline-none w-full text-gray-800"
            />
          </div>
          <div>
            <label className="text-lg font-semibold mb-2 text-gray-800">
              Swap Amount:
            </label>
            <input
              type="text"
              value={swapAmount}
              onChange={(e) => setSwapAmount(e.target.value)}
              placeholder="Enter amount"
              className="border border-gray-300 rounded px-4 py-2 focus:outline-none w-full text-gray-800"
            />
          </div>
          <button
            onClick={handleSwap}
            className={`bg-blue-500 text-white py-3 rounded focus:outline-none transition duration-300 ease-in-out ${
              isSwapping ? 'cursor-not-allowed opacity-50' : 'hover:bg-blue-600'
            }`}
            disabled={isSwapping}
          >
            {isSwapping ? 'Swapping...' : 'Swap'}
          </button>
          {estimatedReceivedAmount && (
            <div className="text-lg text-center mt-4">
              <p className="text-gray-800">
                Estimated Received Amount: {estimatedReceivedAmount}
              </p>
            </div>
          )}
          {isSwapping && (
            <motion.div
              className="flex justify-center items-center mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 5l7 7-7 7M5 5l7 7-7 7"
                  />
                </svg>
              </div>
              <div className="mx-4 animate-bounce">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-blue-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 5l7 7-7 7M5 5l7 7-7 7"
                  />
                </svg>
              </div>
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 5l7 7-7 7M5 5l7 7-7 7"
                  />
                </svg>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TokenSwapping;
