const pool = require('../config/database');

exports.obtenerUrgentes = async () => {
    const [rows] = await pool.query(
        `SELECT COUNT(*) AS total
     FROM reporte
     WHERE prioridad = 'ALTA'`
    );
    return rows[0].total;
};

exports.obtenerZonaCritica = async () => {
    const [rows] = await pool.query(
        `
    SELECT s.nombre_sector AS sector, COUNT(r.id_reporte) AS total
    FROM sector s
    JOIN reporte r ON r.id_sector = s.id_sector
    GROUP BY s.id_sector
    ORDER BY total DESC
    LIMIT 1
    `
    );
    return rows[0]?.sector || null;
};

exports.obtenerTiempoPromedioResolucion = async () => {
    const [rows] = await pool.query(
        `
    SELECT
      AVG(TIMESTAMPDIFF(HOUR, r.fecha_creacion, h.fecha_estado)) AS promedio
    FROM reporte r
    JOIN historial_estado h ON r.id_reporte = h.id_reporte
    JOIN estado e ON h.id_estado = e.id_estado
    WHERE e.nombre_estado = 'Resuelto'
    `
    );
    return rows[0].promedio ? Math.round(rows[0].promedio) : 0;
};

exports.reportesPorSectorUltimos7Dias = async () => {
    const [rows] = await pool.query(
        `
    SELECT
      s.nombre_sector AS sector,
      COUNT(r.id_reporte) AS total
    FROM sector s
    LEFT JOIN reporte r
      ON r.id_sector = s.id_sector
      AND r.fecha_creacion >= NOW() - INTERVAL 7 DAY
    GROUP BY s.id_sector
    `
    );
    return rows;
};

exports.obtenerZonasCriticas = async () => {
    const [rows] = await pool.query(
        `
    SELECT
      s.nombre_sector AS sector,
      COUNT(r.id_reporte) AS total
    FROM sector s
    JOIN reporte r ON r.id_sector = s.id_sector
    GROUP BY s.id_sector
    ORDER BY total DESC
    `
    );

    return rows;
};
