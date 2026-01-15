const dashboardModel = require('../models/dashboard.model');

exports.obtenerKpis = async () => {
    const urgentes = await dashboardModel.obtenerUrgentes();
    const zonaCritica = await dashboardModel.obtenerZonaCritica();
    const tiempoPromedio = await dashboardModel.obtenerTiempoPromedioResolucion();

    return {
        urgentes,
        zona_critica: zonaCritica,
        tiempo_promedio_horas: tiempoPromedio
    };
};

exports.obtenerReportesPorSector = async () => {
    return await dashboardModel.reportesPorSectorUltimos7Dias();
};

exports.obtenerZonasCriticas = async () => {
    return await dashboardModel.obtenerZonasCriticas();
};
