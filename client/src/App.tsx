import React from "react";
import { useSelector } from "react-redux";
import { ThemeProvider } from "styled-components";
import { ApolloProvider } from "@apollo/client";
import { Routes } from "./infrastructure/routes/index.routes";
import { GlobalStyle } from "./infrastructure/styles/global";
import { RootState } from "./infrastructure/redux/store";
import { useApollo } from "./infrastructure/graphql/apollo/client.apollo";

const App: React.FC = () => {
  const { theme } = useSelector((state: RootState) => state.theme);
  // const { token, refresh_token } = useSelector((state: RootState) => state.autenticacao);

  const client = useApollo({ token: "", refresh_token: "" });

  return (
    <ThemeProvider theme={theme}>
      <ApolloProvider client={client}>
        <GlobalStyle />
        <Routes />
      </ApolloProvider>
    </ThemeProvider>
  );
};

export default App;
