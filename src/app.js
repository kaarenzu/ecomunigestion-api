const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const reporteRoutes = require('./routes/reporte.routes');
app.use('/api/reportes', reporteRoutes);

const dashboardRoutes = require('./routes/dashboard.routes');
app.use('/api/dashboard', dashboardRoutes);


module.exports = app;
