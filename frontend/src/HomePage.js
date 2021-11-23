import {React} from 'react';
import {useHistory} from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import {CardActionArea, CardContent, CardMedia} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import Divider from '@mui/material/Divider';

const useStyles = makeStyles({
  root: {
    margin: '0 auto',
    justifyContent: 'space-between',
    display: 'flex',
  },
  card: {
    width: '42%',
    marginLeft: 40,
    marginRight: 40,
    minWidth: 500,
    maxWidth: 700,
  },
  thumbnail: {
    height: 400,
  },
});

export default function HomePage(props) {
  const classes = useStyles();
  const history = useHistory();

  const changeRoute = (e) => {
    const elem = e.target?.parentElement?.parentElement;
    if (
      elem?.id === 'leverage_card' ||
      elem?.parentElement?.id === 'leverage_card'
    ) {
      history.push('leverage');
    }
  };

  return (
    <div className={classes.root}>
      <Card variant="outlined" className={classes.card} onClick={changeRoute} id="leverage_card">
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
              Visualize the playoff implications for a each game of a
              team&apos;s remaining schedule.
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>

      <Card variant="outlined" className={classes.card}>
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
    </div>
  );
}
