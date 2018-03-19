import React, { Component } from 'react';
import {firestore } from './fire';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = { data: null };
  async componentDidMount() {
    const result = await firestore.collection('samples').orderBy("published_at", "desc").limit(1).get();
    console.log("-----------------------");
    console.log(result);
    console.log("-----------------------3");
    console.log(result.docs[0].data().tw);
    console.log("-----------------------4");
    var data = result.docs[0].data();
    this.setState({
      data: data,
    });
  }
  render() {
    if (!this.state.data ) { return 'loading...'; }
    return (
      <div className="App">
        <ul>
          
            <li>
              <p>Date: 
               at {new Date(this.state.data.published_at).toLocaleTimeString()}</p>
              <p>Temperature: {this.state.data.tw}</p>
            </li>
          
        </ul>
      </div>
    );
  }
}

export default App;