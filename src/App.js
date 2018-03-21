import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { BrowserRouter } from "react-router-dom";
import StartPage  from './StartPage';
import SampleStats  from './SampleStats';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './App.css';


class App extends Component {
  state = {open: false};
  handleToggle = () => this.setState({open: !this.state.open});
  async componentDidMount() {
    console.log("App")
  }
  render() {
    return (
      <BrowserRouter>
      <MuiThemeProvider>
   
        <div class="App">
        <AppBar
          title="Badenymfa på Nordbytjnernet"
          iconClassNameRight="muidocs-icon-navigation-expand-more"
          onLeftIconButtonClick={this.handleToggle}
        /> 

        <Drawer open={this.state.open}
        containerStyle={{height: 'calc(100% - 64px)', top: 64}}>
          <MenuItem>Hva mener Badenymfa?</MenuItem>
          <MenuItem>Badetemperatur over tid</MenuItem>
          <MenuItem>Om Badenymfa</MenuItem>
        </Drawer>

          <Route exact path="/" component={StartPage} />
          <Route exact path="/stats" component={SampleStats} />
        </div>
        </MuiThemeProvider>
      </BrowserRouter>
    );

  }
}

export default App;