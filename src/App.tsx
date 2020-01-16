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
import Chart from './components/Chart';
import ChartCard from './components/ChartCard';
import ChartMenu from './components/ChartMenu';
import { gql } from 'apollo-boost';
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

interface AppProps {
  //code related to your props goes here
}


interface AppState {
  chartArray: any,
}


class App extends Component<AppProps, AppState> {

   chartData = [] as any;
   currentTemp = '';

  
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
                      if (this.chartData.length > 100) {
                        this.chartData.shift();
                      }
                      
                      this.currentTemp = dataLog.y;
                      this.chartData.push(dataLog);
                      console.log(this.chartData.length);
                      console.log(dataLog);
                    };
                    

                    return (
                      <div>
                      <h4>Current Temp:{this.currentTemp}</h4>
                      <Chart chartArray={this.chartData.length > 4? this.chartData : []} dataKey="y" />                        
                      </div>
                    )
                    }}
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
