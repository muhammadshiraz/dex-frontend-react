import React from 'react';
import TokenSwapping from '../components/TokenSwapping';
import LivePriceChart from '../components/LivePriceChart';

const Main = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-4 md:px-8 max-h-full pb-12">
      <div className="md:col-span-2">
        <LivePriceChart />
      </div>
      <div className="md:col-span-1">
        <TokenSwapping />
      </div>
    </div>
  );
};

export default Main;
