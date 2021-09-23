const { Character, Episode, Op } = require("../db.js");
const axios = require("axios");

const addCharacter = async (req, res) => {
	const { name, status, gender, image, location, episode } = req.body;
	try {
		const newCharacter = await Character.create({
			name,
			status,
			gender,
			image,
			location
		});
		newCharacter.addEpisode(episode)
		console.log(newCharacter.toJSON())
		res.json("Character created!");
	}
	catch (err) {
		res.send(err);
	}
};

const getCharacters = async (req, res, next) => {
	try {
		let { name, order, page } = req.query;
		let apiCharacters;
		let dbCharacters;
		let characters = [];
		page = page ? page : 1
		const charPerPage = 5;

		// Si llega un name por query, se va a ejecutar esta condición:
		if (name && name !== "") {
			apicharacters = (await axios.get(`https://rickandmortyapi.com/api/character/?name=${name}`)).data.results
			dbCharacters = await Character.findAll({
				where: {
					name: {
						[Op.iLike]: `%${name}%`
					}
				}
			})
			characters = dbCharacters.concat(apiCharacters);
			// characters = [todos los personajes que coincidan con ese name]
		}
		// Caso contrario, se ejecuta esto:
		else {
			apiCharacters = (await axios.get("https://rickandmortyapi.com/api/character")).data.results
			dbCharacters = await Character.findAll({include: Episode})
			characters = dbCharacters.concat(apiCharacters)
			// characters = [todos los personajes]
		}
		// Entonces, esta primera parte de la ruta sólo se ocupa de modificar 
		// lo que contiene el array "characters" en una primera instancia.

		// Ahora que ya hay algo en ese array podemos empezar a filtrar y ordenar el contenido:
		if (order === "asc" || !order || order === "") {
			characters = characters.sort((a, b) => {
				return a.name.toLowerCase().localeCompare(b.name.toLowerCase())
			}) // Se ordena el array: A - Z
		}
		else {
			characters = characters.sort((a, b) => {
				return b.name.toLowerCase().localeCompare(a.name.toLowerCase())
			}) // Se ordena el array: Z - A
		}

		// Guardamos en la variable "result" una porción de ese array.
		// ¿Cuál porción? La que indique la lógica del paginado:
		let result = characters.slice((charPerPage * (page-1)), (charPerPage * (page-1)) + charPerPage)																
		//                    page = 1        5    x    0     ,         5    x    0      +     5    -----> (0, 5)
		//                    page = 2        5    x    1     ,         5    x    1      +     5    -----> (5, 10)
		//                    page = 3        5    x    2     ,         5    x    2      +     5    -----> (10, 15)

		// Ahora sí, ¿qué responde esta ruta?
		return res.send({ // Un objeto con...
			result,       //             result: [los personajes que se deben mostrar en un determinado momento]
			count: characters.length //  count: la cantidad de elementos que contenga el array "characters" en ese momento
		});
	}
	catch(err) {
		next(err)
	}
}

const getCharacterById = async (req, res, next) => {
	try {
		let { id } = req.params;
		let character;
		if (isNaN(id)) {
			character = await Character.findByPk(id)
		}
		else {
			character = (await axios.get(`https://rickandmortyapi.com/api/character/${id}`)).data

		}
		return res.json(character)
	}
	catch (err) {
		next(err)
	}
}

module.exports = {
	addCharacter,
	getCharacters,
	getCharacterById
}