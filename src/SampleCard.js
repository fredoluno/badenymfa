import React, { Component } from 'react';
import {firestore } from './fire';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import thermometer from './weather/thermometer.svg'
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import { CircularProgress } from 'material-ui/Progress';


import './App.css';


const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
  }),

  freddan:{
    fontSize: '6rem',
  },

  demo: {
    height: 240,
  },
  paper: {
    padding: theme.spacing.unit * 2,
   
   
    
  },
  test:{
    marginBottom:0,
    fontSize: '6rem',
  },
  control: {
    padding: theme.spacing.unit * 2,
  },
});


class SampleCard extends Component {
  state = { data: null };
  
  async componentDidMount() {
    const result = await firestore.collection('samples').orderBy("published", "desc").limit(1).get();
    console.log(result.docs[0].data());

    var data = result.docs[0].data();
    this.setState({
      data: data,
    });
  }
  render() {
    const { classes } = this.props;
    if (!this.state.data ) { return (<CircularProgress className={classes.progress} size={50} />)}
    return (
    <Paper  elevation={4}  className={classes.paper}>
      <Grid container alignItems="center" justify="center" >
      <Grid item xs={12}>
                <Typography variant="display1" >
                  Badetemperatur
                  </Typography>
        </Grid>
        <Grid item xs={12}>
                <Typography variant="title" color="error" >
                  Badenymfa er oppe for en liten fiks. Sist målt temperatur 14 mai. Vi kommer sterkere tilbake.
                  </Typography>
        </Grid>
        <Grid item >
          <img alt="termometer" src={thermometer} height="100px"/>
        </Grid>
        <Grid item >
        <Typography variant="display4" className={classes.test} gutterBottom>
      
                  {/*Math.round(this.state.data.tw)*/}17°
                
                  </Typography>
        </Grid>
        <Grid item xs={12} sm={12}>
        
                <Typography variant="caption" align="center">
                  Sist måling gjort <br/> 14.mai{/*this.state.data.published.toLocaleString()*/} 
                </Typography>
        </Grid>       
      </Grid>       
    </Paper>
     
    );
  }
}
SampleCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SampleCard);