const { Router } = require("express");
const { getEpisodes } = require("../controllers/episodesController.js");

const router = Router();

router.get("/", getEpisodes);

module.exports = router;