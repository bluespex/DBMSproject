import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation';
import Register from './components/Register';
import Signin from './components/Signin';
import CardList from './components/CardList';
import Scroll from './components/Scroll';
import { robots } from './components/robots'
import 'tachyons';
class App extends Component {
	constructor() {
		super();
		this.state = { apiResponse: "",
						robots: [],
						route: 'signin',
						isSignedIn:false,
						user: {
							id: '',
							name: '',
							email: ''
						} 
		};
	}

	  onInputChange = (event) => {
	    this.setState({input: event.target.value});
	  }

	loadUser = (data) => {
	    this.setState({user: {
	      id: data.id,
	      name: data.name,
	      email: data.email,
	      entries: data.entries,
	      joined: data.joined
	    }})
	  }

  onRouteChange = (route) => {
    if (route === 'signin' ) {
      this.setState({isSignedIn: false})
    } else if (route === 'home' || route === 'cart') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }


	callAPI() {
		fetch("http://localhost:9000/testAPI")
			.then(res => res.text())
			.then(res => this.setState({ apiResponse: res }))
			.catch(err => err);
	}

	componentDidMount() {
		// this.callAPI();
		this.setState({robots: robots})
	}

	render() {
		const { isSignedIn, route  } = this.state;
		return (
<<<<<<< HEAD
			<div className="App">
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<h1 className="App-title">Welcome to Food Delivering Website</h1>
					<h4> Made by :</h4>
					<h4> Piyush Shandil </h4>
					<h4> Prajjwal Kumar </h4>
				</header>
				<p className="App-intro">{this.state.apiResponse}</p>
=======
			<div className="App container">
				<Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
				<div className="">
		        { route === 'home'
		          ? <div>
		              <h1 className = 'athelas f1 '>Restaurant<br/>MENU</h1>
						<Scroll>
							<CardList robots={this.state.robots} />
						</Scroll>
		            </div>
		          : (
		          	 route === 'cart'
		          	 ? <p>cart</p>
					 :	(
				         route === 'signin'
    		             ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
    		             : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
		            	)		            
					)
		        }
		        </div>	
				
>>>>>>> 0e71be4128224ad5f079511b6fc087a933cc32c9
			</div>

		);
	}
}

export default App;













