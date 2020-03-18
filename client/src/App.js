import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation';
import Register from './components/Register';
import Signin from './components/Signin';
import 'tachyons';
class App extends Component {
	constructor() {
		super();
		this.state = { apiResponse: "",
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
    if (route === 'signin') {
      this.setState({isSignedIn: false})
    } else if (route === 'home') {
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
		this.callAPI();
	}

	render() {
		const { isSignedIn, route  } = this.state;
		return (
			<div className="App container">
				<Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
				<div className="">
		        { route === 'home'
		          ? <div>
		              <p> home </p>
		            </div>
		          : (
		             route === 'signin'
		             ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
		             : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
		            )
		        }
		        </div>	
				
			</div>

		);
	}
}

export default App;













