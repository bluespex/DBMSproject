import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation';
import Register from './components/Register';
import Signin from './components/Signin';
import CardList from './components/CardList';
// import Scroll from './components/Scroll';
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
						starting_price: 0,
						ending_price: 100000,
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

	onSPriceChange = (event) => {
	   	this.setState({starting_price: event.target.value})
	}
	onEPriceChange = (event) => {
	   	this.setState({ending_price: event.target.value})
	}
	priceFilter = () => {
		fetch('http://localhost:9000/price', {
	      method: 'post',
	      headers: {'Content-Type': 'application/json'},
	      body: JSON.stringify({
	        left: this.state.starting_price,
	        right: this.state.ending_price
	      })
	    })
	    .then(res => res.json())
		.then(res => this.setState({robots: res}))
		.catch(err => err);
	}

	clear = () => {
		fetch('http://localhost:9000/clear', {
	      method: 'put',
	      headers: {'Content-Type': 'application/json'},
	      body: JSON.stringify({
	        user_id: this.state.user.id
	      })
	    })
	    .then(res => res.json())
		.then(res => console.log(res))
		.catch(err => err);
		this.setState({sum:0});
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
         	return s;
       	})
       	this.setState({sum: s});

    }

	render() {
		const { isSignedIn, route  } = this.state;
		return (
			<div className="App container">
				<div className ="App signin" onClick={this.fun}>
				<Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} clear={this.clear}/>
				</div>
				<div className="">
		        { route === 'home'
		          ? <div>
		              <h1 className = 'athelas f1 underline'>P4 CAFE</h1>
					   <div>
						   <div className="App price">
						   <h3 className="App leftmar"><b><i><u>Price Filter:</u></i></b></h3>
							<input onChange = {this.onSPriceChange} className="App field-box" placeholder="Enter Starting Price" type="text"></input>
							<input onChange = {this.onEPriceChange} className="App field-box" placeholder="Enter Ending Price" type="text"></input>
							<button onClick = {this.priceFilter} className="App leftbutton">Submit</button>	
							</div>
							
						   <br/>
					   </div>
					   <h3 className='athelas f3'><i><u>MENU</u></i></h3>
							<CardList robots={this.state.robots} ID={this.state.user.id} />
					
		            </div>
		          : (
		          	 route === 'cart'
		          	 ?  <Cart result = {this.state.result} sum = {this.state.sum} calc ={this.sum}/>
					 :	
					 
					 (
				         route === 'signin'
						 ?
						//  <div className = "App Sign">
						 <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
						//  </div>
    		             : 
						//  <div className = "App Sign">
						 <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>	
						)		            
					)
		        }
		        </div>	
				
			</div>

		);
	}
}

export default App;













