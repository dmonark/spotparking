import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import { apiCall } from './../utils/network';

export default class Summary extends Component {
	constructor(props) {
		super(props);

		this.state = {
			rows: [],
			color: 'all',
			plate: '',
			spot: '',
			type: '0',
			isFetching: true
		};
		this.getDetails = this.getDetails.bind(this)
		this.getReset = this.getReset.bind(this)
	}
	
	componentDidMount(){
		this.getDetails();
	}
	
	handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    }, () => {
			this.getDetails()
		});
  };
	
	getDetails(){
		
		this.setState({
			isFetching: true
		})
		
		var successSummary = function(data){
			this.setState({
				rows: data,
				isFetching: false
			})
		}.bind(this)
		
		var errorSummary = function(error){
			this.setState({
				isFetching: false
			})
		}.bind(this)
		
		var sendData = {}
		
		if(this.state.color !== "all")	
			sendData['color'] = this.state.color
		
		if(this.state.type !== "all")
			sendData['type'] = this.state.type
		
		if(this.state.plate.trim() !== "")
			sendData['plate'] = this.state.plate
		
		if(!isNaN(this.state.spot.trim()))
			sendData['spot'] = this.state.spot
		
		apiCall('POST', '/parkings/summary', sendData, successSummary, errorSummary)
	}
	
	getReset(){
		this.setState({
			rows: [],
			color: 'all',
			plate: '',
			spot: '',
			type: '0',
			isFetching: true
		}, () => {
			this.getDetails()
		})
	}
	
	render() {
		const {rows} = this.state

    return (
      <div>
				<Card>
					<CardContent>
						<Table>
							<TableHead>
								<TableRow>
									<TableCell>
										<Typography gutterBottom variant="h5" component="h2">
											FILTER
										</Typography>
									</TableCell>
									<TableCell align="right">
										<FormControl>
											<TextField
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
									</TableCell>
									<TableCell align="right">
										<FormControl>
											<TextField
												id="filled-full-width"
												label="Plate"
												value={this.state.plate}
												onChange={this.handleChange('plate')}
												placeholder="Plate Number"
												fullWidth
												InputLabelProps={{
													shrink: true,
												}}
											/>
										</FormControl>
									</TableCell>
									<TableCell align="right">
										<FormControl>
											<InputLabel htmlFor="color-helper">Color</InputLabel>
											<Select
												fullWidth
												value={this.state.color}
												onChange={this.handleChange('color')}
												input={<Input name="color" id="color-helper" />}
											>
												<MenuItem value={'all'}>All</MenuItem>
												<MenuItem value={'white'}>White</MenuItem>
												<MenuItem value={'black'}>Black</MenuItem>
												<MenuItem value={'red'}>Red</MenuItem>
												<MenuItem value={'blue'}>Blue</MenuItem>
											</Select>
										</FormControl>
									</TableCell>
									<TableCell align="right">
										<FormControl>
											<InputLabel htmlFor="type-helper">Type</InputLabel>
											<Select
												fullWidth
												value={this.state.type}
												onChange={this.handleChange('type')}
												input={<Input name="type" id="type-helper" />}
											>
												<MenuItem value={'all'}>All</MenuItem>
												<MenuItem value={'0'}>Only In</MenuItem>
												<MenuItem value={'1'}>Only Out</MenuItem>
											</Select>
										</FormControl>
									</TableCell>
									<TableCell>
										<FormControl>
											<Button variant="contained" color="primary" onClick={this.getReset}>
												Reset
											</Button>
										</FormControl>
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell>ID</TableCell>
									<TableCell align="right">Spot</TableCell>
									<TableCell align="right">Plate Number</TableCell>
									<TableCell align="right">Color</TableCell>
									<TableCell align="right">In Time</TableCell>
									<TableCell align="right">Out Time</TableCell>
								</TableRow>
							</TableHead>
							{
								!this.state.isFetching ? (
									<TableBody>
										{rows.map(row => (
											<TableRow key={row.id}>
												<TableCell component="th" scope="row">{row.id}</TableCell>
												<TableCell align="right">{row.spot}</TableCell>
												<TableCell align="right">{row.plate}</TableCell>
												<TableCell align="right">{row.color}</TableCell>
												<TableCell align="right">{moment(row.createdAt).format('lll')}</TableCell>
												<TableCell align="right">{row.outAt? moment(row.updatedAt).format('lll') : ""}</TableCell>
											</TableRow>
										))}
									</TableBody>
								) : null
							}
						</Table>
					</CardContent>
				</Card>
      </div>
    );
  }
}
