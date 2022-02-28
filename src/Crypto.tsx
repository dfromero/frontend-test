import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, CryptoPricesTable } from "./styled";

interface ICrypto {}

const Crypto: React.FunctionComponent<ICrypto> = () => {
  const { crypto = "" } = useParams<"crypto">();
  const [loading, setLoading] = useState<boolean>();
  const [cryptoPrices, setCryptoPrice] = useState<{
    BTC: number;
    ETH: number;
    EUR: number;
    JPY: number;
    USD: number;
  }>();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(
      `https://min-api.cryptocompare.com/data/price?fsym=${crypto}&tsyms=USD,EUR,JPY,BTC,ETH`
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((json) => {
        setCryptoPrice(json);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <Button onClick={() => navigate(-1)}>Regresar</Button>
      {loading ? (
        "Loading"
      ) : (
        <>
          <h1>{crypto}</h1>
          {cryptoPrices && (
            <CryptoPricesTable>
              <thead>
                <tr>
                  <td>BTC</td>
                  <td>ETH</td>
                  <td>EUR</td>
                  <td>JPY</td>
                  <td>USD</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{cryptoPrices.BTC}</td>
                  <td>{cryptoPrices.ETH}</td>
                  <td>{cryptoPrices.EUR}</td>
                  <td>{cryptoPrices.JPY}</td>
                  <td>{cryptoPrices.USD}</td>
                </tr>
              </tbody>
            </CryptoPricesTable>
          )}
        </>
      )}
    </div>
  );
};

export default Crypto;
