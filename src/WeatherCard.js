import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import {firestore } from './fire';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';
import WeatherSymbol from './WeatherSymbol'
import { CircularProgress } from 'material-ui/Progress';
import ReactGA from 'react-ga';

const styles = theme => ({
    root: {
      flexGrow: 1,
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
  

class WeatherCard extends Component {
    state = { data: null };
    async componentDidMount() {
        //
        const result = await firestore.collection('weather-simple').orderBy("lastupdate", "desc").limit(1).get();
        console.log(result);
        var data = result.docs[0].data();
        
        console.log("værdata ",data);
        this.setState({
          data: data,
        });
      }
  render() {
    const { classes } = this.props;

    if (!this.state.data ) { return (<CircularProgress className={classes.progress} size={50} />) }   
    return (

      <Paper  elevation={4} className={classes.paper} >
      <Grid container alignItems="center" justify="center" >
      <Grid item xs={12}>
                <Typography variant="display1" >
                  Været
                </Typography>
        </Grid>
        <Grid item  >
        <WeatherSymbol description={this.state.data.symbol.$.name} symbol={this.state.data.symbol.$.number}/>
        </Grid>
        <Grid item >
                <Typography variant="display4" className={classes.test} gutterBottom>
                {this.state.data.temperature}°
                </Typography>
        </Grid>
        <Grid item xs={12} sm={12}>
        
                <Typography variant="caption" align="center">
                Værvarsel fra <ReactGA.OutboundLink 
                eventLabel="YR"
                to={this.state.data.link}
              target="_blank">Yr levert av Meteorologisk institutt og NRK</ReactGA.OutboundLink>.<br/> Gjelder fra {this.state.data.time.from.toDate().toLocaleTimeString()} til {this.state.data.time.to.toDate().toLocaleTimeString()}
                </Typography>
        </Grid>       
      </Grid>       
    </Paper>
      
  
    );

  }
}
WeatherCard.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(WeatherCard);