const { Character, Episode, Op } = require("../db.js");
const axios = require("axios");

const addCharacter = async (req, res) => {
	const { name, status, gender, image, location } = req.body;
	try {
		const newCharacter = await Character.create({
			name,
			status,
			gender,
			image,
			location
		});
		// console.log(newCharacter.toJSON())
		res.json("Character created!");
	}
	catch (err) {
		res.send(err);
	}
};

module.exports = {
	addCharacter
}