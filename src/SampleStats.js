import React, { Component } from 'react';
import {firestore } from './fire';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import thermometer from './weather/thermometer.svg'
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import { LineChart, Line, YAxis } from 'recharts';


import './App.css';




const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
  }),

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
  
  async componentDidMount() {
    const result = await firestore.collection('samples').orderBy("published_at", "desc").limit(100).get();

    
    var data = [];
    
    for(var i = 0; i<result.docs.length; i++ )
    {
      var tempData = result.docs[i].data()
      data.push(tempData);
      

    }

    this.setState({
      data: data,
    });
  }
  render() {
    const { classes } = this.props;
    if (!this.state.data ) { return 'loading...'; }
    return (
    <Paper  elevation={4}  className={classes.paper}>
      <LineChart width={300} height={200} data={this.state.data}>
        <Line type="monotone" dataKey="p" stroke="#8884d8" dot={false} />
        <YAxis type="number" domain={['dataMin', 'dataMax']} />
    </LineChart>
    </Paper>
     
    );
  }
}
SampleStats.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SampleStats);