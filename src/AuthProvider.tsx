import React from "react";
import { useAuth } from "./hooks";
import { useLocation, Navigate } from "react-router-dom";

interface IProps {}

interface IAuthContextType {
  user: any;
  signin: (user: string, callback: VoidFunction) => void;
  signout: (callback: VoidFunction) => void;
}
export let AuthContext = React.createContext<IAuthContextType>(null!);

const AuthProvider: React.FunctionComponent<IProps> = ({ children }) => {
  let [user, setUser] = React.useState<any>(null);

  let signin = (newUser: string, callback: VoidFunction) => {
    return setTimeout(() => {
      setUser(newUser);
      callback();
    }, 2000);
  };

  let signout = (callback: VoidFunction) => {
    return setTimeout(() => {
      setUser(null);
      callback();
    }, 2000);
  };
  let value = { user, signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const RequireAuth = ({ children }: { children: JSX.Element }) => {
  let auth = useAuth();
  let location = useLocation();

  if (!auth.user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};

export default AuthProvider;
