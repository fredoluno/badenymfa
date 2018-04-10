import React, { Component } from 'react';
import {firestore } from './fire';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import thermometer from './weather/thermometer.svg'
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import { LineChart, Line, YAxis, XAxis,ResponsiveContainer } from 'recharts';
import moment from 'moment'
import Button from 'material-ui/Button';
import ReactGA from 'react-ga';

import './App.css';




const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
  }),
  button: {
    margin: theme.spacing.unit,
  },

  freddan:{
    fontSize: '7rem',
  },

  demo: {
    height: 240,
  },
  paper: {
    padding: theme.spacing.unit * 2,
   
   
    
  },
  control: {
    padding: theme.spacing.unit * 2,
  },
});


class SampleStats extends Component {
  state = { data: null };
  constructor(props) {
    super(props);
  this.today = this.today.bind(this);
  this.sevenDay = this.sevenDay.bind(this);
  this.thirtyDay = this.thirtyDay.bind(this);
  }

  async hentData(startDato, formatX, buttonC){
    const result = await firestore.collection('samples').where('published', '>', startDato).get();
    var step = 1;
    var NumberOfPoints = 100;
    if(result.docs.length> NumberOfPoints){
      step = result.docs.length/NumberOfPoints;
      step = Math.floor( step );
      console.log("Steps=", step);
    }
    
    var dataSamples = [];
    
    for(var i = 0; i<result.docs.length; i++ )
    {
      
      if(i % step == 0)
      var tempData = result.docs[i].data()
      tempData.number = tempData.published.getTime();
      dataSamples.push(tempData);
      

    }
    var data = new Object();
    data.dataSamples = dataSamples;
    data.formatX = formatX;
    data.buttonC = buttonC;

    this.setState({
      data: data,
    });
  }
  
  componentDidMount() {
    var startDato = new Date();
    startDato.setDate(startDato.getDate() - 7);
    console.log("StartDato ",startDato);
    this.hentData(startDato, 'D/M HH:mm', this.buttonDefault());
  }

  setTrack(range){
    ReactGA.event({
      category: 'Stats Navigation',
      action: range,
      
  });
  }

  today(){
    
      var buttonC = new Object();
      buttonC.today="primary";
      buttonC.seven="";
      buttonC.thirty="";
    var startDato = new Date();
    
    startDato.setHours(0,0,0,0);
    console.log("StartDato ",startDato);
    this.hentData(startDato, 'HH:mm',buttonC);
    this.setTrack('Today');
  }

  sevenDay(){
    var startDato = new Date();
    startDato.setDate(startDato.getDate() - 7);
    console.log("StartDato ",startDato);
    this.hentData(startDato, 'D/M HH:mm',this.buttonDefault());
    this.setTrack('Seven days');
  }
  thirtyDay(){
    var buttonC = new Object();
    buttonC.today="";
    buttonC.seven="";
    buttonC.thirty="primary";
    var startDato = new Date();
    startDato.setDate(startDato.getDate() - 30);
    console.log("StartDato ",startDato);
    this.hentData(startDato, 'D/M HH:mm',buttonC);
    this.setTrack('Thirty Days');
  }

  buttonDefault(){
    var buttonC = new Object();
    buttonC.today="";
    buttonC.seven="primary";
    buttonC.thirty="";
    return buttonC;
  }


  render() {
    const { classes } = this.props;
    if (!this.state.data ) { return 'loading...'; }
    return (
    <div  className={classes.paper}>
    <Typography variant="display1" >
        Badetemperatur over tid
    </Typography>
    <ResponsiveContainer width='100%' aspect={4.0/2.0}>
      <LineChart  data={this.state.data.dataSamples}>
        <Line type="monotone" dataKey="p" stroke="#8884d8" dot={false} />
        <YAxis type="number" domain = {['auto', 'auto']}/>
        <XAxis
        dataKey = 'number'
        type='number'
        domain={['dataMin', 'dataMax']}
        tickFormatter = {(unixTime) => moment(unixTime).format(this.state.data.formatX)}
 />
    </LineChart>
    </ResponsiveContainer>
    <Button color={this.state.data.buttonC.today} variant="raised" onClick={this.today}  className={classes.button}>
        I dag
      </Button>
      <Button color={this.state.data.buttonC.seven} variant="raised" onClick={this.sevenDay} className={classes.button}>
        7 dager
      </Button>
      <Button color={this.state.data.buttonC.thirty} variant="raised"  onClick={this.thirtyDay} className={classes.button}>
        30 dager
      </Button>
    </div>
     
    );
  }
}
SampleStats.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SampleStats);