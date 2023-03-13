import {React} from 'react';
import {styled} from '@mui/material/styles';
import {useNavigate} from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import {CardActionArea, CardContent, CardMedia} from '@mui/material';
import Divider from '@mui/material/Divider';
const PREFIX = 'HomePage';

const classes = {
  container: `${PREFIX}-container`,
  thumbnail: `${PREFIX}-thumbnail`,
  headline: `${PREFIX}-headline`,
  mainView: `${PREFIX}-mainView`,
};

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

export default function BlogPreview(props) {
  const navigate = useNavigate();

  const changeRoute = (e) => {
    const elem = e.target?.parentElement?.parentElement;

    if (
      elem?.id === props.id ||
      elem?.parentElement?.id === props.id
    ) {
      navigate(props.url_route);
    }
  };

  return (
    (<Root>
      <Card variant="outlined" onClick={changeRoute} id={props.id}>
        <CardActionArea>
          <CardMedia
            className={classes.thumbnail}
            image={props.image_src}
          />

          <Divider />

          <CardContent>
            <Typography variant="h5" component="h2">
              {props.title}
            </Typography>

            <Typography variant="body2" component="p">
              {props.caption}<br /> <br />

              {props.post_date} <br />
              By Kylan Sakata
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Root>)
  );
}
