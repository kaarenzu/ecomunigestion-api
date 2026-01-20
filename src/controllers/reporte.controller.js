const reporteService = require('../services/reporte.service');


exports.crearReporte = async (req, res) => {

    try {
        const resultado = await reporteService.crearReporte(req.body);
        res.status(201).json(resultado);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

exports.listarReportesPorUsuario = async (req, res) => {
    try {
        const { email } = req.params;
        const reportes = await reporteService.listarPorUsuario(email);
        res.status(200).json(reportes);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.obtenerDetalleReporte = async (req, res) => {
    try {
        const { id_reporte } = req.params;
        const reporte = await reporteService.obtenerDetalleReporte(id_reporte);
        res.status(200).json(reporte);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

exports.listarTodos = async (req, res) => {
    try {
        const reportes = await reporteService.listarTodos();
        res.status(200).json(reportes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.cambiarEstado = async (req, res) => {
    try {
        const { id_reporte } = req.params;
        const { id_estado, email_funcionario } = req.body;

        const resultado = await reporteService.cambiarEstado(
            id_reporte,
            id_estado,
            email_funcionario
        );

        res.status(200).json(resultado);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.agregarObservacion = async (req, res) => {
    try {
        const { id_reporte } = req.params;
        const { observacion, email_funcionario } = req.body;

        const resultado = await reporteService.agregarObservacion(
            id_reporte,
            observacion,
            email_funcionario
        );

        res.status(201).json(resultado);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};



