const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuario.controller");

router.post("/registro", usuarioController.registrarUsuario);
router.get("/rol/:email", usuarioController.obtenerRolPorEmail);


module.exports = router;

