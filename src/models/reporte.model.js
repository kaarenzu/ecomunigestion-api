const pool = require('../config/database');

/**
 * Obtener usuario por email
 */
exports.obtenerUsuarioPorEmail = async (email) => {
    const [rows] = await pool.query(
        'SELECT id_usuario FROM usuario WHERE email = ?',
        [email]
    );
    return rows[0];
};

exports.crearUsuario = async (data) => {
    const [result] = await pool.query(
        `INSERT INTO usuario (email, nombre, id_rol) VALUES (?, ?, ?)`,
        [data.email, data.nombre, data.id_rol]
    );
    return result.insertId;
}
/**
 * Crear reporte
 */
exports.crearReporte = async (reporte) => {
    const [result] = await pool.query(
        `
        INSERT INTO reporte
        (
          titulo,
          descripcion,
          fecha_creacion,
          prioridad,
          imagen_url,
          id_usuario,
          id_sector,
          id_tipo_problema,
          id_estado
        )
        VALUES (?, ?, NOW(), ?, NULL, ?, ?, ?, ?)
        `,
        [
            reporte.titulo,
            reporte.descripcion,
            reporte.prioridad,      // 👈 AHORA VIENE DESDE EL SERVICE
            reporte.id_usuario,
            reporte.id_sector,
            reporte.id_tipo_problema,
            1                        // PENDIENTE
        ]
    );

    return result.insertId;
};


/**Función para listar reportes por usuario */
exports.listarReportesPorUsuario = async (idUsuario) => {
    const [rows] = await pool.query(
        `
    SELECT
      r.id_reporte,
      r.titulo,
      r.descripcion,
      r.fecha_creacion,
      r.prioridad,
      e.nombre_estado AS estado,
      s.nombre_sector AS sector,
      tp.nombre_tipo AS tipo_problema
    FROM reporte r
    INNER JOIN estado e ON r.id_estado = e.id_estado
    INNER JOIN sector s ON r.id_sector = s.id_sector
    INNER JOIN tipo_problema tp ON r.id_tipo_problema = tp.id_tipo_problema
    WHERE r.id_usuario = ?
    ORDER BY r.fecha_creacion DESC
    `,
        [idUsuario]
    );

    return rows;
};

/**Función para obtener detalle de un reporte por su ID */
exports.obtenerReportePorId = async (idReporte) => {
    const [rows] = await pool.query(
        `
    SELECT
      r.id_reporte,
      r.titulo,
      r.descripcion,
      r.fecha_creacion,
      r.prioridad,
      e.nombre_estado AS estado,
      s.nombre_sector AS sector,
      tp.nombre_tipo AS tipo_problema
    FROM reporte r
    INNER JOIN estado e ON r.id_estado = e.id_estado
    INNER JOIN sector s ON r.id_sector = s.id_sector
    INNER JOIN tipo_problema tp ON r.id_tipo_problema = tp.id_tipo_problema
    WHERE r.id_reporte = ?
    `,
        [idReporte]
    );

    return rows[0];
};

/**Función para obtener observaciones asociadas a un reporte */
exports.obtenerObservacionesPorReporte = async (idReporte) => {
    const [rows] = await pool.query(
        `
    SELECT
      o.id_observacion,
      o.observacion,
      o.fecha_observacion,
      u.nombre AS funcionario
    FROM observacion o
    INNER JOIN usuario u ON o.id_usuario_funcionario = u.id_usuario
    WHERE o.id_reporte = ?
    ORDER BY o.fecha_observacion ASC
    `,
        [idReporte]
    );

    return rows;
};

/**Función para listar todos los reportes */
exports.listarTodos = async () => {
    const [rows] = await pool.query(
        `
    SELECT
      r.id_reporte,
      r.titulo,
      r.descripcion,
      r.fecha_creacion,
      r.prioridad,
      e.nombre_estado AS estado,
      s.nombre_sector AS sector,
      tp.nombre_tipo AS tipo_problema,
      u.nombre AS ciudadano,
      u.email AS email_ciudadano
    FROM reporte r
    INNER JOIN estado e ON r.id_estado = e.id_estado
    INNER JOIN sector s ON r.id_sector = s.id_sector
    INNER JOIN tipo_problema tp ON r.id_tipo_problema = tp.id_tipo_problema
    INNER JOIN usuario u ON r.id_usuario = u.id_usuario
    ORDER BY r.fecha_creacion DESC
    `
    );

    return rows;
};

/**Función para cambiar el estado de un reporte */

exports.obtenerReporteSimplePorId = async (idReporte) => {
    const [rows] = await pool.query(
        'SELECT id_reporte FROM reporte WHERE id_reporte = ?',
        [idReporte]
    );
    return rows[0];
};
exports.actualizarEstadoYPrioridad = async (idReporte, idEstado, prioridad) => {
    await pool.query(
        'UPDATE reporte SET id_estado = ?, prioridad = ? WHERE id_reporte = ?',
        [idEstado, prioridad, idReporte]
    );
};
exports.insertarHistorialEstado = async (historial) => {
    await pool.query(
        `
    INSERT INTO historial_estado
    (id_reporte, id_estado, id_usuario_funcionario, fecha_estado)
    VALUES (?, ?, ?, NOW())
    `,
        [
            historial.id_reporte,
            historial.id_estado,
            historial.id_usuario_funcionario
        ]
    );
};
exports.obtenerEstadoActualReporte = async (idReporte) => {
    const [rows] = await pool.query(
        'SELECT id_estado FROM reporte WHERE id_reporte = ?',
        [idReporte]
    );
    return rows[0];
};

exports.insertarObservacion = async (data) => {
    await pool.query(
        `
    INSERT INTO observacion
    (observacion, fecha_observacion, id_reporte, id_usuario_funcionario)
    VALUES (?, NOW(), ?, ?)
    `,
        [
            data.observacion,
            data.id_reporte,
            data.id_usuario_funcionario
        ]
    );
};


