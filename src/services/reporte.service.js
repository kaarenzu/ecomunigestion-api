const reporteModel = require('../models/reporte.model');

exports.crearReporte = async (data) => {
    // Validación mínima
    if (
        !data.titulo ||
        !data.email ||
        !data.descripcion ||
        !data.id_sector ||
        !data.id_tipo_problema
    ) {
        throw new Error('Datos incompletos para registrar el reporte');
    }

    // Verificar si el usuario existe, si no, crearlo
    let usuario = await reporteModel.obtenerUsuarioPorEmail(data.email);

    if (!usuario) {
        const idUsuario = await reporteModel.crearUsuario({
            email: data.email,
            nombre: data.nombre || data.email.split("@")[0],
            id_rol: 1 // CIUDADANO
        });

        usuario = {
            id_usuario: idUsuario
        };
    }


    // Crear reporte
    const idReporte = await reporteModel.crearReporte({
        titulo: data.titulo || 'Reporte sin título',
        descripcion: data.descripcion,
        id_usuario: usuario.id_usuario,
        id_sector: data.id_sector,
        id_tipo_problema: data.id_tipo_problema
    });

    return {
        message: 'Reporte registrado correctamente',
        id_reporte: idReporte
    };
};

exports.listarPorUsuario = async (email) => {
    if (!email) {
        throw new Error('Email requerido');
    }

    const usuario = await reporteModel.obtenerUsuarioPorEmail(email);
    if (!usuario) {
        throw new Error('Usuario no encontrado');
    }

    return await reporteModel.listarReportesPorUsuario(usuario.id_usuario);
};

exports.obtenerDetalleReporte = async (idReporte) => {
    if (!idReporte) {
        throw new Error('ID de reporte requerido');
    }

    const reporte = await reporteModel.obtenerReportePorId(idReporte);
    if (!reporte) {
        throw new Error('Reporte no encontrado');
    }

    const observaciones = await reporteModel.obtenerObservacionesPorReporte(idReporte);

    return {
        ...reporte,
        observaciones
    };
};

/**Función para listar todos los reportes */
exports.listarTodos = async () => {
    return await reporteModel.listarTodos();
};

/**Función para cambiar el estado de un reporte */
exports.cambiarEstado = async (idReporte, idEstado, idFuncionario) => {
    if (!idReporte || !idEstado || !idFuncionario) {
        throw new Error('Datos incompletos para cambiar estado');
    }

    const reporte = await reporteModel.obtenerReporteSimplePorId(idReporte);
    if (!reporte) {
        throw new Error('Reporte no encontrado');
    }

    const estadoActual = await reporteModel.obtenerEstadoActualReporte(idReporte);

    if (estadoActual.id_estado === idEstado) {
        return {
            message: 'El reporte ya se encuentra en el estado seleccionado'
        };
    }

    await reporteModel.actualizarEstadoReporte(idReporte, idEstado);

    await reporteModel.insertarHistorialEstado({
        id_reporte: idReporte,
        id_estado: idEstado,
        id_usuario_funcionario: idFuncionario
    });

    return {
        message: 'Estado del reporte actualizado correctamente'
    };
};

exports.agregarObservacion = async (idReporte, texto, idFuncionario) => {
    if (!idReporte || !texto || !idFuncionario) {
        throw new Error('Datos incompletos para agregar observación');
    }

    const reporte = await reporteModel.obtenerReporteSimplePorId(idReporte);
    if (!reporte) {
        throw new Error('Reporte no encontrado');
    }

    await reporteModel.insertarObservacion({
        id_reporte: idReporte,
        observacion: texto,
        id_usuario_funcionario: idFuncionario
    });

    return {
        message: 'Observación agregada correctamente'
    };
};
