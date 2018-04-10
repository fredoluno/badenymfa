import React from 'react';
import SampleCard  from './SampleCard';
import WeatherCard  from './WeatherCard';
import Grid from 'material-ui/Grid';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';

const styles = theme => ({
    root: {
      flexGrow: 1,
      margin: 'auto',
      paddingBottom:'30px',
    },    

    fredrik:{
      flexGrow: 1,
      margin: '8px',
    },
  });


function StartPage(props) {
    const { classes } = props;
    return (
        <div className={classes.root}>
        <Grid container justify="center" spacing={8}  className={classes.root} alignItems="stretch"  >
            <Grid item xs={12}>
            <Typography variant="display1" >
                  Nordbytjernet
            </Typography>
            <Typography variant="caption" >
                  Badenymfa gjør jobben med å finne ut hvor kaldt det er i vannet, så du slipper å dyppe tåa.
            </Typography>
            </Grid>
            <Grid item xs={11} sm={5} md={4} >
                <SampleCard />
            </Grid>
            <Grid item xs={11} sm={5} md={4} >
                <WeatherCard />
            </Grid>    
        </Grid>
      </div>
    );

  }

  StartPage.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(StartPage);