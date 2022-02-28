import React, { useMemo } from "react";
import styled from "styled-components";

const Container = styled.div`
  background: #01579b;
  color: white;
`;

interface ICryptoToolbarProps {
  cryptos: {
    [key: string]: {
      USD: { PRICE: number };
    };
  };
}
const CryptoToolbar: React.FunctionComponent<ICryptoToolbarProps> = ({
  cryptos,
}) => {
  const { maxCrypto, minCrypto } = useMemo(() => {
    let max = 0;
    let maxCrypto = "";
    Object.keys(cryptos).forEach((crypto) => {
      const value = cryptos[crypto].USD.PRICE;
      if (value > max) {
        max = value;
        maxCrypto = crypto;
      }
    });
    let min = max;
    let minCrypto = "";
    Object.keys(cryptos).forEach((crypto) => {
      const value = cryptos[crypto].USD.PRICE;
      if (value < min) {
        min = value;
        minCrypto = crypto;
      }
    });
    return { maxCrypto, minCrypto };
  }, [cryptos]);
  return (
    <Container>
      <span>max: {maxCrypto}</span> - <span>min: {minCrypto}</span>
    </Container>
  );
};

export default CryptoToolbar;
