import { createRoot } from "react-dom/client";
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { ApolloClient, HttpLink, InMemoryCache, ApolloProvider } from '@apollo/client';
import { API_BASE } from "./app/util";

const container = document.getElementById("root")!;
const root = createRoot(container);

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: API_BASE,
  }),
});

root.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApolloProvider>
);