const express = require('express');
const router = express.Router();
const reporteController = require('../controllers/reporte.controller');

router.post('/crear', reporteController.crearReporte);
router.get('/usuario/:email', reporteController.listarReportesPorUsuario);
router.get('/', reporteController.listarTodos);

router.get('/:id_reporte', reporteController.obtenerDetalleReporte);
router.put('/:id_reporte/estado', reporteController.cambiarEstado);
router.post('/:id_reporte/observaciones', reporteController.agregarObservacion);


module.exports = router;