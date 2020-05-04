import React from 'react';
import './card.css';

const Card = ({ id, name, detail, price, user }) => {
	return (
		<div className = 'tc bg-light-green dib pa3 br8 ma1 grow bw-2 shadow-3' 
			onClick={() => 
				 		fetch('http://localhost:9000/buy', {
					      method: 'put',
					      headers: {'Content-Type': 'application/json'},
					      body: JSON.stringify({
					        user_id: user,
					        menu_id: id
					      })
					    })
					      .then(response => response.json())
					      .then(res => {
					        console.log(res);
					      })
					      .catch(err => {console.log(err)})
					  }
		>	<div className="card home-page">
			<img alt = 'Robot' src = {require(`./images/pic${id}.jpg`)} />
			</div>
			<div className="card home-page">
				<h2><u>{name}</u></h2>
				<p className='f5 b'>{detail}</p><br/>
				<p className='f3 link dim black underline pa3 pointer'>
				Rs.{price}
				</p>
			</div>
		</div>
	);
}

export default Card;