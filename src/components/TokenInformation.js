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
    <div className="px-8 py-6">
      <h1 className="text-3xl font-semibold mb-6">Token Information</h1>
      {isLoading ? (
        <p>Loading token information...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : tokenData ? (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <img
              src={tokenData.image.small}
              alt={tokenData.name}
              className="w-12 h-12 mr-4"
            />
            <div>
              <h2 className="text-xl font-semibold">{tokenData.name}</h2>
              <p className="text-gray-600">{tokenData.symbol}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-semibold">Current Price</p>
              <p>${tokenData.market_data.current_price.usd}</p>
            </div>
            <div>
              <p className="font-semibold">Total Supply</p>
              <p>{tokenData.market_data.total_supply}</p>
            </div>
            <div>
              <p className="font-semibold">Market Cap</p>
              <p>${tokenData.market_data.market_cap.usd}</p>
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
