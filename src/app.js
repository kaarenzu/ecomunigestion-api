const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
    res.status(200).json({
        status: "ok",
        service: "EcoMuniGestion API",
        environment: process.env.NODE_ENV
    });
});

const reporteRoutes = require('./routes/reporte.routes');
app.use('/api/reportes', reporteRoutes);

const dashboardRoutes = require('./routes/dashboard.routes');
app.use('/api/dashboard', dashboardRoutes);

const usuarioRoutes = require("./routes/usuario.routes");

app.use("/api/usuarios", usuarioRoutes);



module.exports = app;
