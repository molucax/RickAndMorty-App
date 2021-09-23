import React from "react";

const Card = ({ image, name }) => {
	return (
		<div>
			<img src={image} alt={name} />
			<p>{name}</p>
		</div>
	)
}

export default Card;