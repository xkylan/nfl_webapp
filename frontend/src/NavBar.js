import React from 'react';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

const PREFIX = 'NavBar';

const classes = {
  root: `${PREFIX}-root`,
  menuButton: `${PREFIX}-menuButton`,
  title: `${PREFIX}-title`
};

const Root = styled('div')((
  {
    theme
  }
) => ({
  [`&.${classes.root}`]: {
    flexGrow: 1,
  },

  [`& .${classes.menuButton}`]: {
    marginRight: theme.spacing(2),
  },

  [`& .${classes.title}`]: {
    flexGrow: 1,
  }
}));

export default function NavBar() {


  return (
    <Root className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            size="large">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            NFL Playoff Leverage
          </Typography>
        </Toolbar>
      </AppBar>
    </Root>
  );
}

