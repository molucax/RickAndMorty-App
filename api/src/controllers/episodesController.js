const { Episode } = require("../db.js");
const axios = require("axios");

const preloadEpisodes = async (req, res) => {
	try {
		let episodes = (await axios.get("https://rickandmortyapi.com/api/episode")).data.results
		episodes = episodes.map(e => {
			return {
				name: e.name,
				episode: e.episode
			}
		})
		episodes = await Promise.all(episodes.map(e => Episode.findOrCreate({where: e})))
		// episodes.forEach(ep => console.log(ep[0].dataValues))
		return "Episodes loaded successfully!"
	}
	catch (err) {
		return "Error loading episodes :("
	}
}

const getEpisodes = async (req, res, next) => {
	try {
		let episodes = await Episodes.findAll()
		res.json(episodes)
	}
	catch(err) {
		next(err)
	}
}

module.exports = {
	preloadEpisodes,
	getEpisodes
}