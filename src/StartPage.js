import React, { Component } from 'react';
import SampleCard  from './SampleCard';
import WeatherCard  from './WeatherCard';

class StartPage extends Component {
  
  async componentDidMount() {
    console.log("Hent værdata")
  }
  render() {
    return (
       <div class="StartPage">
            <SampleCard />
            <WeatherCard />
      </div>
    );

  }
}

export default StartPage;