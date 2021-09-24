import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCharacters, setOrder } from "../Redux/actions";

const Order = () => {
	const { name, page } = useSelector(state => state);
	const dispatch = useDispatch();

	const handleSelect = (e) => {
		dispatch(setOrder(e.target.value));
		dispatch(getCharacters({ name, page, order: e.target.value }))
	}

	return (
		<div>
			<select onChange={handleSelect}>
				<option selected value="asc">A - Z</option>
				<option value="sarasa">Z - A</option>
			</select>
		</div>
	)
}

export default Order;