const usuarioModel = require("../models/usuario.model");

exports.registrarSiNoExiste = async (email, rol) => {
    if (!email || !rol) {
        throw new Error("Email y rol son obligatorios");
    }

    let usuario = await usuarioModel.obtenerUsuarioPorEmail(email);
    if (usuario) return usuario;

    const idRol = rol === "FUNCIONARIO" ? 2 : 1;

    const idUsuario = await usuarioModel.crearUsuario({
        email,
        nombre: email.split("@")[0],
        id_rol: idRol
    });

    return {
        id_usuario: idUsuario,
        email,
        rol
    };
};

exports.obtenerPorEmail = async (email) => {
    const usuario = await usuarioModel.obtenerUsuarioPorEmail(email);

    if (!usuario) {
        throw new Error("Usuario no encontrado");
    }

    return {
        email: usuario.email,
        rol: usuario.id_rol === 2 ? "FUNCIONARIO" : "CIUDADANO"
    };
};
