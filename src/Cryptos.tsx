import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CryptoToolbar from "./CryptoToolbar";
import { Button } from "./styled";

interface ICryptos {}

const Cryptos: React.FunctionComponent<ICryptos> = () => {
  const [loading, setLoading] = useState<boolean>();
  const [cryptos, setCryptos] = useState<any>();
  const [formattedData, setFormattedData] = useState<any[]>([]);
  useEffect(() => {
    const url =
      "https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC,ETH,XRP,DOGE,BNB,LTC,ADA,BUSD,BCH,VET,DOT,EOS,SOL,SRM,USDT,BTT,TRX,FIL,LINK,MATIC,UNI,NEO,CHZ,ETC,THETA,XLM,BSV,LUNA,WIN,SXP&tsyms=USD";

    fetch(url)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((json) => {
        setLoading(false);
        const cryptos = json.RAW;
        setCryptos(cryptos);
        const formattedData = Object.keys(cryptos).map((crypto) => ({
          key: crypto,
          price: cryptos[crypto]["USD"]["PRICE"],
          market_cap: cryptos[crypto]["USD"].MKTCAP,
          circulatingSupply: cryptos[crypto]["USD"].SUPPLY,
          name: cryptos[crypto]["USD"]["FROMSYMBOL"],
        }));
        setFormattedData(formattedData);
      })
      .catch((err) => console.log(err));
  }, []);

  if (loading) {
    return <div>loading...</div>;
  }

  return (
    <div className="App">
      {cryptos && <CryptoToolbar cryptos={cryptos} />}
      <div>
        <label>Filter By</label>
        <select>
          <option>Name</option>
          <option>Price</option>
          <option>Market Cap</option>
          <option>Circulating supply</option>
        </select>
      </div>
      <table>
        <tr>
          <th>Name</th>
          <th>Price</th>
          <th>Market Cap</th>
          <th>Circulating supply</th>
        </tr>

        <tbody>
          {formattedData &&
            formattedData.map((data) => (
              <tr key={data.key}>
                <td>Name: {data.name}</td>
                <td>Price: {data.price}</td>
                <td>Market Cap: {data.market_cap}</td>
                <td>Circulating supply: {data.circulatingSupply}</td>
                <td>
                  <Link to={{ pathname: `/cryptos/${data.key}` }}>
                    <Button>Ver</Button>
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Cryptos;
