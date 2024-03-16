import React, { useEffect } from 'react';
import { createChart } from 'lightweight-charts';

const LivePriceChart = () => {
  useEffect(() => {
    const chartContainer = document.getElementById('tv_chart_container');

    if (!chartContainer) return;

    const chart = createChart(chartContainer, {
      width: chartContainer.offsetWidth,
      height: 368, // Reduced height for smaller screens
      layout: {
        backgroundColor: '#f5f5f5', // Light background color
        textColor: '#333', // Dark text color
      },
      grid: {
        vertLines: {
          color: '#e0e0e0', // Light gray vertical grid lines
        },
        horzLines: {
          color: '#e0e0e0', // Light gray horizontal grid lines
        },
      },
    });

    // Add area series for a filled background effect
    const areaSeries = chart.addAreaSeries({
      topColor: 'rgba(75, 192, 192, 0.4)', // Semi-transparent green color for the area
      bottomColor: 'rgba(75, 192, 192, 0)', // Transparent bottom color
      lineColor: '#4CAF50', // Green line color
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
        areaSeries.setData(prices);
      })
      .catch((error) => console.error('Error fetching price data:', error));

    // Resize the chart when the window size changes
    const resizeChart = () => {
      chart.resize(chartContainer.offsetWidth, 300); // Adjust height for smaller screens
    };

    window.addEventListener('resize', resizeChart);

    return () => {
      window.removeEventListener('resize', resizeChart);
      chart.remove();
    };
  }, []);

  return (
    <>
      <h2 className="md:text-4xl text-2xl font-bold mb-8 mt-8 text-center">
        Bitcoin Price Chart (7 Days)
      </h2>
      <div
        id="tv_chart_container"
        className="shadow-lg bg-white rounded-lg"
        style={{ width: '100%', height: '368px', minHeight: '200px' }} // Added min height for smaller screens
      ></div>
    </>
  );
};

export default LivePriceChart;
