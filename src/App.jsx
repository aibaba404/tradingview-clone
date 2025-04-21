import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [symbol, setSymbol] = useState('AAPL');
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = async (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.length > 1) {
      try {
        const response = await axios.get(
          `https://symbol-search.tradingview.com/symbol_search/?text=${value}&hl=1&lang=en&type=`
        );
        setSuggestions(response.data);
      } catch (err) {
        console.error('Suggestion fetch failed:', err);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSelect = (item) => {
    setSymbol(item.symbol);
    setSearchTerm('');
    setSuggestions([]);
  };

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '10px', background: '#eee', position: 'relative' }}>
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder="Search stock (e.g. TSLA)"
          style={{ padding: '5px', width: '250px' }}
        />
        {suggestions.length > 0 && (
          <ul style={{
            position: 'absolute', top: '40px', left: '10px',
            background: 'white', listStyle: 'none', padding: 0,
            margin: 0, border: '1px solid #ccc', maxHeight: '200px',
            overflowY: 'auto', width: '250px', zIndex: 9999
          }}>
            {suggestions.map((item) => (
              <li key={item.symbol} onClick={() => handleSelect(item)} style={{
                padding: '8px', cursor: 'pointer', borderBottom: '1px solid #eee'
              }}>
                <strong>{item.symbol}</strong> — {item.full_name}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div style={{ flex: 1 }}>
        <iframe
          title="chart"
          src={`https://s.tradingview.com/widgetembed/?symbol=${symbol}&interval=D&hidesidetoolbar=1&symboledit=1&saveimage=1&toolbarbg=f1f3f6&studies=[]&theme=light&style=1&timezone=Etc/UTC&withdateranges=1&hideideas=1&studies_overrides={}&overrides={}&enabled_features=[]&disabled_features=[]&locale=en`}
          width="100%"
          height="100%"
          frameBorder="0"
          allowTransparency="true"
          scrolling="no"
        ></iframe>
      </div>
    </div>
  );
}

export default App;
