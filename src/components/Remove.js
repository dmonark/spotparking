import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { apiCall } from './../utils/network';
import FormControl from '@material-ui/core/FormControl';
import Collapse from '@material-ui/core/Collapse';

export default class AddRemove extends Component {
	constructor(props) {
		super(props);

		this.state = {
			spot: "",
			isFetching: false,
			isSuccess: null,
			isError: null,
			isSpotError: false
		};
		
		this.handleChange = this.handleChange.bind(this);
		this.setFree = this.setFree.bind(this);
	}
	
	handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };
	
	setFree(){
		var successFree = function(data){
			this.setState({
				isFetching: false,
				isSuccess: true,
				isError: false,
			})
		}.bind(this)
		
		var errorFree = function(error){
			this.setState({
				isFetching: false,
				isSuccess: false,
				isError: true,
			})
		}.bind(this)
		
		if(isNaN(this.state.spot)){
			this.setState({
				isSpotError: true
			})
		} else if(parseInt(this.state.spot) < 0 || parseInt(this.state.spot) > 100){
			this.setState({
				isSpotError: true
			})
		} else {
			this.setState({
				isFetching: true
			})
			var sendData = {
				'spot': this.state.spot
			}
			apiCall('DELETE', '/parkings', sendData, successFree, errorFree)
		}
	}
	
	render() {
    return (
      <Card className="card">
				<CardContent>
					<Typography gutterBottom variant="h5" component="h2">
						Remove
					</Typography>
					<div>
						<form noValidate autoComplete="off">
							<div className="action-input">
								<FormControl>
									<TextField
										error={this.state.isSpotError}
										id="filled-full-width"
										label="Spot"
										value={this.state.spot}
										onChange={this.handleChange('spot')}
										placeholder="Spot Number"
										fullWidth
										InputLabelProps={{
											shrink: true,
										}}
									/>
								</FormControl>
							</div>
							<div className="action-input">
								<FormControl className="action-input">
									<Button variant="contained" color="primary" onClick={this.setFree} disabled={this.state.isFetching}>
										Submit
									</Button>
								</FormControl>
							</div>
						</form>
					</div>
				</CardContent>
				<Collapse in={this.state.isSuccess} timeout="auto" unmountOnExit>
					<CardContent>
            <Typography variant="h5" gutterBottom>
						Spot Removed
						</Typography>
          </CardContent>
				</Collapse >
				<Collapse in={this.state.isError} timeout="auto" unmountOnExit>
					<CardContent>
            <Typography variant="h6" gutterBottom>
							Some Error Occured
						</Typography>
          </CardContent>
				</Collapse >
			</Card>
    );
  }
}