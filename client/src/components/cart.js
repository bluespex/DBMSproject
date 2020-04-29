import React from 'react';

const Cart = ({result,sum,calc}) => { 
	return(
	    <div>
	    	<div>
	    		<p> Name Quantity Price</p>
	    	</div>
	    	{
				result.map((d, idx) => {
		         return (
		         	// <li key={idx}>{d.name}</li>
		         	<div key={idx}>
						<p className='f3 link dim black pa3 pointer'>
						{d.name} {d.quantity} Rs.{d.price}
						</p><br/>
					</div>

		         )
		       	})
	    	}
	    	<div>
		    	<p onClick ={()=>{calc()}}>sum {sum}</p>
		    </div>
	    </div>

			
	)
}

export default Cart;