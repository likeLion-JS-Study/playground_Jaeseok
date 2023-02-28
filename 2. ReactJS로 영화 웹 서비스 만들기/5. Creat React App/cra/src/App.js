import { useState, useEffect } from 'react';

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [cost, setCost] = useState(1);
  const [need, setNeed] = useState(0);

  const onChange = (e) => {
    setCost(e.target.value);
    setNeed(1);
  }

  const handleInput = (e) => {
    setNeed(e.target.value)
    console.log(need);
  }

  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, [])
  return (
    <>
      <h1>The Coins!({loading ? "" : `Here are ..${coins.length} coins`})</h1>
      {loading ?
        <strong>Loading...</strong>
        :
        <select onChange={onChange}>
          <option>Select Coin!</option>
          {coins.map((coin) => 
            <option key={coin.id} value={coin.quotes.USD.price}>
              {coin.name} ({coin.symbol}) : ${coin.quotes.USD.price}
            </option>
          )}
        </select>
      }
      <h2>Please enter the amount</h2>
      <div>
        <input value={need} onChange={handleInput} type="number" placeholder='input amount of money' />$
      </div>
      <h2>You can get {need / cost}</h2>
    </>
  );
}

export default App;