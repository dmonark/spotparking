import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { apiCall } from './../utils/network';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Collapse from '@material-ui/core/Collapse';

export default class AddRemove extends Component {
	constructor(props) {
		super(props);

		this.state = {
			plate: "MH-02-AB-1234",
			color: "white",
			spotTicket: {},
			isFetching: false,
			isSuccess: null,
			isError: null,
			isPlateError: false
		};
		
		this.handleChange = this.handleChange.bind(this);
		this.getTicket = this.getTicket.bind(this);
	}
	
	handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };
	
	getTicket(){
		var successTicket = function(data){
			this.setState({
				spotTicket: data,
				isFetching: false,
				isSuccess: true,
				isError: false,
				plate: "",
				color: "white"
			})
		}.bind(this)
		
		var errorTicket = function(error){
			this.setState({
				isFetching: false,
				isSuccess: false,
				isError: true,
				plate: "",
				color: "white"
			})
		}.bind(this)
		
		if(this.state.plate.trim() === ""){
			this.setState({
				isPlateError: true
			})
		} else {
			this.setState({
				isFetching: true
			})
			var sendData = {
				'plate': this.state.plate,
				'color': this.state.color
			}
			apiCall('POST', '/parkings', sendData, successTicket, errorTicket)
		}
	}
	
	render() {
    return (
			<Card className="card">
				<CardContent>
					<Typography gutterBottom variant="h5" component="h2">
						Add
					</Typography>
					<div>
						<form noValidate autoComplete="off">
							<div className="action-input">
								<FormControl className="action-input">
									<TextField
										error={this.state.isPlateError}
										id="filled-full-width"
										label="Plate Number"
										value={this.state.plate}
										onChange={this.handleChange('plate')}
										placeholder="Plate Number"
										fullWidth
										InputLabelProps={{
											shrink: true,
										}}
									/>
								</FormControl>
							</div>
							<div className="action-input">
								<FormControl className="action-input">
									<InputLabel htmlFor="color-helper">Color</InputLabel>
									<Select
										fullWidth
										value={this.state.color}
										onChange={this.handleChange('color')}
										input={<Input name="color" id="color-helper" />}
									>
										<MenuItem value={'white'}>White</MenuItem>
										<MenuItem value={'black'}>Black</MenuItem>
										<MenuItem value={'red'}>Red</MenuItem>
										<MenuItem value={'blue'}>Blue</MenuItem>
									</Select>
								</FormControl>
							</div>
							<div className="action-input">
								<FormControl className="action-input">
									<Button variant="contained" color="primary" onClick={this.getTicket} disabled={this.state.isFetching}>
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
						{
							"Spot "+this.state.spotTicket.spot
						}
						</Typography>
						<Typography variant="overline" gutterBottom>
						{this.state.spotTicket.plate + " " + this.state.spotTicket.color}
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