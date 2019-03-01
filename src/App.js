import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Add from './components/Add';
import Remove from './components/Remove';
import Summary from './components/Summary';
import Grid from '@material-ui/core/Grid';

class App extends Component {
  render() {		
    return (
      <div className="App">
				<AppBar position="static">
          <Toolbar variant="dense">
						<Typography variant="h6" color="inherit">
							Spot Parking
						</Typography>
					</Toolbar>
        </AppBar>
				<div className="container">
        <Grid container spacing={24}>
					<Grid item xs={6}>
						<Add />
					</Grid>
					<Grid item xs={6}>
						<Remove />
					</Grid>
					<Grid item xs={12}>
						<Summary />
					</Grid>
				</Grid>
				</div>
      </div>
    );
  }
}

export default App;
