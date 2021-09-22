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
		}
		else {
			apiCharacters = (await axios.get("https://rickandmortyapi.com/api/character")).data.results
			dbCharacters = await Character.findAll({include: Episode})
			characters = dbCharacters.concat(apiCharacters)
		}

		if (order === "asc" || !order) {
			characters = characters.sort((a, b) => {
				return a.name.toLowerCase().localeCompare(b.name.toLowerCase())
			})
		}
		else {
			characters = characters.sort((a, b) => {
				return b.name.toLowerCase().localeCompare(a.name.toLowerCase())
			})
		}

		let result = characters.slice((charPerPage * (page-1)), (charPerPage * (page-1)) + charPerPage)
		
		return res.send({
			result,
			count: characters.length
		});
	}
	catch(err) {
		next(err)
	}
}

const getCharacterById = async (req, res, next) => {
	try {
		const { id } = req.params;
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