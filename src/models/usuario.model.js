const db = require("../config/database");

exports.obtenerUsuarioPorEmail = async (email) => {
    const [rows] = await db.query(
        "SELECT * FROM usuario WHERE email = ?",
        [email]
    );
    return rows[0];
};

exports.crearUsuario = async ({ email, nombre, id_rol }) => {
    const [result] = await db.query(
        `INSERT INTO usuario (email, nombre, id_rol)
         VALUES (?, ?, ?)`,
        [email, nombre, id_rol]
    );

    return result.insertId;
};
