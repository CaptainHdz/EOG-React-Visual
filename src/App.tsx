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

const IVOArr = [] as Array<object>;
const TPArr = [] as Array<object>;
const CPArr = [] as Array<object>;
const FTArr = [] as Array<object>;
const WTArr = [] as Array<object>;
const OTArr = [] as Array<object>;

let IVOCount = 0;
let OilCount = 0;
let waterCount = 0;
let flareCount = 0;
let CPCount = 0;
let TPCount = 0;

class App extends Component<AppState> {

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
      const IVOLog = {injValveOpen: data.newMeasurement.value, x: IVOCount};
      IVOCount ++
      IVOArr.push(IVOLog)
      if (IVOArr.length > 100) {IVOArr.shift()}
      setTimeout(() => this.setState({IVOData: IVOArr}), 50)
      InjValveOpen = 'IVO Pressure: ' + data.newMeasurement.value
    };


    if (data.newMeasurement.metric === 'casingPressure') {
      const CPLog = {casingPressure: data.newMeasurement.value, x: CPCount};
      CPCount ++
      CPArr.push(CPLog)
      if (CPArr.length > 100) {CPArr.shift()}
      setTimeout(() => this.setState({casingPressure: CPArr}), 50)
      casingPressure = 'Casing Pressure: ' + data.newMeasurement.value
    };

    if (data.newMeasurement.metric === 'tubingPressure') {
      const TPLog = {tubingPressure: data.newMeasurement.value, x: TPCount};
      TPArr.push(TPLog)
      TPCount ++
      if (TPArr.length > 100) {TPArr.shift()}
      setTimeout(() => this.setState({tubingPressure: TPArr}), 50)
      tubingPressure = 'Tubing Pressure: ' + data.newMeasurement.value
    };

    if (data.newMeasurement.metric === 'flareTemp') {
      const flareLog = {flareTemp: data.newMeasurement.value, x: flareCount};
      FTArr.push(flareLog)
      flareCount ++
      if (FTArr.length > 100) {FTArr.shift()}
      setTimeout(() => this.setState({flareData: FTArr}), 50)
      flareTemp = 'Flare Temp: ' + data.newMeasurement.value
    };

    if (data.newMeasurement.metric === 'waterTemp') {
      const waterLog = {waterTemp: data.newMeasurement.value, x: waterCount};
      WTArr.push(waterLog)
      waterCount ++
      if (WTArr.length > 100) {WTArr.shift()}
      setTimeout(() => this.setState({waterData: WTArr}), 50)
      waterTemp = 'Water Temp: ' + data.newMeasurement.value
    };

    if (data.newMeasurement.metric === 'oilTemp') {
      const oilLog = {oilTemp: data.newMeasurement.value, x: OilCount};
      OTArr.push(oilLog)
      OilCount ++
      if (OTArr.length > 100) {OTArr.shift()}
      setTimeout(() => this.setState({oilData: OTArr}), 50)
      oilTemp = 'Oil Temp: ' + data.newMeasurement.value
    };

   };

   handleFlareClick = () => {
    this.setState({FDShow: !this.state.FDShow})
   };

   handleWaterClick = () => {
    this.setState({WDShow: !this.state.WDShow})
   };

   handleOilClick = () => {
    this.setState({ODShow: !this.state.ODShow})
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
              <GraphChip name={flareTemp} handleChipClick={this.handleFlareClick} />
              <GraphChip name={waterTemp} handleChipClick={this.handleWaterClick} />
              <GraphChip name={oilTemp} handleChipClick={this.handleOilClick} />
              <GraphChip name={casingPressure} handleChipClick={this.handleCasingClick} />
              <GraphChip name={tubingPressure} handleChipClick={this.handleTubingClick} />
              <GraphChip name={InjValveOpen} handleChipClick={this.handleIVOClick} />

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
                      <Chart 
                      //Data
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
