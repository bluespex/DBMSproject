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

	onSPriceChange = (event) => {
	   	this.setState({starting_price: event.target.value})
	}
	onEPriceChange = (event) => {
	   	this.setState({ending_price: event.target.value})
	}
	priceFilter = () => {
		// this.callAPI();
		// fetch("http://localhost:9000/price")
		// .then(res => res.json())
		// .then(res => this.setState({robots: res}))
		// .catch(err => err);
		// this.setState({robots: robots})
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
				<div className ="App signin" onClick={this.fun}>
				<Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
				</div>
				<div className="">
		        { route === 'home'
		          ? <div>
		              <h1 className = 'athelas f1 underline'>P4 CAFE</h1>
					   	
					   <h3 className="App leftmar"><b><i><u>Price Filter:</u></i></b></h3>
					   <div >
						<p className="App price-filter">Enter Starting Price : </p>
						<input onChange = {this.onSPriceChange} className="App field-box" type="text"></input>
						<p className="App price-filter">Enter Ending Price : </p>
						<input onChange = {this.onEPriceChange} className="App field-box" type="text"></input>
						</div>
						<button onClick = {this.priceFilter} className="App leftbutton">Submit</button>	
						<button className="App button-mar">VEG</button>
					   <button className="App button-mar">NON-VEG</button><br/>
					   <br/>
					   <p>   </p>
					   <p>   </p>
					   <br/>
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













