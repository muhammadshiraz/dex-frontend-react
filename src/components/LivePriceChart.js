import React, { useEffect } from 'react';
import { createChart } from 'lightweight-charts';

const LivePriceChart = () => {
  useEffect(() => {
    const chartContainer = document.getElementById('tv_chart_container');

    if (!chartContainer) return;

    const chart = createChart(chartContainer, {
      width: chartContainer.offsetWidth,
      height: 400,
      layout: {
        backgroundColor: '#292d3e', // Dark background color
        textColor: '#ffffff', // White text color
      },
      grid: {
        vertLines: {
          color: '#43485c', // Dark gray vertical grid lines
        },
        horzLines: {
          color: '#43485c', // Dark gray horizontal grid lines
        },
      },
    });

    const lineSeries = chart.addLineSeries({
      color: '#4CAF50', // Green color for the price line
    });

    fetch(
      'https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=7'
    )
      .then((response) => response.json())
      .then((data) => {
        const prices = data.prices.map((item) => ({
          time: item[0], // Assuming the first element is the timestamp
          value: item[1], // Assuming the second element is the price
        }));
        lineSeries.setData(prices);
      })
      .catch((error) => console.error('Error fetching price data:', error));

    return () => {
      chart.remove();
    };
  }, []);

  return (
    <div id="tv_chart_container" style={{ width: '100%', height: '400px' }}>
      <h2
        style={{
          textAlign: 'center',
          margin: '20px 0',
          color: '#4CAF50',
          fontFamily: 'Arial, sans-serif',
          fontSize: '24px',
        }}
      >
        Bitcoin Price Chart (7 Days)
      </h2>
    </div>
  );
};

export default LivePriceChart;
