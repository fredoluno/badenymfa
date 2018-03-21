import React, { Component } from 'react';
import Paper from 'material-ui/Paper';

class WeatherCard extends Component {
  
  async componentDidMount() {
    console.log("Hent værdata")
  }
  render() {
    const style = {

        width: '90%',
        margin: 10,
        textAlign: 'center',
        display: 'inline-block',
      };  
    return (
        <Paper style={style} zDepth={1} rounded={false} ><h1>Her kommer en værmelding</h1></Paper>
    );

  }
}

export default WeatherCard;