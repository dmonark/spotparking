import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AddRemove from './components/AddRemove';
import Summary from './components/Summary';

class App extends Component {
  constructor(props) {
		super(props);

		this.state = {
			value: 0
		};
		
		this.handleChange = this.handleChange.bind(this);
	}
	
	handleChange = (event, value) => {
    this.setState({ value });
  };
	
	render() {
		const { value } = this.state;
			
    return (
      <div className="App">
				<AppBar position="static">
          <Tabs value={value} onChange={this.handleChange}>
            <Tab label="Add / Remove" />
            <Tab label="Summary" />
          </Tabs>
        </AppBar>
        {value === 0 && <AddRemove />}
        {value === 1 && <Summary />}
      </div>
    );
  }
}

export default App;
