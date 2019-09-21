import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from './components/Router';
import { ApolloProvider } from '@apollo/react-hooks';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import client from './state/client';
import Header from './components/Header';

const theme = createMuiTheme();

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <ApolloProvider client={client}>
        {/* Header exists here so the Router render doesn't re-render the header */}
        <Header />
        <Router />
      </ApolloProvider>
    </ThemeProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
