import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import {firestore } from './fire';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';

const styles = theme => ({
    root: {
      flexGrow: 1,
    },
    demo: {
      height: 240,
    },
    paper: {
      padding: theme.spacing.unit * 2,
      height: '100%',
    },
    control: {
      padding: theme.spacing.unit * 2,
    },
  });
  

class WeatherCard extends Component {
    state = { data: null };
    async componentDidMount() {
        //orderBy("lastupdate", "desc").
        const result = await firestore.collection('weather-YR').limit(1).get();
        console.log(result.docs[0].data());//.docs[0].data());
        var data = result.docs[0].data();
        this.setState({
          data: data,
        });
      }
  render() {
    const style  = theme => ({
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
      }); 
    if (!this.state.data ) { return 'loading...'; }   
    return (
        
        <Paper elevation={4} >
        <Typography variant="display1" gutterBottom align="center">
        Værmelding
        </Typography>
        <Typography variant="headline" gutterBottom align="center">
            {this.state.data.weatherdata.forecast["0"].text["0"].location["0"].time["0"].body["0"]}
        </Typography>
        <Typography variant="body1" gutterBottom align="center">
        Temp: {this.state.data.weatherdata.forecast["0"].tabular["0"].time["0"].temperature["0"].$.value} 
        klokken: {this.state.data.weatherdata.forecast["0"].tabular["0"].time["0"].$.from}
        </Typography>
        
        </Paper>
    );

  }
}
WeatherCard.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(WeatherCard);