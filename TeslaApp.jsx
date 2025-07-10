import React, { useState, useEffect } from "react";

export default function TeslaApp() {
  const [selectedPlan, setSelectedPlan] = useState("");
  const [coinPrices, setCoinPrices] = useState({ BTC: 0, ETH: 0, USDT: 1, TESLA: 0 });

  useEffect(() => {
    fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,tether,tesla-token&vs_currencies=usd")
      .then(res => res.json())
      .then(data => {
        setCoinPrices({
          BTC: data.bitcoin.usd,
          ETH: data.ethereum.usd,
          USDT: data.tether.usd,
          TESLA: data['tesla-token']?.usd || 0
        });
      });
  }, []);

  return (
    <div style={{ maxWidth: 400, margin: '0 auto', padding: 20 }}>
      <h1 style={{ color: '#c11d1d', fontSize: '1.8em', marginBottom: 20 }}>Teslauniquefinance.co</h1>

      <div style={{ marginBottom: 20 }}>
        <h3>Select Investment Plan</h3>
        <select onChange={(e) => setSelectedPlan(e.target.value)} style={{ width: '100%', padding: 10 }}>
          <option value="">-- Select a Plan --</option>
          <option value="Basic">Basic ($100 - $400) - 10% return</option>
          <option value="Silver">Silver ($500 - $900) - 15% return</option>
          <option value="Gold">Gold ($1000 - $4000) - 25% return</option>
          <option value="Premium">Premium ($5000 - $20000) - 40% return</option>
        </select>
        {selectedPlan && (
          <div style={{ marginTop: 10, background: '#eef', padding: 10 }}>
            Selected: {selectedPlan} Plan
          </div>
        )}
      </div>

      <div style={{ marginBottom: 20 }}>
        <h3>Live Coin Prices (USD)</h3>
        <ul>
          <li>Bitcoin (BTC): ${coinPrices.BTC}</li>
          <li>Ethereum (ETH): ${coinPrices.ETH}</li>
          <li>Tether (USDT): ${coinPrices.USDT}</li>
          <li>Tesla Coin (TESLA): ${coinPrices.TESLA}</li>
        </ul>
      </div>

      <button
        style={{ width: '100%', padding: 12, backgroundColor: '#28a745', color: '#fff', border: 'none' }}
        onClick={() => {
          if (!selectedPlan) return alert("Please select a plan before continuing.");
          window.open(`https://t.me/Elonprivatechat008?start=I'm interested in the ${encodeURIComponent(selectedPlan)} plan`, "_blank");
        }}
      >
        Proceed to Telegram
      </button>
    </div>
  );
}
