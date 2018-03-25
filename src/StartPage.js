import React, { Component } from 'react';
import SampleCard  from './SampleCard';
import WeatherCard  from './WeatherCard';
import Grid from 'material-ui/Grid';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';

const styles = theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing.unit * 2,
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  });


function StartPage(props) {
    const { classes } = props;
    return (
        <div className={classes.root}>
        <Grid container spacing={8}  alignItems="center">
            <Grid item xs={12}>
            <Typography variant="display1" gutterBottom>
                  Nordbytjernet
            </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
                <SampleCard />
            </Grid>
            <Grid item xs={12} sm={6}>
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