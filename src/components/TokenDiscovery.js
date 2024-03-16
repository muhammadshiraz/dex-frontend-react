import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

function TokenDiscovery() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    if (!searchQuery) return;

    setIsLoading(true);

    try {
      // Fetch token data from an API (e.g., CoinGecko)
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${searchQuery}`
      );
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error fetching token data:', error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { value } = e.target;
    setSearchQuery(value);
    if (!value) {
      setSearchResults([]); // Clear search results when input is empty
    }
  };

  return (
    <div className="px-4 md:px-8 py-6 h-screen">
      <h1 className="md:text-4xl text-2xl font-semibold mb-6">
        Token Discovery
      </h1>
      <div className="flex items-center mb-6">
        <div className="relative flex items-center w-full md:w-1/2">
          <input
            type="text"
            placeholder="Search by name or symbol"
            value={searchQuery}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-l px-4 py-2 w-full focus:outline-none focus:ring focus:border-blue-500 text-gray-800"
          />
          <button
            onClick={handleSearch}
            disabled={isLoading}
            className={`bg-blue-500 text-white px-4 py-2 rounded-r ${
              isLoading ? 'cursor-not-allowed opacity-50' : 'hover:bg-blue-600'
            }`}
          >
            {isLoading ? 'Searching...' : <FontAwesomeIcon icon={faSearch} />}
          </button>
        </div>
      </div>
      <div>
        {searchResults.length > 0 ? (
          <ul>
            {searchResults.map((token) => (
              <li
                key={token.id}
                className="border rounded p-4 mb-4 flex items-center"
              >
                <div>
                  <h3 className="text-xl font-semibold mb-2 flex flex-row justify-start items-center">
                    <img
                      src={token.image}
                      alt={token.name}
                      className="w-8 h-8 mr-2"
                    />
                    {token.name}
                  </h3>
                  <p>
                    <span className="font-semibold">Symbol:</span>{' '}
                    {token.symbol}
                  </p>
                  <p>
                    <span className="font-semibold">Current Price:</span> $
                    {token.current_price}
                  </p>
                  {/* Additional token details can be displayed */}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          searchQuery && <p className="text-gray-600">No results found</p>
        )}
      </div>
    </div>
  );
}

export default TokenDiscovery;
