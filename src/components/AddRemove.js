import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { apiCall } from './../utils/network';
import FormControl from '@material-ui/core/FormControl';
	
export default class AddRemove extends Component {
	constructor(props) {
		super(props);

		this.state = {
			plate: "MH-02-AB-1234",
			color: "white",
			spot: "",
			isFetching: false
		};
		
		this.handleChange = this.handleChange.bind(this);
		this.getTicket = this.getTicket.bind(this);
		this.setFree = this.setFree.bind(this);
	}
	
	handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };
	
	getTicket(){
		
		this.setState({
			isFetching: true
		})
		
		var successTicket = function(data){
			this.setState({
				spot: data.spot,
				isFetching: false
			})
		}.bind(this)
		
		var errorTicket = function(error){
			this.setState({
				isFetching: false
			})
		}.bind(this)
		
		var sendData = {
			'plate': this.state.plate,
			'color': this.state.color
		}
		apiCall('POST', '/parkings', sendData, successTicket, errorTicket)
	}
	
	setFree(){
		
		this.setState({
			isFetching: true
		})
		
		var successFree = function(data){
			this.setState({
				isFetching: false
			})
		}.bind(this)
		
		var errorFree = function(error){
			this.setState({
				isFetching: false
			})
		}.bind(this)
		
		var sendData = {
			'spot': this.state.spot
		}
		apiCall('DELETE', '/parkings', sendData, successFree, errorFree)
	}
	
	render() {
    return (
      <div className="container">
				<Card className="card">
					<CardContent>
						<Typography gutterBottom variant="h5" component="h2">
							Add
						</Typography>
						<div>
							<form noValidate autoComplete="off">
								<FormControl>
									<TextField
										id="outlined-name"
										label="Plate"
										value={this.state.plate}
										onChange={this.handleChange('plate')}
										margin="normal"
										variant="outlined"
									/>
								</FormControl>
								<FormControl>
									<TextField
										id="outlined-name"
										label="Color"
										value={this.state.color}
										onChange={this.handleChange('color')}
										margin="normal"
										variant="outlined"
									/>
								</FormControl>
								<FormControl>
									<Button variant="contained" color="primary" onClick={this.getTicket}>
										Submit
									</Button>
								</FormControl>
							</form>
						</div>
					</CardContent>
				</Card>
				<Card className="card">
					<CardContent>
						<Typography gutterBottom variant="h5" component="h2">
							Remove
						</Typography>
						<div>
							<form noValidate autoComplete="off">
								<div>
									<TextField
										id="outlined-name"
										label="Spot"
										value={this.state.spot}
										onChange={this.handleChange('spot')}
										margin="normal"
										variant="outlined"
									/>
								</div>
								<div>
									<Button variant="contained" color="primary" onClick={this.setFree}>
										Submit
									</Button>
								</div>
							</form>
						</div>
					</CardContent>
				</Card>
      </div>
    );
  }
}