import React, { useState } from 'react';
import {
  HashRouter
} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import MenuDrawer from './MenuDrawer';

function App() {
  const [getMessage, setGetMessage] = useState({})

{/*  useEffect(()=>{
    axios.get('http://localhost:5000/flask/hello').then(response => {
      console.log("SUCCESS", response)
      setGetMessage(response)
    }).catch(error => {
      console.log(error)
    })

  }, []) */}

  return (
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
  );
}

export default App;