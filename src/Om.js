import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import {firestore } from './fire';
import Typography from 'material-ui/Typography';
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
      maxWidth: '600px',
      margin:'auto',
      marginTop: '8px',
    },
    test:{
      marginBottom:0,
    },
    control: {
      padding: theme.spacing.unit * 2,
    },
  });
  

class Om extends Component {
    
  render() {
    const { classes } = this.props;

   
    return (

      <Paper  elevation={4} className={classes.paper} >
                <Typography variant="display1" gutterBottom align="center">
                Om Badenymfa
                </Typography>
                <Typography variant="title" align="left" gutterBottom>
                Historien
                </Typography>      
                <Typography align="left">
                Badenymfa flyttet til Jessheim midt på 80 tallet, men det er først nå hun har fått tilgang til internett. Internett fikk hun etter at en stakkars jogger mistet mobilen sin eå ha glemt å ta den av før han hoppet i vannet etter en tur rundt tjernet. Nå er hun i hvertfall klar til å si i fra hvor varmt vannet er. Det gjør hun fordi du kan enten skryte av hvor kaldt det var da du badet, eller at du skal kunne sitte hjemme i sofaen og sjekke om det er på tide å komme seg ut å ta en dukkert. 

                </Typography>
       
    </Paper>
      
  
    );

  }
}
Om.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(Om);