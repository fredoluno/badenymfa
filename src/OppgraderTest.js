import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';




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


class OppgraderTest extends Component {
  state = { data: null };
  
  render() {
    
  
    return (
    <div>ditt</div>
     
    );
  }
}
OppgraderTest.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OppgraderTest);