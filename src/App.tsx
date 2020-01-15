import React, { Component } from 'react';
import createStore from './store';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import Wrapper from './components/Wrapper';
import NowWhat from './components/NowWhat';
import ChartCard from './components/ChartCard';
import ChartMenu from './components/ChartMenu';
import Chart from 'react-apexcharts';
import { WebSocketLink } from 'apollo-link-ws';
import { split} from 'apollo-link';
import ApolloClient from 'apollo-boost';
import { gql } from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const store = createStore();
const theme = createMuiTheme({
  palette: {
    primary: {
      main: 'rgb(39,49,66)',
    },
    secondary: {
      main: 'rgb(197,208,222)',
    },
    background: {
      default: 'rgb(226,231,238)',
    },
  },
});

const wsLink = new WebSocketLink({
  uri: `ws://localhost:5000/`,
  options: {
    reconnect: true
  }
});

const client = new ApolloClient({
  uri: `https://react.eogresources.com/graphql`
})

client.query({
  query: gql`
  {getMetrics}
  `
})
.then((res) => console.log(res))
.catch(err => console.log(err))

class App extends Component{
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
    <ApolloProvider client={client}>
    <Router>
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Provider store={store}>
        <Wrapper>
          <Header />
          <Switch>
            <Route path='/' exact>
              <NowWhat />
            </Route>
  
            <Route path='/charts' exact>
              <ChartMenu />
              <ChartCard>
                {/* <Chart type='line' width='400' /> */}
              </ChartCard>
            </Route>
          </Switch>
          <ToastContainer />
        </Wrapper>
      </Provider>
    </MuiThemeProvider>
    </Router>
    </ApolloProvider>
    )
  }
}



export default App;
