const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboard.controller');

router.get('/kpis', dashboardController.obtenerKpis);
router.get('/reportes-por-sector', dashboardController.obtenerReportesPorSector);
router.get('/zonas-criticas', dashboardController.obtenerZonasCriticas);


module.exports = router;
