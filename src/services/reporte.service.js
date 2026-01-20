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
        id_tipo_problema: data.id_tipo_problema,
        prioridad: 'ALTA' // estado inicial = PENDIENTE
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
exports.cambiarEstado = async (idReporte, idEstado, emailFuncionario) => {
    if (!idReporte || !idEstado || !emailFuncionario) {
        throw new Error('Datos incompletos para cambiar estado');
    }

    // Se obtiene el reporte que será modificado
    const reporte = await reporteModel.obtenerReporteSimplePorId(idReporte);
    if (!reporte) {
        throw new Error('Reporte no encontrado');
    }

    // 🔑 1. Resolver funcionario por email
    const funcionario = await reporteModel.obtenerUsuarioPorEmail(emailFuncionario);
    if (!funcionario) {
        throw new Error('Funcionario no encontrado');
    }

    const idFuncionario = funcionario.id_usuario;

    const estadoActual = await reporteModel.obtenerEstadoActualReporte(idReporte);

    if (estadoActual.id_estado === idEstado) {
        return {
            message: 'El reporte ya se encuentra en el estado seleccionado'
        };
    }

    let prioridad;

    if (idEstado === 1) prioridad = 'ALTA';
    else if (idEstado === 2) prioridad = 'MEDIA';
    else prioridad = 'BAJA';

    await reporteModel.actualizarEstadoYPrioridad(
        idReporte,
        idEstado,
        prioridad
    );

    await reporteModel.insertarHistorialEstado({
        id_reporte: idReporte,
        id_estado: idEstado,
        id_usuario_funcionario: idFuncionario
    });

    return {
        message: 'Estado del reporte actualizado correctamente'
    };
};

exports.agregarObservacion = async (idReporte, texto, emailFuncionario) => {
    if (!idReporte || !texto || !emailFuncionario) {
        throw new Error('Datos incompletos para agregar observación');
    }

    const reporte = await reporteModel.obtenerReporteSimplePorId(idReporte);
    if (!reporte) {
        throw new Error('Reporte no encontrado');
    }

    const funcionario = await reporteModel.obtenerUsuarioPorEmail(emailFuncionario);
    if (!funcionario) {
        throw new Error('Funcionario no encontrado');
    }
    const idFuncionario = funcionario.id_usuario;

    await reporteModel.insertarObservacion({
        id_reporte: idReporte,
        observacion: texto,
        id_usuario_funcionario: idFuncionario
    });

    return {
        message: 'Observación agregada correctamente'
    };
};

exports.registrarSiNoExiste = async (email, rol) => {
    let usuario = await usuarioModel.obtenerUsuarioPorEmail(email);

    if (usuario) return usuario;

    const idRol = rol === "FUNCIONARIO" ? 2 : 1;

    const idUsuario = await usuarioModel.crearUsuario({
        email,
        nombre: email.split("@")[0],
        id_rol: idRol
    });

    return { id_usuario: idUsuario, email, rol };
};
