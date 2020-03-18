import React from 'react';
import Card from './Card'

const CardList = ({robots}) => { 
	return(
		<div>
			{
				robots.map((user,i) =>{
					return (
						<Card 
						key = {user.id} 
						id={user.id} 
						name={user.name} 
						detail={user.detail} 
						price={user.price}
						 />
					);
				})
			}
		</div>
	)
}

export default CardList;