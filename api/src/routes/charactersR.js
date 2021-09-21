const { Router } = require("express");
const { addCharacter, getCharacters, getCharacterById } = require("../controllers/charactersController.js");

const router = Router();

router.post("/add", addCharacter);
router.get("/", getCharacters);
router.get("/:id", getCharacterById);

module.exports = router;