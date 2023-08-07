import React from "react";

export interface UserProps {
  user: {
    id: number;
    name: string;
    role: string;
    mainRole: "ADMIN" | "SELLER" | "CUSTOMER";
  } | null;
  setUser: any;
}

export const UserContext = React.createContext<UserProps>({
  user: null,
  setUser: null,
});
