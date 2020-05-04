import React from 'react';
import Cart from './Cart'

const CartList =({result,sum,calc,ID,fun}) =>{
    return(
        <div>
            <h1 className= "tc">CART</h1>
            {
                result.map((d,idx) =>{
                    return (
                        <Cart
                        key={d.id}
                        id={d.id}
                        name={d.name}
                        quantity={d.quantity}
                        price={d.price}
                        user={ID}
                        func={fun}
                        />

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

export default CartList;