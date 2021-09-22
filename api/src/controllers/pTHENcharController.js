const { Character, Episode, Op } = require("../db.js");
const axios = require("axios");

const addCharacter = (req, res) => {
	const { name, status, gender, image, location, episode } = req.body;
	let character = Character.create({
		name,
		status,
		gender,
		image,
		location
	})
	.then(character => {
		character.addEpisode(episode)
		res.json({...character, episode})
	})
	.catch(err => next(err))
} 