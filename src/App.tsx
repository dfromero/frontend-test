import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Cryptos from "./Cryptos";
import Crypto from "./Crypto";
import { AppContainer } from "./styled";
import AuthProvider, { RequireAuth } from "./AuthProvider";
import Login from "./Login";

interface IProps {}

const App: React.FunctionComponent<IProps> = () => {
  return (
    <AuthProvider>
      <Router>
        <AppContainer>
          <Routes>
            <Route path="/" element={<Login />} />
          </Routes>
          <Routes>
            <Route
              path="/cryptos"
              element={
                <RequireAuth>
                  <Cryptos />
                </RequireAuth>
              }
            />
          </Routes>
          <Routes>
            <Route
              path="/cryptos/:crypto"
              element={
                <RequireAuth>
                  <Crypto />
                </RequireAuth>
              }
            />
          </Routes>
        </AppContainer>
      </Router>
    </AuthProvider>
  );
};

export default App;
