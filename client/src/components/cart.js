import React from 'react';
import './Cart.css';

const Cart = ({idx,id,name,quantity,price,user,func}) => { 
	return(
		
	    <div>
			<div className="box">
					
		         	<li className= "cart item">
				     <div className = "cart item-img">
					 <img alt = 'Robot' src = {require(`./images/pic${id}.jpg`)} />
					 </div>
					<div className="cart item-desc" onClick={func()}>	
					    <p> </p>
						<p><b>{name}</b></p>  
						<p><b>Quantity : {quantity}</b></p>
						<p><b>Price : Rs.{price}</b></p>
						<button onClick={()=>{
						fetch('http://localhost:9000/remove', {
							method: 'put',
							headers: {'Content-Type': 'application/json'},
							body: JSON.stringify({
							  user_id: user,
							  menu_id: id
							})
						  })
							.then(response => response.json());
							
							}
						}>Remove</button>
					    <br/>
					</div>
					</li>
					
				
					</div>
	    
	    </div>

			
	)
}

export default Cart;