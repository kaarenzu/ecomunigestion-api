const dashboardService = require('../services/dashboard.service');

exports.obtenerKpis = async (req, res) => {
    try {
        const kpis = await dashboardService.obtenerKpis();
        res.status(200).json(kpis);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.obtenerReportesPorSector = async (req, res) => {
    try {
        const data = await dashboardService.obtenerReportesPorSector();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.obtenerZonasCriticas = async (req, res) => {
    try {
        const zonas = await dashboardService.obtenerZonasCriticas();
        res.status(200).json(zonas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
