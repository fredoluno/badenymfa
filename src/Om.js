import React, { Component } from 'react';
import Paper from 'material-ui/Paper';

import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import { Link} from "react-router-dom";

import ReactGA from 'react-ga';
import { Facebook } from 'mdi-material-ui';

const styles = theme => ({
    root: {
      flexGrow: 1,
      paddingBottom:'100px',
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
      <Grid container justify="center" spacing={8}  className={classes.root} alignItems="stretch"  >
        <Grid item xs={11} >
          <Paper  elevation={4} className={classes.paper} >
                <Typography variant="display1" gutterBottom align="center">
                Om Badenymfa
                </Typography>
                <Typography variant="title" align="left" gutterBottom>
                Historien
                </Typography>      
                <Typography align="left" gutterBottom>
                Badenymfa flyttet til Jessheim midt på 80 tallet, men det er først nå hun har fått tilgang til internett. Internett fikk hun etter at en stakkars jogger mistet mobilen sin når han hoppet i vannet etter en tur rundt tjernet. Nå er hun i hvertfall klar til å si i fra hvor varmt vannet er. Det gjør hun fordi du kan enten skryte av hvor kaldt det var da du badet, eller at du skal kunne sitte hjemme i sofaen og sjekke om det er på tide å komme seg ut å for å ta en dukkert. Kos deg!

                </Typography>
                <Typography variant="title" align="left" gutterBottom>
                Om tjenesten
                </Typography>      
                <Typography align="left" gutterBottom>
                Badenymfa.no er laget som et lite hobby/kompetanse-prosjekt for å utforske mulighetene som åpner seg med litt lodding og utvikling. 
                <br/>
                Badenymfa er en liten datamaskin(Particle Electron) med en temperaturmåler, <Link to="/power">et batteri</Link> og et solcellepanel som flyter ute på Nordbytjernet.  
                </Typography>
                <Typography variant="title" align="left" gutterBottom>
                Kontakt
                </Typography>      
                <Typography align="left" gutterBottom>
                Ta kontakt på <ReactGA.OutboundLink 
                eventLabel="facebook"
                to="https://www.facebook.com/badenymfa"
              target="_blank">facebook</ReactGA.OutboundLink> eller via tilbakemeldingsknappen på siden her, hvis det er noe du lurer på, er inspirert til å lage noe lignende selv eller bare vil gi en tilbakemelding
                </Typography>

              <ReactGA.OutboundLink 
                eventLabel="facebook"
                to="https://www.facebook.com/badenymfa"
              target="_blank"><Facebook /></ReactGA.OutboundLink> 
          </Paper>
        </Grid>    
      </Grid>
  
    );

  }
}
Om.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(Om);