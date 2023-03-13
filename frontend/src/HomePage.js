import {React} from 'react';
import {styled} from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import {CardActionArea, CardContent, CardMedia} from '@mui/material';
import Divider from '@mui/material/Divider';
import BlogPreview from './BlogPreview';
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
  const SB_BLOG_ROUTE = 'blogs/super_bowl';
  const PPE_BLOG_ROUTE = 'blogs/power_play_efficiency';

  return (
    (<Root>
      <Grid container columnSpacing={3} className={classes.mainView}>
        <Grid item md={7} lg={8} xs={12}>
          <Grid container rowSpacing={2}>
            <Grid item lg={12}>
              <Typography variant="h3" className={classes.headline}>
                Recent Posts
              </Typography>
            </Grid>

            <Grid item xs={12} md={12} lg={11} className={classes.column}>
              <BlogPreview
                id="ppe_blog"
                image_src="ppe_preview.png"
                title="PPE: A Deep Dive into NHL Power Plays"
                caption="Learn about Power Play Efficiency and the best (and worst) power play units."
                post_date="Fri, Mar 10 2023"
                url_route={PPE_BLOG_ROUTE}
              />
            </Grid>


            <Grid item xs={12} md={12} lg={11} className={classes.column}>
              <BlogPreview
                id="sb_blog"
                image_src="sb_preview.jpg"
                title="SB LVII Predictions: Start of a Dynasty?"
                caption="Preview the big game with props and a prediction!"
                post_date="Thurs, Feb 9 2023"
                url_route={SB_BLOG_ROUTE}
              />
            </Grid>


          </Grid>
        </Grid>

        <Grid item md={5} lg={4} xs={12}>
          <Grid container rowSpacing={2}>
            <Grid item lg={12} md={12} xs = {12}>
              <Typography variant="h3" className={classes.headline}>
                Tools
              </Typography>
            </Grid>

            <Grid item>
              <Card variant="outlined" id="leverage_card">
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
    </Root>)
  );
}
