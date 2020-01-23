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
  oilData: Array<object>,
  waterData: Array<object>,
  flareData: Array<object>,
  casingPressure: Array<object>,
  tubingPressure: Array<object>,
  IVOData: Array<object>,
  ODShow: Boolean,
  WDShow: Boolean,
  FDShow: Boolean,
  CPShow: Boolean,
  TPShow: Boolean,
  IVOShow: Boolean
}

let flareTemp = '';
let waterTemp = '';
let oilTemp = '';
let casingPressure = '';
let tubingPressure = '';
let InjValveOpen = '';

class App extends Component<AppProps, AppState> {

  state = {
    oilData: [] as any,
    waterData: [] as any,
    flareData: [] as any,
    casingPressure: [] as any,
    tubingPressure: [] as any,
    IVOData: [] as any,
    ODShow: false,
    WDShow: false,
    FDShow: false,
    CPShow: false,
    TPShow: false,
    IVOShow: false
  };

    

   dataSort = (data) => {

    if (data.newMeasurement.metric === 'injValveOpen') {
      // console.log('injValveOpen ', data.newMeasurement.value);
      const IVOLog = {injValveOpen: data.newMeasurement.value};
      setTimeout(() => this.setState({IVOData: [...this.state.IVOData, IVOLog]}), 200);
    }


    if (data.newMeasurement.metric === 'casingPressure') {
      // console.log('casingPressure ', data.newMeasurement.value);
      const CPLog = {casingPressure: data.newMeasurement.value};
      setTimeout(() => this.setState({casingPressure: [...this.state.casingPressure, CPLog]}), 200);
    }

    if (data.newMeasurement.metric === 'tubingPressure') {
      // console.log('tubingPressure ', data.newMeasurement.value);
      const TPLog = {tubingPressure: data.newMeasurement.value};
      setTimeout(() => this.setState({tubingPressure: [...this.state.tubingPressure, TPLog]}), 200);
    }

    if (data.newMeasurement.metric === 'flareTemp') {
      // console.log('flareTemp ', data.newMeasurement.value);
      const flareLog = {flareTemp: data.newMeasurement.value};
      setTimeout(() => this.setState({flareData: [...this.state.flareData, flareLog]}), 200);
    };

    if (data.newMeasurement.metric === 'waterTemp') {
      // console.log('waterTemp ', data.newMeasurement.value);
      const waterLog = {waterTemp: data.newMeasurement.value};
      setTimeout(() => this.setState({waterData: [...this.state.waterData, waterLog]}), 200);
    };

    if (data.newMeasurement.metric === 'oilTemp') {
      // console.log('oilTemp ', data.newMeasurement.value);
      const oilLog = {oilTemp: data.newMeasurement.value};
      setTimeout(() => this.setState({oilData: [...this.state.oilData, oilLog]}), 200);
    };

   };

   handleFlareClick = () => {
    this.setState({FDShow: !this.state.FDShow})
    console.log('flare')

   };

   handleWaterClick = () => {
    this.setState({WDShow: !this.state.WDShow})
    console.log('water')

   };

   handleOilClick = () => {
    this.setState({ODShow: !this.state.ODShow})
    console.log('oil')

  };

  handleCasingClick = () => {
    this.setState({CPShow: !this.state.CPShow})

  }

  handleIVOClick = () => {
    this.setState({IVOShow: !this.state.IVOShow})

  }

  handleTubingClick = () => {
    this.setState({TPShow: !this.state.TPShow})

  }
  

  
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
              <GraphChip name='Casing Pressure' handleChipClick={this.handleCasingClick} />
              <GraphChip name='InjValve Open' handleChipClick={this.handleIVOClick} />
              <GraphChip name='Tubing Pressure' handleChipClick={this.handleTubingClick} />

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
                      oilData={this.state.oilData}
                      flareData={this.state.flareData}
                      TPData={this.state.tubingPressure}
                      CPData={this.state.casingPressure}
                      IVOData={this.state.IVOData}

                      //Show State
                      IVOShow={this.state.IVOShow}
                      CPShow={this.state.CPShow}
                      TPShow={this.state.TPShow}
                      WTShow={this.state.WDShow}
                      FTShow={this.state.FDShow}
                      OTShow={this.state.ODShow}

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
