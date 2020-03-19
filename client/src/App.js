import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = { apiResponse: "" };
	}

	callAPI() {
		fetch("http://localhost:9000/testAPI")
			.then(res => res.text())
			.then(res => this.setState({ apiResponse: res }))
			.catch(err => err);
	}

	componentDidMount() {
		this.callAPI();
	}

	render() {
		return (
			<div className="App">
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<h1 className="App-title">Welcome to Food Delivering Website</h1>
					<h4> Made by :</h4>
					<h4> Piyush Shandil </h4>
					<h4> Prajjwal Kumar </h4>
				</header>
				<p className="App-intro">{this.state.apiResponse}</p>
			</div>
		);
	}
}

export default App;
