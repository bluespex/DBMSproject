import React from 'react';

const Cart = ({result,sum}) => { 
	return(
	    <div>
	    	<div>
	    		<p> name quantity price</p>
	    	</div>
	    	{
				result.map((d, idx) => {
		         return (
		         	// <li key={idx}>{d.name}</li>
		         	<div key={idx}>
						<p className='f3 link dim black underline pa3 pointer'>
						{d.name} {d.quantity} Rs.{d.price}
						</p><br/>
					</div>
		         )
		       	})
	    	}
	    	<div>
		    	<p>sum {sum}</p>
		    </div>
	    </div>

			
	)
}

export default Cart;