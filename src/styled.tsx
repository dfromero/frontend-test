import styled from "styled-components";

export const Button = styled.button`
  background: #ff9800;
  border: none;
  color: white;
  text-transform: uppercase;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background: #f57c00;
  }
`;

export const CryptoPricesTable = styled.table`
  td {
    padding: 10px;
  }
`;

export const AppContainer = styled.div`
  font-family: Montserrat, "sans-serif";
  color: #263238;
  background: #eceff1;
  font-size: 18px;
`;
