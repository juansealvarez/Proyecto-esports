const db = require('../sequelize/models');


const daoTipos = {
    getTipos : async (data) => {
        let filtro = {
            where : {}
        }
        if (data != undefined) {
            if (data.status != undefined) filtro.where.status = data.status
        }else{
            filtro = {}
        }
        const listaTipos = await db.Tipo.findAll(filtro);
        return listaTipos;
    },
    getTipo : async (id) => {
        const tipo = await db.Tipo.findOne({
            where : {
                id: id
            }
        });
        return tipo;
    },
    insertTipo: async (tipo) =>{
        return await db.Tipo.create({
            nombre: tipo.nombre
        });
    },
    updateTipo: async (id, data) => {
        const tipo = await db.Tipo.findOne({
            where: {
                id : id
            }
        });
        if (data.nombre != undefined){
            tipo.nombre = data.nombre;
        }
        return await tipo.save();
    },
    deleteTipo: async (id) => {
        let respuesta = null;
        try{
            respuesta = await db.Tipo.destroy({
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

module.exports = daoTipos;