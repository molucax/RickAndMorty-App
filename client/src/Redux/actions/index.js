import axios from "axios";
export const GET_ALL_CHARACTERS = "GET_ALL_CHARACTERS";
export const RESET_ALL_CHARACTERS = "RESET_ALL_CHARACTERS";


// *se despacha desde el componente ---> getCharacters()*
// Lo que hace esta función es:
export const getCharacters = () => {
	// RETORNA una función, la cual hace cosas asíncronas...
	return (dispatch) => { // Ok, pero qué hace exactamente esa función?
		// Primero, va a esta ruta de mi back:
		axios.get("http://localhost:3001/characters") 
		// y toma lo que retorne su función (para saberlo andá a leer la ruta).
		.then(characters => { // Lo toma, lo nombra "characters" y finalmente,
			// RETORNA el despachamiento de una acción.
			// (despachamiento de una acción === decirle al reducer "te doy esta action{}, modificá mi estado")
			return dispatch({ 
				type: GET_ALL_CHARACTERS, 
				payload: characters.data // Pará, y el payload entonces sería...?
				// El payload, en este caso, es el objeto que retorna el axios.get() a mi ruta.
				// Accedemos a .data, porque characters{} viene "directo" del axios.
				// Saber qué información tiene el payload es tan fácil como ir a la ruta a leerla.
			})
		})
		.catch((err) => { // Esto ya sabemos lo que hace.
			console.log(err);
		})
		// Entonces, al final... getCharacters() qué hace?
		// 1. Va a buscar información a mi ruta "http://localhost:3001/characters".
		// 2. De esa información toma lo que necesite despacharle al reducer para que modifique el estado.
		// 3. ¿Dónde está eso que se le pasa? En el payload.
	}
	// HIPER MEGA ULTRA RESUMIDO:
	// ¿Qué hace getCharacters()?
	// Le pasa al reducer una action.
	// Punto.
	// Vamos al reducer.
} 
