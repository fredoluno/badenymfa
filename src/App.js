import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Router, Link} from "react-router-dom";
import StartPage  from './StartPage';

import Power  from './Power';
import Temp  from './Temp';
import Om  from './Om';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';


import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import BottomNavigation, { BottomNavigationAction } from 'material-ui/BottomNavigation';
import InfoIcon from 'material-ui-icons/Info';
import ShowChartIcon from 'material-ui-icons/ShowChart';
import HomeIcon from 'material-ui-icons/Home';
import withTracker from './withTracker';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import configureHistory from './configureHistory';
import NymfaTheme from './NymfaTheme'
import './App.css';

const history  = configureHistory();


const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
   
    position: "fixed", 
    bottom:"0",
    width:"100%",
  },
};

class App extends Component {
  state = {open: false, 
          value: 0};


  handleToggle = () => this.setState({open: !this.state.open});
  handleChange = (event, value) => this.setState({ value });
  async componentDidMount() {
    console.log("App")
  }


  render() {
    const { classes } = this.props;
    const { value } = this.state;
   
    return (
      <Router history={history}>
      <MuiThemeProvider theme={NymfaTheme}>
    
        <div className="App">


        <AppBar position="static">
        <Toolbar>
  
          <Typography variant="title" color="inherit" className={classes.flex}>
            badenymfa.no
          </Typography>
          
        </Toolbar>
      </AppBar>

        <Drawer open={this.state.open}
        containerStyle={{height: 'calc(100% - 64px)', top: 64}}>


          
        </Drawer>

          <Route exact path="/" component={withTracker(StartPage)} />
          <Route exact path="/stats" component={withTracker(Temp)} />
          <Route exact path="/power" component={withTracker(Power)} />
          <Route exact path="/om" component={withTracker(Om)} />
        
        <BottomNavigation
        value={value}
        onChange={this.handleChange}
        showLabels
        className={classes.menuButton}
      >
      <BottomNavigationAction component={Link} to="/" label="Forsiden" icon={<HomeIcon />} />
        <BottomNavigationAction component={Link} to="/stats" label="Over tid" icon={<ShowChartIcon />} />
        <BottomNavigationAction component={Link}  to="/om" label="Om badenymfa" icon={<InfoIcon />} />
        
      </BottomNavigation>
        </div>

        </MuiThemeProvider>
      </Router>
    );

  }
}
App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);