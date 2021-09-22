import { GET_ALL_CHARACTERS } from "../actions";

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
		default:
			return state;
	}
}

// Y...
// ¿Pero entonces qué pasó?

// 1. El usuario hizo algo que generó el despache de una acción.
// ¿Qué era el despache de una acción?
// Decirle al reducer: "Tomá este objeto y modificá el estado".

// 2. El reducer modifica el estado.
// ¿Y qué pasa al modificarse el estado?
// El DOM "real" detecta que hubo un cambio en el DOM "virtual".
// Imita ese cambio en el DOM "real".

// Terminó el flujo.