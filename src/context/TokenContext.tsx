import React from "react";

export interface TokenProps {
  token: string | null;
  setToken: any;
}

export const TokenContext = React.createContext<TokenProps>({
  token: null,
  setToken: null,
});
