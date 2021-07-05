const db = require('../sequelize/models');


const daoEstados = {
    getEstados : async (data) => {
        let filtro = {
            where : {}
        }
        if (data != undefined) {
            if (data.status != undefined) filtro.where.status = data.status
        }else{
            filtro = {}
        }
        const listaEstados = await db.Estado.findAll(filtro);
        return listaEstados;
    },
    getEstado : async (id) => {
        const estado = await db.Estado.findOne({
            where : {
                id: id
            }
        });
        return estado;
    },
    insertEstado: async (estado) =>{
        return await db.Estado.create({
            nombre: estado.nombre
        });
    },
    updateEstado: async (id, data) => {
        const estado = await db.Estado.findOne({
            where: {
                id : id
            }
        });
        if (data.nombre != undefined){
            estado.nombre = data.nombre;
        }
        return await estado.save();
    },
    deleteEstado: async (id) => {
        let respuesta = null;
        try{
            respuesta = await db.Estado.destroy({
                where: {
                    id : id
                }
            });
            return respuesta;
        }catch (error){
            respuesta = {msg : error.name + " - No puedes borrar una entrada mientras otra entidad esta usandola"};
            return respuesta;
        };
    }
}

module.exports = daoEstados;