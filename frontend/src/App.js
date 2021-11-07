import React from 'react';
import {
  HashRouter,
} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import MenuDrawer from './MenuDrawer';
import {createTheme, ThemeProvider} from '@mui/material/styles';

// Root component for the react app
function App() {
  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      <HashRouter>
        <div id="app">
          <Grid
            container
            direction="column"
            justifyContent="center"
          >
            <Grid item>
              <MenuDrawer />
            </Grid>
          </Grid>
        </div>
      </HashRouter>
    </ThemeProvider>
  );
}

export default App;
