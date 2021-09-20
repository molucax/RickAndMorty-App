const { Router } = require('express');
const charactersR = require("./charactersR.js")
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/characters", charactersR)

module.exports = router;
