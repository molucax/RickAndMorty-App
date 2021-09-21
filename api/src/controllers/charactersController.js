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
		let apiCharacters = (await axios.get("https://rickandmortyapi.com/api/character")).data.results
		let dbCharacters = await Character.findAll({include: Episode})
		let characters = dbCharacters.concat(apiCharacters)
		return res.send(characters);
	}
	catch(err) {
		next(err)
	}
}

module.exports = {
	addCharacter
}

	 // let character= {
	 //    name,
	 //    status,
	 //    gender,
	 //    image,
	 //    location
	 // }

	 // Characters.create(character)
	 //  .then(character => {
	 //      character.addEpisodes(episode)
	 //      res.json({...character, episode})
	 //  })
	 //  .catch((error)=> next(error))
	 // }