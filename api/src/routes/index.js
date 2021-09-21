const { Router } = require('express');

const charactersR = require("./charactersR.js");
const episodesR = require("./episodesR.js");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/characters", charactersR);
router.use("/episodes", episodesR);

module.exports = router;
