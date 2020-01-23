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
import ChartDataHook from './components/ChartDataHook';
import { gql } from 'apollo-boost';
import { useSubscription } from '@apollo/react-hooks';
import { Subscription } from '@apollo/react-components';
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
  chartData: Array<object>,
  waterData: Array<object>
}

let flareTemp = '';
let waterTemp = '';
let oilTemp = '';
let casingPressure = '';
let tubingPressure = '';
let InjValveOpen = '';

const dataLogs = {
  IVO: 0,
  CP: 0,
  TP: 0,
  FT: 0,
  WT: 0,
  OT: 0
};

let counter = 0;


class App extends Component<AppProps, AppState> {

  state = {
    chartData: [] as any,
    waterData: [] as any
  };

    

   dataSort = (data) => {

    // if (this.state.chartData.length > 500) {this.state.chartData.shift()}

    if (data.newMeasurement.metric === 'injValveOpen') {
      // console.log('IVO ', data.newMeasurement.value)
      dataLogs.IVO = data.newMeasurement.value;
      counter += 1
      console.log(counter)
    }


    if (data.newMeasurement.metric === 'casingPressure') {
      // console.log('casingPressure ', data.newMeasurement.value)
      dataLogs.CP = data.newMeasurement.value;
      counter += 1
      console.log(counter)
    }

    if (data.newMeasurement.metric === 'tubingPressure') {
      // console.log('tubingPressure', data.newMeasurement.value)
      dataLogs.TP = data.newMeasurement.value;
      counter += 1
      console.log(counter)

    }

    if (data.newMeasurement.metric === 'flareTemp') {
      // console.log('flareTemp ', data.newMeasurement.value);
      dataLogs.FT = data.newMeasurement.value;
      counter += 1
      console.log(counter)
    };


    //THIS CODE WORKS DO NOT MESS WITH
    if (data.newMeasurement.metric === 'waterTemp') {
      console.log('waterTemp ', data.newMeasurement.value);
      const waterLog = {WaterTemp: data.newMeasurement.value};
      setTimeout(() => this.setState({waterData: [...this.state.waterData, waterLog]}), 100);
    };
    ////////////////////////////////////////////////

    if (data.newMeasurement.metric === 'oilTemp') {
      // console.log('oilTemp ', data.newMeasurement.value);
      dataLogs.OT = data.newMeasurement.value;
      counter += 1
      console.log(counter)
    };

  //   if (counter % 6 == 0) {
  //     console.log(this.state.chartData)
  //     console.log(dataLogs)
  //     console.log(this.state.chartData)
     //  setTimeout(() => this.setState({chartData: [...this.state.chartData, dataLogs]})
   };

   handleFlareClick = () => {
    // this.setState({chartData: flareTempData})
    console.log('flare boi')

   };

   handleWaterClick = () => {
    // this.setState({chartData: waterTempData})
    console.log('water boi')

   };

   handleOilClick = () => {
    // this.setState({chartData: oilTempData})
    console.log('oil boi')

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
              <GraphChip name='Casing Pressure' handleChipClick={this.handleOilClick} />
              <GraphChip name='InjValve Open' handleChipClick={this.handleOilClick} />
              <GraphChip name='Tubing Pressure' handleChipClick={this.handleOilClick} />

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
                      {/* <h4>Current Temp:{currentTemp}</h4> */}
                      <Chart 
                      waterData={this.state.waterData}
                       />                       
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
