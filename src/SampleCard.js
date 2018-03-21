import React, { Component } from 'react';
import {firestore } from './fire';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Paper from 'material-ui/Paper';

import './App.css';


class SampleCard extends Component {
  state = { data: null };
  
  async componentDidMount() {
    const result = await firestore.collection('samples').orderBy("published_at", "desc").limit(1).get();
    console.log(result.docs[0].data());
    var data = result.docs[0].data();
    this.setState({
      data: data,
    });
  }
  render() {
    const style = {

      width: '90%',
      margin: 20,
      textAlign: 'center',
      display: 'inline-block',
    };  
    if (!this.state.data ) { return 'loading...'; }
    return (
    <Paper style={style} zDepth={1} rounded={false} >
              <h1>{this.state.data.tw} °C</h1>
              <p> Sist måling gjort  {new Date(this.state.data.published_at).toLocaleTimeString()}</p>
              
    </Paper>
     
    );
  }
}

export default SampleCard;