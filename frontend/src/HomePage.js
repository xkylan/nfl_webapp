import { React, Component, Fragment } from 'react';
import {
  Route, Switch, useHistory
} from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import { CardActionArea, CardActions, CardContent, CardMedia } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles({
  root: {
    width: 520
  },
  thumbnail: {
    height: 400,
    margin: '0 auto'
  },
});

export default function HomePage(props) {
  const classes = useStyles();
  let history = useHistory();

  const changeRoute = (e) => {
    var elem = e.target?.parentElement?.parentElement;
    if (elem?.id === "leverage_card" || elem?.parentElement?.id === "leverage_card") {
      history.push("leverage");
    }
  }

  return (
    <Grid
      container
      direction="row"
      spacing={1}
      alignItems="center"
      justifyContent="center"
    >
      <Grid item xs>
        <Card variant="outlined" className={classes.root} onClick={changeRoute} id="leverage_card">
          <CardActionArea>
            <CardMedia
              className={classes.thumbnail}
              image="leverage_thumbnail.png"
              title="Leverage Calculator"
            />
            
            <Divider />

            <CardContent>
              <Typography variant="h5" component="h2">
                Leverage Calculator
              </Typography>

              <Typography variant="body2" component="p">
                Visualize the playoff implications for a each game of a team's remaining schedule.
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
      

      <Grid item xs>
        <Card variant="outlined" className={classes.root}>
          <CardActionArea>
            <CardMedia
              className={classes.thumbnail}
              image="win_probability.jpeg"
              title="Win Probability Aggregator"
            />
            
            <Divider />

            <CardContent>
              <Typography variant="h5" component="h2">
                Win Probability Aggregator (coming soon)
              </Typography>

              <Typography variant="body2" component="p">
                A consolidation of various play-by-play win probabilities.
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    </Grid>
  )
}