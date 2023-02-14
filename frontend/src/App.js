import React from 'react';
import {
  HashRouter,
} from 'react-router-dom';
import Grid from '@mui/material/Grid';
import MenuDrawer from './MenuDrawer';
import {
  createTheme, ThemeProvider, StyledEngineProvider,
} from '@mui/material/styles';

// Root component for the react app
function App() {
  const theme = createTheme();

  return (
    <StyledEngineProvider injectFirst>
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
    </StyledEngineProvider>
  );
}

export default App;
