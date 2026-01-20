const usuarioService = require("../services/usuario.service");

exports.registrarUsuario = async (req, res) => {
    try {
        const { email, rol } = req.body;

        const usuario = await usuarioService.registrarSiNoExiste(
            email,
            rol
        );

        res.status(201).json(usuario);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

exports.obtenerRolPorEmail = async (req, res) => {
    try {
        const { email } = req.params;

        const usuario = await usuarioService.obtenerPorEmail(email);

        res.status(200).json({
            rol: usuario.rol
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

