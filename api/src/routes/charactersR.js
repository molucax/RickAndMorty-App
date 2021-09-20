const { Router } = require("express");
const { addCharacter } = require("../controllers/charactersController.js");

const router = Router();

router.post("/add", addCharacter)

module.exports = router;