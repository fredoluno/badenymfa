import React, { Component } from 'react';
import {firestore } from './fire';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { LineChart, Line, YAxis, XAxis,ResponsiveContainer,Legend } from 'recharts';
import moment from 'moment'
import Button from '@material-ui/core/Button';
import ReactGA from 'react-ga';
import CircularProgress from '@material-ui/core/CircularProgress';
import {SAMPLE_DB} from './NymfaSettings';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';



import './App.css';




const styles = theme => ({
  root: {
    flexGrow: 1,
    paddingBottom:'100px'
  },
  button: {
    margin: theme.spacing.unit,
  },
  s2018s:{
    
    margin: 'auto',
  },

  freddan:{
    fontSize: '7rem',
  },

  demo: {
    height: 240,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    
    margin:'auto',
    marginTop: '8px',
    
    
  },
  control: {
    padding: theme.spacing.unit * 2,
  },
});


class SampleStats extends Component {
    
  state = { data: null,
            s2018:false};
  
  constructor(props) {
    super(props);
  this.today = this.today.bind(this);
  this.sevenDay = this.sevenDay.bind(this);
  this.thirtyDay = this.thirtyDay.bind(this);
  this.s2018clicked = this.s2018clicked.bind(this);
  }

  async hentData(startDato, formatX, buttonC){
    const CompareDays = 365;

    var previousStartDate = new Date(startDato);
    previousStartDate.setDate(startDato.getDate() - CompareDays);
    var previousEndDate = new Date();
    
    previousEndDate.setDate(previousEndDate.getDate() - CompareDays);

    console.log("startDato " + startDato);
    console.log("previousStartDate " + previousStartDate);
    console.log("previousEndDate " + previousEndDate);
    

    const result = await firestore.collection(SAMPLE_DB).where('published', '>', startDato).get(); 
    //const result2 = await firestore.collection(SAMPLE_DB).where('published', '>', previousStartDate).where('published', '<', previousEndDate).get();
    
    var data = {};
    data.startDato = startDato;
    data.dataSamples =this.getDataSamples(result,0);
    //data.dataSamplesCompare =this.getDataSamples(result2, CompareDays);
    data.formatX = formatX;
    data.buttonC = buttonC;
    this.set2018(data);

    
  }

  getDataSamples(result, daysOff){
    console.log("daysoff "+ daysOff)
    var step = 1;
    var NumberOfPoints = 200;
    if(result.docs.length> NumberOfPoints){
      step = result.docs.length/NumberOfPoints;
      step = Math.floor( step );
      console.log("Steps=", step);
    }
    console.log("length" + result.docs.length);
    var dataSamples = [];
    
    for(var i = 0; i<result.docs.length; i++ )
    {
      
      if(i % step === 0){ 
        var tempData = result.docs[i].data()
        var tempDate = tempData.published.toDate()
       
        tempDate.setDate(tempDate.getDate() + daysOff);
       
        tempData.number = tempDate.getTime();
        dataSamples.push(tempData);
      }
      

    }
    return dataSamples;
  }
  
  
  componentDidMount() {
    
    this.sevenDay();
  }

  setTrack(range){
    ReactGA.event({
      category: 'Stats Navigation',
      action: range,
      
  });
  }

  today(){
    
      var buttonC ={};
      buttonC.today="primary";
      buttonC.seven="default";
      buttonC.thirty="default";
    var startDato = new Date();
    
    startDato.setHours(0,0,0,0);
    console.log("StartDato ",startDato);
    this.hentData(startDato, 'HH:mm',buttonC);
    this.setTrack('Today');
  }

  getLocalData()
  {
     var data = localStorage.getItem("stat2018");
    console.log("data from storage " + data)
    
    if(data ===undefined)
      data = false;

    return JSON.parse(data);
    
  }
  setLocalData(local2018)
  {
    console.log("setting data " + local2018 );
      localStorage.setItem("stat2018", local2018);    
  }

  sevenDay(){
    var startDato = new Date();
    startDato.setDate(startDato.getDate() - 7);
    console.log("StartDato ",startDato);
    this.hentData(startDato, 'D/M HH:mm',this.buttonDefault());
    this.setTrack('Seven days');
  }
  thirtyDay(){
    var buttonC = {};
    buttonC.today="default";
    buttonC.seven="default";
    buttonC.thirty="primary";
    var startDato = new Date();
    startDato.setDate(startDato.getDate() - 30);
    console.log("StartDato ",startDato);
    this.hentData(startDato, 'D/M HH:mm',buttonC);
    this.setTrack('Thirty Days');
  }



  async set2018(data){
    var s2018 = this.getLocalData();

    if (!s2018){
      data.dataSamplesCompare= null;
      data.dataSamplesCompare2= null;
      console.log("YEAH");  
    }else{
      const CompareDays = 365;
      const CompareDays2 = 730;
      
      var startDato = data.startDato;
      console.log(startDato);
      var previousStartDate = new Date(startDato);
      previousStartDate.setDate(startDato.getDate() - CompareDays);
      var previousEndDate = new Date();
      
      previousEndDate.setDate(previousEndDate.getDate() - CompareDays);

      var previousStartDate2 = new Date(startDato);
      previousStartDate2.setDate(startDato.getDate() - CompareDays2);
      var previousEndDate2 = new Date();
      
      previousEndDate2.setDate(previousEndDate2.getDate() - CompareDays2);

      const result2 = await firestore.collection(SAMPLE_DB).where('published', '>', previousStartDate).where('published', '<', previousEndDate).get();
      const result3 = await firestore.collection(SAMPLE_DB).where('published', '>', previousStartDate2).where('published', '<', previousEndDate2).get();
 
      console.log(result2.length);
      data.dataSamplesCompare =this.getDataSamples(result2, CompareDays);
      data.dataSamplesCompare2 =this.getDataSamples(result3, CompareDays2);
      
      console.log("set2018");
    }
    console.log(data);
    this.setState({
      data: data,
      s2018: s2018,
    });


  }

  s2018clicked(){
    var data = this.state.data;
    var s2018 = this.state.s2018;
    console.log("s2018clicked " + s2018);
    if(s2018){
      console.log("s2018 er sann, setter false");
      this.setLocalData(false);
      this.setTrack('2018false');
    }
    else{
      this.setLocalData(true);
      this.setTrack('2018true');  
    }
    this.set2018(data);
    
  }
  

  buttonDefault(){
    var buttonC = {};
    buttonC.today="default";
    buttonC.seven="primary";
    buttonC.thirty="default";
    return buttonC;
  }


  render() {
    const { classes } = this.props;
    if (!this.state.data ) { return (<CircularProgress className={classes.progress} size={50} />) }
    return (
      <Grid container justify="center" spacing={8}  className={classes.root} alignItems="stretch"  >
        <Grid item xs={11} md={8} lg={7}>
          <Paper  className={classes.paper}>
          <Typography variant="h4" >
              {this.props.title}
          </Typography>
 
          <ResponsiveContainer width='95%'  minHeight={280} >
            <LineChart  >
              <Line type="monotone" name="2020" data={this.state.data.dataSamples} dataKey={this.props.measure} stroke="#8884d8" dot={false} strokeWidth={2} />
              <Line type="monotone" name="2019" data={this.state.data.dataSamplesCompare} dataKey={this.props.measure} stroke="#d884ae"  strokeDasharray="5 5" dot={false} />
              <Line type="monotone" name="2018" data={this.state.data.dataSamplesCompare2} dataKey={this.props.measure} stroke="#d8ce84"  strokeDasharray="5 5" dot={false} />
              <YAxis type="number" domain = {['auto', 'auto']}/>
              <XAxis
              dataKey = 'number'
              type='number'
              domain={['dataMin', 'dataMax']}
              tickFormatter = {(unixTime) => moment(unixTime).format(this.state.data.formatX)} />
              { this.state.s2018 ? <Legend /> : null }
          </LineChart>
          </ResponsiveContainer>
         
          <Button color={this.state.data.buttonC.today} variant="contained" onClick={this.today}  className={classes.button}>
              I dag
            </Button>
            <Button color={this.state.data.buttonC.seven} variant="contained" onClick={this.sevenDay} className={classes.button}>
              7 dager
            </Button>
            <Button color={this.state.data.buttonC.thirty} variant="contained"  onClick={this.thirtyDay} className={classes.button}>
              30 dager
            </Button>

            <FormGroup row>
        <FormControlLabel 
          className={classes.s2018s} 
          control={
            <Switch
              checked={this.state.s2018}
              onChange={this.s2018clicked}
              value="2018"
            />
          }
          label="Sammenlign med 2018"
        />
        </FormGroup>
          </Paper>
      </Grid>    
    </Grid>
     
    );
  }
}
SampleStats.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SampleStats);