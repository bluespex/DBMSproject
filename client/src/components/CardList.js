import React from 'react';
import Card from './Card'

const CardList = ({robots,ID}) => { 
	return(
		<div>
			{
				robots.map((user,i) =>{
					return (
						<Card 
						key = {user.id} 
						id={user.id} 
						name={user.name} 
						detail={user.details} 
						price={user.price}
						user={ID}
						 />
					);
				})
			}
		</div>
	)
}

export default CardList;