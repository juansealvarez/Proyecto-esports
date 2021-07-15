const db = require('../sequelize/models');


const daoEquipos = {
    getEquipos : async () =>{
        //TODO: BD
        const eqs = await db.Equipo.findAll();
        const equipos = [];
        for (let eq of eqs){
            equipos.push({
                id : eq.id,
                user : eq.user,
                correo : eq.correo,
                password : eq.password,
                equipo : eq.equipo,
                
                user_id : await eq.getUsuario()
            })
        };
        console.log(equipos);
        return equipos;
    },
    
    getEquipo : async (id) => {
        const equipo = await db.Equipo.findOne({
            where : {
                id: id
            }
        });
        return equipo;
    },
    insertEquipo: async (equipo) =>{
        return await db.Equipo.create({
            user: equipo.user
        });
    },
    createEquipo: async (eq) => {
        return await db.Equipo.create(eq);
    },
    updateEquipo: async (id, data) => {
        const equipo = await db.Equipo.findOne({
            where: {
                id : id
            }
        });
        if (data.user != undefined){
            equipo.user = data.user;
        }
        return await equipo.save();
    },
    deleteEquipo: async (id) => {
        let respuesta = null;
        try{
            respuesta = await db.Equipo.destroy({
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

module.exports = daoEquipos;