import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { WebSocketLink } from 'apollo-link-ws';
import { HttpLink } from 'apollo-link-http';
import { split } from 'apollo-link';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from '@apollo/react-hooks';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { getMainDefinition } from 'apollo-utilities';

const wsLink = new WebSocketLink({
    uri: `wss://react.eogresources.com/graphql`,
    options: {
      reconnect: true
    }
  });

  const httpLink = new HttpLink({
    uri: 'https://react.eogresources.com/graphql'
  });

  const link = split(
    // split based on operation type
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      );
    },
    wsLink,
    httpLink
  );

  const client = new ApolloClient({
    link,
    cache: new InMemoryCache()
  });

ReactDOM.render(
    (
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
    ),
     document.getElementById('root'));
