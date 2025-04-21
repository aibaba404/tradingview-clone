// src/components/ChartComponent.jsx
import React, { useEffect, useRef } from 'react';

const ChartComponent = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/tv.js';
    script.async = true;
    script.onload = () => {
      new window.TradingView.widget({
        container_id: containerRef.current.id,
        width: '100%',
        height: 500,
        symbol: 'NASDAQ:AAPL',
        interval: 'D',
        timezone: 'Etc/UTC',
        theme: 'light',
        style: '1',
        locale: 'en',
        toolbar_bg: '#f1f3f6',
        enable_publishing: false,
        allow_symbol_change: true,
        hide_side_toolbar: false,
        details: true,
        hotlist: true,
        calendar: true,
        studies: ['MACD@tv-basicstudies'],
      });
    };
    document.body.appendChild(script);
  }, []);

  return <div id="tradingview_chart" ref={containerRef} />;
};

export default ChartComponent;
