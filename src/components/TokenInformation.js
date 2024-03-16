import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TokenInformation() {
  const [tokenData, setTokenData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTokenData = async () => {
      setIsLoading(true);

      try {
        // Fetch token data from CoinGecko API
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/coins/ethereum`
        );

        setTokenData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching token data:', error);
        setError('Failed to fetch token data. Please try again later.');
        setIsLoading(false);
      }
    };

    fetchTokenData();
  }, []);

  return (
    <div className="px-4 md:px-8 py-6 h-screen">
      <h1 className="md:text-4xl text-2xl font-semibold mb-6">
        Token Information
      </h1>
      {isLoading ? (
        <p>Loading token information...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : tokenData ? (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-6">
            <img
              src={tokenData.image.small}
              alt={tokenData.name}
              className="w-16 h-16 mr-4 rounded-full"
            />
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">
                {tokenData.name}
              </h2>
              <p className="text-gray-800 text-lg">{tokenData.symbol}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-100 rounded-lg p-4">
              <p className="font-semibold text-gray-800">Current Price</p>
              <p className="text-gray-800">
                ${tokenData.market_data.current_price.usd}
              </p>
            </div>
            <div className="bg-gray-100 rounded-lg p-4">
              <p className="font-semibold text-gray-800">Total Supply</p>
              <p className="text-gray-800">
                {tokenData.market_data.total_supply}
              </p>
            </div>
            <div className="bg-gray-100 rounded-lg p-4">
              <p className="font-semibold text-gray-800">Market Cap</p>
              <p className="text-gray-800">
                ${tokenData.market_data.market_cap.usd}
              </p>
            </div>
            {/* Additional token information can be displayed */}
          </div>
        </div>
      ) : (
        <p>No token information available</p>
      )}
    </div>
  );
}

export default TokenInformation;
