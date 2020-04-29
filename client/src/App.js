import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation';
import Register from './components/Register';
import Signin from './components/Signin';
import CardList from './components/CardList';
import Scroll from './components/Scroll';
import Cart from './components/cart'
// import { robots } from './components/robots'
import 'tachyons';
class App extends Component {
	constructor() {
		super();
		this.state = { apiResponse: "",
						robots: [],
						route: 'signin',
						isSignedIn:false,
						result: [], 
						sum: "0",
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
		fetch("http://localhost:9000/menu")
		.then(res => res.json())
		.then(res => this.setState({robots: res}))
		.catch(err => err);
		// this.setState({robots: robots})
	}

	fun = () => {
		fetch('http://localhost:9000/cart', {
	      method: 'post',
	      headers: {'Content-Type': 'application/json'},
	      body: JSON.stringify({
	        user_id: this.state.user.id
	      })
	    })
	      .then(response => response.json())
	      .then(res => {
	        this.setState({result: res})
	      }).catch(err => {console.log("Empty")})
    }

	sum = () => {
    	var s = 0;
    	this.state.result.map((d, idx) => {
         	s = s+ (d.quantity*d.price);
       	})
       	this.setState({sum: s});

    }

	render() {
		const { isSignedIn, route  } = this.state;
		return (
			<div className="App container">
				<div onClick={this.fun}>
				<Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
				</div>
				<div className="">
		        { route === 'home'
		          ? <div>
		              <h1 className = 'athelas f1 '>Restaurant<br/>MENU</h1>
						
							<CardList robots={this.state.robots} ID={this.state.user.id} />
						
		            </div>
		          : (
		          	 route === 'cart'
		          	 ?  <Cart result = {this.state.result} sum = {this.state.sum} calc ={this.sum}/>
					 :	(
				         route === 'signin'
    		             ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
    		             : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
		            	)		            
					)
		        }
		        </div>	
				
			</div>

		);
	}
}

export default App;













