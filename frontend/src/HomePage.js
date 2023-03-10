import {React} from 'react';
import {styled} from '@mui/material/styles';
import {useNavigate} from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import {CardActionArea, CardContent, CardMedia} from '@mui/material';
import Divider from '@mui/material/Divider';
const PREFIX = 'HomePage';

const classes = {
  container: `${PREFIX}-container`,
  thumbnail: `${PREFIX}-thumbnail`,
  headline: `${PREFIX}-headline`,
  mainView: `${PREFIX}-mainView`,
};

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled('div')({
  [`& .${classes.container}`]: {
    margin: '0 auto',
    display: 'flex',
  },
  // card: {
  //   width: '100%',
  // },
  [`& .${classes.thumbnail}`]: {
    height: 280,
    width: '100%',
  },
  [`& .${classes.headline}`]: {
    paddingLeft: 20,
    paddingTop: 30,
  },
  [`& .${classes.mainView}`]: {
    paddingLeft: '3%',
    width: '100%',
  },
  [`&.${classes.column}`]: {
    width: '100%',
  },
});

export default function HomePage(props) {
  const navigate = useNavigate();

  const changeRoute = (e) => {
    const elem = e.target?.parentElement?.parentElement;

    if (
      elem?.id === 'leverage_card' ||
      elem?.parentElement?.id === 'leverage_card'
    ) {
      // TODO: remove later navigate('leverage');
    } else if (
      elem?.id === 'blogs_card' ||
      elem?.parentElement?.id === 'blogs_card'
    ) {
      navigate('blogs');
    }
  };

  return (
    (<Root>
      <Grid container columnSpacing={3} rowSpacing={1} className={classes.mainView}>
        <Grid item md={7} lg={8} xs={12}>
          <Grid container>
            <Grid item lg={12}>
              <Typography variant="h3" className={classes.headline}>
                Recent Posts
              </Typography>
            </Grid>

            <Grid item xs={12} md={12} lg={11} className={classes.column}>
              <Card variant="outlined" className={classes.card} onClick={changeRoute} id="blogs_card">
                <CardActionArea>
                  <CardMedia
                    className={classes.thumbnail}
                    image="sb_preview.jpg"
                    title="SB LVII Preview"
                  />

                  <Divider />

                  <CardContent>
                    <Typography variant="h5" component="h2">
                      SB LVII Predictions: Start of a Dynasty?
                    </Typography>

                    <Typography variant="body2" component="p">
                      Preview the big game with props and a prediction! <br /> <br />

                      Posted on Thurs, Feb 9 2023 <br />
                      By Kylan Sakata
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          </Grid>
        </Grid>

        <Grid item md={5} lg={4} xs={12}>
          <Grid container>
            <Grid item lg={12}>
              <Typography variant="h3" className={classes.headline}>
                Tools
              </Typography>
            </Grid>

            <Grid item>
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
                      Leverage Calculator (WIP)
                    </Typography>

                    <Typography variant="body2" component="p">
                      Visualize the playoff implications for a each game of a
                      team&apos;s remaining schedule.
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {/*
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
        */}
      {/* </div>*/}
    </Root>)
  );
}
