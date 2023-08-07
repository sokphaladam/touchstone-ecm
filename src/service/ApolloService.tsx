"use client";
import { UserContext, UserProps } from "@/context/UserContext";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  NormalizedCacheObject,
  gql,
} from "@apollo/client";
import { useEffect, useState } from "react";

const QUERY = gql`
  query {
    merchant {
      id
      name
      role
    }
    admin {
      id
      name
      role
    }
    me {
      id
      name
    }
  }
`;

export function Apollo(token?: string | null) {
  const endpoint = process.env.endpoint;

  console.log(endpoint);

  const client = new ApolloClient({
    uri: `${endpoint}?token=${token}`,
    cache: new InMemoryCache(),
  });

  return client;
}

export function ApolloService({ children }: { children: React.ReactNode }) {
  const token =
    typeof window !== undefined ? localStorage.getItem("token") : null;
  const [client, setClient] = useState<ApolloClient<NormalizedCacheObject>>(
    Apollo(token)
  );
  const [user, setUser] = useState<any>();

  useEffect(() => {
    client
      .query({
        query: QUERY,
      })
      .then((result) => {
        if (result.data) {
          if (result.data.merchant) {
            setUser({ ...result.data.merchant, mainRole: "SELLER" });
          }

          if (result.data.admin) {
            setUser({ ...result.data.admin, mainRole: "ADMIN" });
          }

          if (result.data.me) {
            setUser({ ...result.data.me, mainRole: "CUSTOMER" });
          }
        }
      });
  }, [client]);

  return (
    <ApolloProvider client={client}>
      <UserContext.Provider value={{ user, setUser }}>
        {children}
      </UserContext.Provider>
    </ApolloProvider>
  );
}
