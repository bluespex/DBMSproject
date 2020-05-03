import React from 'react';
import './cart.css';

const Cart = ({result,sum,calc}) => { 
	return(
		
	    <div>
			<h1 className= "tc">CART</h1>
	    	{
				
				result.map((d, idx) => {
		         return (
					 // <li key={idx}>{d.name}</li>
					 <div className="box" key={idx}>
					
		         	<li className= "cart item" key={idx}>
				     <div className = "cart item-img">
					 <img alt = 'Robot' src = {require(`./images/pic${d.id}.jpg`)} />
					 </div>
					<div className="cart item-desc" key={idx}>	
					    <p> </p>
						<p><b>{d.name}</b></p>  
						<p><b>Quantity : {d.quantity}</b></p>
						<p><b>Price : Rs.{d.price}</b></p>
					    <br/>
					</div>
					</li>
					
				
					</div>

		         )
		       	})
	    	}
	    	<div>
		    	<button className='waves-effect waves-light btn pink' onClick ={()=>{calc()}}>Total :</button>
				<p className="tc">{sum}</p>
		    </div>
	    </div>

			
	)
}

export default Cart;