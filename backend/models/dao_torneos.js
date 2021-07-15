const db = require('../sequelize/models');

const getTorneos = async () =>{
    //TODO: BD
    const tns = await db.Torneo.findAll();
    const torneos = [];
    for (let tn of tns){
        torneos.push({
            id : tn.id,
            nombre : tn.nombre,
            fecha_inicio : tn.fecha_inicio,
            fecha_fin : tn.fecha_fin,
            nro_participantes : tn.nro_participantes,
            descripcion : tn.descripcion,
            max_participantes: tn.max_participantes,
            nro_partidas_dia : tn.nro_partidas_dia,
            part_ganada : tn.part_ganada,
            part_empatada : tn.part_empatada,
            part_perdida : tn.part_perdida,
            nro_equipos_reg : tn.nro_equipos_reg,
            max_equipos : tn.max_equipos,
            
            tipo : await tn.getTipo(),
            estado : await tn.getEstado(),
            inscrito : await tn.getInscrito()
        })
    };
    console.log(torneos);
    return torneos;
};

const getTorneo = async (tnId) => {
    const tn = await db.Torneo.findOne({
        where: {
            id: tnId
        }
    });
    return tn;
};

const getTorneosFiltrados = async () =>{
    //TODO: BD
    const tns = await db.Torneo.findAll({
        where: {
            idEstado : 2
        }
    });
    const torneos = [];
    for (let tn of tns){
        torneos.push({
            id : tn.id,
            nombre : tn.nombre,
            fecha_inicio : tn.fecha_inicio,
            fecha_fin : tn.fecha_fin,
            nro_participantes : tn.nro_participantes,
            descripcion : tn.descripcion,
            max_participantes: tn.max_participantes,
            nro_partidas_dia : tn.nro_partidas_dia,
            part_ganada : tn.part_ganada,
            part_empatada : tn.part_empatada,
            part_perdida : tn.part_perdida,
            nro_equipos_reg : tn.nro_equipos_reg,
            max_equipos : tn.max_equipos,
            
            tipo : await tn.getTipo(),
            estado : await tn.getEstado(),
            inscrito : await tn.getInscrito()
        })
    };
    console.log(torneos);
    return torneos;
};

const getTorneosFiltradosNombre = async (nomb) =>{
    //TODO: BD
    const tns = await db.Torneo.findAll({
        where: {
            nombre : nomb
        }
    });
    const torneos = [];
    for (let tn of tns){
        torneos.push({
            id : tn.id,
            nombre : tn.nombre,
            fecha_inicio : tn.fecha_inicio,
            fecha_fin : tn.fecha_fin,
            nro_participantes : tn.nro_participantes,
            descripcion : tn.descripcion,
            max_participantes: tn.max_participantes,
            nro_partidas_dia : tn.nro_partidas_dia,
            part_ganada : tn.part_ganada,
            part_empatada : tn.part_empatada,
            part_perdida : tn.part_perdida,
            nro_equipos_reg : tn.nro_equipos_reg,
            max_equipos : tn.max_equipos,
            
            tipo : await tn.getTipo(),
            estado : await tn.getEstado(),
            inscrito : await tn.getInscrito()
        })
    };
    console.log(torneos);
    return torneos;
};

const getTorneosFiltradosEstado = async (est) =>{
    //TODO: BD
    const tns = await db.Torneo.findAll({
        where: {
            idEstado : est
        }
    });
    const torneos = [];
    for (let tn of tns){
        torneos.push({
            id : tn.id,
            nombre : tn.nombre,
            fecha_inicio : tn.fecha_inicio,
            fecha_fin : tn.fecha_fin,
            nro_participantes : tn.nro_participantes,
            descripcion : tn.descripcion,
            max_participantes: tn.max_participantes,
            nro_partidas_dia : tn.nro_partidas_dia,
            part_ganada : tn.part_ganada,
            part_empatada : tn.part_empatada,
            part_perdida : tn.part_perdida,
            nro_equipos_reg : tn.nro_equipos_reg,
            max_equipos : tn.max_equipos,
            
            tipo : await tn.getTipo(),
            estado : await tn.getEstado(),
            inscrito : await tn.getInscrito()
        })
    };
    console.log(torneos);
    return torneos;
};

const getTorneosFiltradosInscrito = async (ins) =>{
    //TODO: BD
    const tns = await db.Torneo.findAll({
        where: {
            idInscrito : ins
        }
    });
    const torneos = [];
    for (let tn of tns){
        torneos.push({
            id : tn.id,
            nombre : tn.nombre,
            fecha_inicio : tn.fecha_inicio,
            fecha_fin : tn.fecha_fin,
            nro_participantes : tn.nro_participantes,
            descripcion : tn.descripcion,
            max_participantes: tn.max_participantes,
            nro_partidas_dia : tn.nro_partidas_dia,
            part_ganada : tn.part_ganada,
            part_empatada : tn.part_empatada,
            part_perdida : tn.part_perdida,
            nro_equipos_reg : tn.nro_equipos_reg,
            max_equipos : tn.max_equipos,
            
            tipo : await tn.getTipo(),
            estado : await tn.getEstado(),
            inscrito : await tn.getInscrito()
        })
    };
    console.log(torneos);
    return torneos;
};

const createTorneo = async (tn) => {
    return await db.Torneo.create(tn);
};

const updateTorneo = async (tn) =>{
    const tnAEditar = await getTorneo(tn.id);
    tnAEditar.nombre = tn.name;
    tnAEditar.fecha_inicio = tn.fecha_inicio;
    tnAEditar.fecha_fin = tn.fecha_fin;
    tnAEditar.nro_participantes = tn.nro_participantes;
    tnAEditar.descripcion = tn.descripcion;
    tnAEditar.max_participantes= tn.max_participantes;
    tnAEditar.nro_partidas_dia = tn.nro_partidas_dia;
    tnAEditar.part_ganada = tn.part_ganada;
    tnAEditar.part_empatada = tn.part_empatada;
    tnAEditar.part_perdida = tn.part_perdida;
    tnAEditar.nro_equipos_reg = tn.nro_equipos_reg;
    tnAEditar.max_equipos = tn.max_equipos;
    tnAEditar.idTipo = tn.idTipo;
    tnAEditar.idEstado = tn.idEstado;
    tnAEditar.idInscrito = tn.idInscrito;
    await tnAEditar.save();
    return true;
};

const deleteTorneo = async (idTn) =>{
    await db.Torneo.destroy({
        where: {
            id: idTn
        }
    });
    return true;
};

module.exports = {
    getTorneos : getTorneos,
    createTorneo : createTorneo,
    deleteTorneo : deleteTorneo,
    getTorneo : getTorneo,
    updateTorneo : updateTorneo,
    getTorneosFiltrados : getTorneosFiltrados,
    getTorneosFiltradosNombre : getTorneosFiltradosNombre,
    getTorneosFiltradosInscrito : getTorneosFiltradosInscrito,
    getTorneosFiltradosEstado : getTorneosFiltradosEstado,
};