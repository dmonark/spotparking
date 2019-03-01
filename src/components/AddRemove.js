import React, { Component } from 'react';
import Add from './Add';
import Remove from './Remove';


export default class AddRemove extends Component {
	render() {
    return (
      <div className="container">
				<Add />
				<Remove />
      </div>
    );
  }
}