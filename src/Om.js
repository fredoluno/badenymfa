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
                <br/> <br/>
                <ReactGA.OutboundLink 
                eventLabel="blogg.bekk.no"
                to="https://blogg.bekk.no/badenymfa-no-33461fbeeeb7"
              target="_blank">"Badenymfa - Produktutvikling fra Bekk til Å"</ReactGA.OutboundLink> er en artikkel jeg har skrevet om Badenymfa. Ta en titt der hvis du vil vite litt om hvordan den er laget. 
                <br/> <br/>
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
                <Typography variant="title" align="left" gutterBottom>
                Om bruk av informasjonskapsler
                </Typography>      
                <Typography align="left" gutterBottom>
                Badenymfa.no bruker informasjonskapsler fra Google Analytics, Hotjar.com og Facebook for å analysere bruken av tjenesten badenymfa.no. Disse tjenestene samler inn typisk informasjon som nettlesern du bruker, hvilke sider du har besøk, hvor du kom fra, hva slags enhet du bruker og hvor lenge du har vært på siden.<br/> <br/>
                Dette gjør vi for å kunne lage siden bedre og lære litt opp hvordan man kan få trafikk inn på siden. Badenymfa.no er laget som et kompetanse/hobbyprosjekt hvor mye av dette går på å lære om hvordan man skape interesse for en tjenenese, i tillegg til det å faktisk ha laget den. <br/> <br/>
                Ønsker du at disse kapselene ikke skal benyttes kan du fjerne de under instilllinger i nettleseren din. Der kan du også skru av bruk av slike inforemasjonskapsler helt.  Mener du at jeg burde lage funksjonalitet for å gjøre dette på en enklere måte, så ta kontakt på facebook eller opp i tilbakemeldingsknappen. Det er interessant om å høre om du synes dette ikke er greit. Ellers håper jeg du er fornøyd med tjenesten og fortsetter å benytte den selv om jeg måler litt om hvordan den brukes. 
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