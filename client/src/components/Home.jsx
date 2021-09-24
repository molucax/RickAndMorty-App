import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCharacters, settingPage } from "../Redux/actions/index.js";
import Card from "./Card.jsx";

// IMPORTANTE:
// Esto es un componente, así que si queres seguir el flujo de los comentarios sin marearte
// deberías empezar a leer desde un evento, por ejemplo un "onClick".

const Home = () => {

	const dispatch = useDispatch(); // <--- para poder usar el dispatch
	const { characters, name, order, page } = useSelector(state => state); // <--- traigo cosas de mi estado "global" (redux)
	
	const [page, setPage] = useState(1);

	useEffect(() => { 
		dispatch(getCharacters({}))
	}, [dispatch])
	// useEffect recibe una función como parámetro, la cual se ejecuta por defecto cuando el componente se monta,
	// y después se vuelve a ejecutar cada vez que el componente se actualice.

	const changePage = (page) => { // Esta función hace 2 cosas:

		dispatch(getCharacters({ page, name, order }))
		// 1.
		// Despacha una función.
		// A esa función se le pasa por parámetro un objeto con la info de page.
		// ¿Qué hace esa función? Andá a leerla al index de actions.

		dispatch(settingPage(page))
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
				onClick={ () => {changePage(page-1)}} // ARRANCA UN FLUJO:
				// Cuando se clickea este botón se ejecuta la función: changePage(page-1)
				// Por parámetro le pasamos (la página actual - 1), o sea la página anterior.
			>
				previous
			</button>

			<label>{page}</label>

			<button 
				disabled={characters?.count <= (page * 5)} 
				onClick={()=>{changePage(page +1)}} // ARRANCA UN FLUJO:
				// Cuando se clickea este botón se ejecuta la función: changePage(page+1)
				// Por parámetro le pasamos (la página actual + 1), o sea la página siguiente.
			>
				next
			</button>

		</div>
		)
}

export default Home;