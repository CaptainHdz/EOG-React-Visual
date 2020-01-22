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
import GraphChip from './components/GraphChip';
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
//APOLLO Query
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

let chartData = [] as any;
const flareTempData = [] as any;
const oilTempData = [] as any;
const waterTempData = [] as any;


let currentTemp = '';


class App extends Component<AppProps, AppState> {

   dataSort = (data) => {
    if (data.newMeasurement.metric === 'flareTemp') {
      const dataLog = {
        x: data.newMeasurement.at,
        y: data.newMeasurement.value
      };
      if (chartData.length > 100) {
        chartData.shift();
      }
      
      // currentTemp = dataLog.y;
      flareTempData.push(dataLog);
      console.log('flareTemp ',dataLog);
    };

    if (data.newMeasurement.metric === 'waterTemp') {
      const dataLog = {
        x: data.newMeasurement.at,
        y: data.newMeasurement.value
      };
      if (chartData.length > 100) {
        chartData.shift();
      }
      
      // currentTemp = dataLog.y;
      waterTempData.push(dataLog);
      console.log('waterTemp ',dataLog);
    };

    if (data.newMeasurement.metric === 'oilTemp') {
      const dataLog = {
        x: data.newMeasurement.at,
        y: data.newMeasurement.value
      };
      if (chartData.length > 100) {
        chartData.shift();
      }
      
      // currentTemp = dataLog.y;
      oilTempData.push(dataLog);
      console.log('oilTemp ',dataLog);
    };
   };

   handleFlareClick = () => {
     console.log('flare clicked')
     chartData = flareTempData;

   };

   handleWaterClick = () => {
     console.log('water clicked')
     chartData = waterTempData;
   };

   handleOilClick = () => {
    console.log('oil clicked')
    chartData = oilTempData;
  };
  

  
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
              <GraphChip name='Flare Temp' handleChipClick={this.handleFlareClick} />
              <GraphChip name='Water Temp' handleChipClick={this.handleWaterClick} />
              <GraphChip name='Oil Temp' handleChipClick={this.handleOilClick} />
              <ChartCard>
                <Subscription subscription={GET_MEASUREMENTS}>
                  {({data, error, loading}) => {
                    if (loading) {
                      return (<h1>Loading</h1>);
                    }

                    if (error) {console.log('We have an issue sir:', error)}

                    this.dataSort(data);
                    
                    return (
                      <div>
                      <h4>Current Temp:{currentTemp}</h4>
                      <Chart chartArray={chartData.length > 3? chartData : []} dataKey="y" />                        
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
