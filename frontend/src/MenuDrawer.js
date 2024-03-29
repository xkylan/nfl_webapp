import React from 'react';
import {styled} from '@mui/material/styles';
import {
  Route, Routes, useNavigate,
} from 'react-router-dom';
import clsx from 'clsx';
import {useTheme} from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import TimelineIcon from '@mui/icons-material/Timeline';
import BarChartIcon from '@mui/icons-material/BarChart';
import HomeIcon from '@mui/icons-material/Home';
import LeverageCalculator from './LeverageCalculator';
import WinProbability from './WinProbability';
import HomePage from './HomePage';
import SuperBowlBlog from './SuperBowlBlog';
import PPEBlog from './PPEBlog';


const PREFIX = 'MenuDrawer';

const classes = {
  root: `${PREFIX}-root`,
  appBar: `${PREFIX}-appBar`,
  appBarShift: `${PREFIX}-appBarShift`,
  menuButton: `${PREFIX}-menuButton`,
  hide: `${PREFIX}-hide`,
  drawer: `${PREFIX}-drawer`,
  drawerPaper: `${PREFIX}-drawerPaper`,
  drawerHeader: `${PREFIX}-drawerHeader`,
  content: `${PREFIX}-content`,
  contentShift: `${PREFIX}-contentShift`,
  logo: `${PREFIX}-logo`,
  footer: `${PREFIX}-footer`,
};

const Root = styled('div')((
    {theme},
) => ({
  [`&.${classes.root}`]: {
    display: 'flex',
  },

  [`& .${classes.appBar}`]: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },

  [`& .${classes.appBarShift}`]: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },

  [`& .${classes.menuButton}`]: {
    marginRight: theme.spacing(2),
  },

  [`& .${classes.hide}`]: {
    display: 'none',
  },

  [`& .${classes.drawer}`]: {
    width: drawerWidth,
    flexShrink: 0,
  },

  [`& .${classes.drawerPaper}`]: {
    width: drawerWidth,
  },

  [`& .${classes.drawerHeader}`]: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flexEnd',
  },

  [`& .${classes.content}`]: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
    width: '100%',
  },

  [`& .${classes.contentShift}`]: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },

  [`& .${classes.logo}`]: {
    width: '60px',
    marginLeft: 'auto',
  },

  [`& .${classes.footer}`]: {
    'position': 'fixed',
    'bottom': 0,
    'right': 0,
    'fontSize': 10,
    'padding': 5,
    'marginRight': 5,
  },
}));


const drawerWidth = 240;

export default function MenuDrawer() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const changePage = (e) => {
    let next_path;
    if (e.target.innerText) {
      switch (e.target.innerText) {
        case 'Leverage Calculator':
          next_path = '/leverage';
          break;
        case 'Win Probability Viz':
          next_path = '/wp';
          break;
        default:
          next_path = '/';
      };
      navigate(next_path);
      handleDrawerClose();
    }
  };

  return (
    <Root className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
            size="large">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            k2 NFL Stats
          </Typography>

          <img src={'/rob-lowe.jpg'} className={classes.logo} alt="logo"/>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose} size="large">
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItemButton disabled key="Leverage Calculator" onClick={changePage}>
            <ListItemIcon>
              <BarChartIcon />
            </ListItemIcon>
            <ListItemText primary="Leverage Calculator" />
          </ListItemButton>
          <ListItemButton disabled key="Win Probability Viz" onClick={changePage}>
            <ListItemIcon>
              <TimelineIcon />
            </ListItemIcon>
            <ListItemText primary="Win Probability Viz" />
          </ListItemButton>

          <ListItemButton key="Home" onClick={changePage}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>
        </List>
        <Divider />
      </Drawer>

      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />

        <Routes>
          <Route path="/leverage" element={<LeverageCalculator />} />

          <Route path="/wp" element={<WinProbability />} />

          <Route exact path="/" element={<HomePage />} />

          <Route path="/blogs/super_bowl" element={<SuperBowlBlog />} />

          <Route path="/blogs/power_play_efficiency" element={<PPEBlog />} />
        </Routes>

        <Paper className={classes.footer}>
          Created by <a href="https://twitter.com/Ky1an">@Ky1an</a> and
          <a href="https://twitter.com/luckyprophet5">@LuckyProphet5</a> <br />
          <a href="https://github.com/xkylan/nfl_webapp/tree/master">GitHub Repo</a>
        </Paper>
      </main>
    </Root>
  );
}

