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
import { gql } from 'apollo-boost';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import {Subscription} from '@apollo/react-components';
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

const GET_MEASUREMENTS = gql`subscription{newMeasurement{
  metric,
  value,
  at,
  unit
}
}`;

let chartData = [] as any;

class App extends Component {
  
render() {

    return (
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
                <Subscription subscription={GET_MEASUREMENTS}>
                  {({data, error, loading}) => {
                    if (loading) {
                      return (<h1>Loading</h1>);
                    }

                    if (error) {console.log('We have an issue sir:', error)}

                    if (data.newMeasurement.metric === 'waterTemp') {
                      const dataLog = {
                        x: data.newMeasurement.at,
                        y: data.newMeasurement.value
                      };
                      if (chartData.length > 100) {
                        chartData.shift();
                      }
                      chartData.push(dataLog);
                      console.log(chartData.length)
                      console.log(dataLog)
                    };

                    return (
                      <div>
                      <LineChart width={1000} height={500} data={chartData.length > 2? chartData : []}>
                        <Line type="monotone" dataKey="y" stroke="#8884d8" />
                        <XAxis  />
                        <YAxis dataKey="y" />
                        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                        <Tooltip />
                      </LineChart>
                      </div>
                    )}}
                </Subscription>
              </ChartCard>
            </Route>
          </Switch>
          <ToastContainer />
        </Wrapper>
      </Provider>
    </MuiThemeProvider>
    </Router>
    )
  }
}



export default App;
