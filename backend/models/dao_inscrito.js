const db = require('../sequelize/models');


const daoInscrito = {
    getInscritos : async (data) => {
        let filtro = {
            where : {}
        }
        if (data != undefined) {
            if (data.status != undefined) filtro.where.status = data.status
        }else{
            filtro = {}
        }
        const listaInscritos = await db.Inscrito.findAll(filtro);
        return listaInscritos;
    },
    getInscrito : async (id) => {
        const inscrito = await db.Inscrito.findOne({
            where : {
                id: id
            }
        });
        return inscrito;
    },
    insertInscrito: async (inscrito) =>{
        return await db.Inscrito.create({
            nombre: inscrito.nombre
        });
    },
    updateInscrito: async (id, data) => {
        const tipo = await db.Inscrito.findOne({
            where: {
                id : id
            }
        });
        if (data.nombre != undefined){
            inscrito.nombre = data.nombre;
        }
        return await inscrito.save();
    },
    deleteInscrito: async (id) => {
        let respuesta = null;
        try{
            respuesta = await db.Inscrito.destroy({
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

module.exports = daoInscrito;