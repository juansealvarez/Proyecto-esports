const butModalAceptarOnClick = () => {
    const idEstado = document.querySelector("#filtro_estado").value;
    if (idEstado!=null){
        const tns = await db.Torneo.findAll({
            where: {
                idEstado : idEstado
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
    }
}
