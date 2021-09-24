import { GET_ALL_CHARACTERS, SET_NAME, SET_ORDER, SET_PAGE } from "../actions";

// Hola, soy el reducer.

// Esta es la estructura incial de tu estado:
const initialState = {
	characters: [],
	episodes: [],
	char: {}
}

// Soy una función que conozco tu estado, y que siempre estoy recibiendo acciones.
// Con lo que contenga cada acción voy a modificar tu estado.
// ¿Cómo?
export default function reducer (state = initialState, { type, payload }) {
	// La propiedad "type" de tu action me va a decir cuál case ejecutar:
	switch (type) {
		case GET_ALL_CHARACTERS:
			return {
				...state, // Acá no hago más que copiar todo lo que haya en tu estado, 
				characters: payload // y lo más importante: pisar el contenido de "characters" con el payload. FIN.
			}
		case SET_NAME:
			return {
				...state,
				name: payload
			}
		case SET_PAGE:
			return {
				...state,
				page: payload
			}
		case SET_ORDER:
			return {
				...state,
				order: payload
			}

		default:
			return state;
	}
}

// Y...
// ¿Pero entonces qué pasó?

// 1. El usuario hizo algo que generó el despachamiento de una acción.
// ¿Qué era el despachamiento de una acción?
// Decirle al reducer: "Agarrá este objeto y modificá el estado".

// 2. El reducer modifica el estado.
// ¿Y qué pasa al modificarse el estado?
// El DOM "real" detecta que hubo un cambio en el DOM "virtual".
// Se imita ese cambio en el DOM "real" (impacta en nuestra aplicación).

// Terminó el flujo.