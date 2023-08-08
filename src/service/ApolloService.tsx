"use client";
import { TokenContext } from "@/context/TokenContext";
import { UserContext, UserProps } from "@/context/UserContext";
import { config_app } from "@/lib/config";
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
  const endpoint = config_app.public.assets.url;

  console.log(endpoint);

  const client = new ApolloClient({
    uri: `${endpoint}?token=${token}`,
    cache: new InMemoryCache(),
  });

  return client;
}

export function ApolloService({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState(
    typeof window !== undefined ? localStorage.getItem("token") : null
  );
  const [client, setClient] = useState<ApolloClient<NormalizedCacheObject>>(
    Apollo(token)
  );
  const [user, setUser] = useState<any>();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function verifyToken() {
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
  }

  useEffect(() => {
    verifyToken();
  }, [client, verifyToken]);

  return (
    <ApolloProvider client={client}>
      <TokenContext.Provider
        value={{
          token,
          setToken: (v: any) => {
            setToken(v);
            setClient(Apollo(v));
            verifyToken();
          },
        }}
      >
        <UserContext.Provider value={{ user, setUser }}>
          {children}
        </UserContext.Provider>
      </TokenContext.Provider>
    </ApolloProvider>
  );
}
