import React from 'react';
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

const App = () => (
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
            <ChartCard />
          </Route>
        </Switch>
        <ToastContainer />
      </Wrapper>
    </Provider>
  </MuiThemeProvider>
  </Router>
);

export default App;
