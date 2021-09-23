import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCharacters } from "../Redux/actions/index.js";
import Card from "./Card.jsx";


const Home = () => {

	const dispatch = useDispatch();
	const { characters } = useSelector(state => state);
	const [page, setPage] = useState(1);

	useEffect(() => {
		dispatch(getCharacters({}))
	}, [dispatch])

	const changePage = (page) => {
		dispatch(getCharacters({ page }))
		setPage(page)
	}


	return (
		<div>
			{
				characters?.result?.length>0 && characters.result.map((e) => {
					return <Card image={e.image} name={e.name} key={e.id}/>
				})
			}
			<button 
				disabled={page -1 === 0} 
				onClick={ () => {changePage(page-1)}}
			>
				previous
			</button>

			<label>{page}</label>

			<button 
				disabled={characters?.count <= (page * 5)} 
				onClick={()=>{changePage(page +1)}}
			>
				next
			</button>

		</div>
		)
}

export default Home;