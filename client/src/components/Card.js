import React from 'react';

const Card = ({ id, name, detail, price }) => {
	return (
		<div className = ' tc bg-light-green dib pa3 br3 ma2 grow bw-2 shadow-5'>
			<img alt = 'Robot' src = {`https://robohash.org/${id}?200x200`} />
			<div>
				<h2>{name}</h2>
				<p className='f5 b'>{detail}</p><br/>
				<p className='f3 link dim black underline pa3 pointer'>Rs.{price}</p>
			</div>
		</div>
	);
}

export default Card;