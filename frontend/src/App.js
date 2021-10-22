import React, { useState } from 'react';
import {
  HashRouter
} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import MenuDrawer from './MenuDrawer';
import { makeStyles } from '@mui/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function App() {
  const [getMessage, setGetMessage] = useState({})
  const theme = createTheme();

{/*  useEffect(()=>{
    axios.get('http://localhost:5000/flask/hello').then(response => {
      console.log("SUCCESS", response)
      setGetMessage(response)
    }).catch(error => {
      console.log(error)
    })

  }, []) */}

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