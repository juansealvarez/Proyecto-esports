const db = require('../sequelize/models');


const getUsers = async () =>{
    //TODO: BD
    const urs = await db.Usuario.findAll();
    const usuarios = [];
    for (let us of urs){
        usuarios.push({
            id : us.id,
            user : us.user,
            rol : us.rol,
            correo : us.correo,
            password : us.password,
            //equipo : await us.getEquipo()
        })
    };
    console.log(usuarios);
    return usuarios;
};

const getUsuario = async (usId) => {
    // este usid, este metodo, donde lo llamas?
    // 
    const us = await db.Usuario.findOne({
        where: {
            id: usId
        }
    });
    return us;
};

const getConfirmacion = async (usUs, usPass, usRol) => {
    //desencriptarlo
    
    const us = await db.Usuario.findOne({
        where: {
            user: usUs,
            password : usPass,
            rol: usRol
        }
    });
    if (us!=null){
        return true
    }else{
        return false;
    }
    
};

const getUsuariosFiltradosRol = async (rol) =>{
    //TODO: BD
    const urs = await db.Usuario.findAll({
        where: {
            rol : rol
        }
    });
    const usuarios = [];
    for (let us of urs){
        usuarios.push({
            id : us.id,
            user: us.user,
            rol: us.rol,
            correo: us.correo,
            password: us.password
        })
    };
    console.log(usuarios);
    return usuarios;
};

const getExiste = async (usCorreo, usUser) => {
   
    const us = await db.Usuario.findOne({
        where: {
            correo: usCorreo,
            user : usUser,
        }
    });
    if (us!=null){
        return true
    }else{
        
        return false;
    }
    
};


const createUsuario = async (us) => {
    return await db.Usuario.create(us);
};

const updateUsuario = async (us) =>{
    const usAEditar = await getUsuario(us.id);
    usAEditar.user = us.user;
    usAEditar.correo = us.correo;
    usAEditar.rol = us.rol;
    usAEditar.password = us.password;

    await usAEditar.save();
    return true;
};

const deleteUsuario = async (idUs) =>{
    await db.Usuario.destroy({
        where: {
            id: idUs
        }
    });
    return true;
};

module.exports = {
    getUsers: getUsers,
    getUsuario: getUsuario,
    createUsuario: createUsuario,
    updateUsuario: updateUsuario,
    deleteUsuario: deleteUsuario,
    getConfirmacion: getConfirmacion,
    getExiste: getExiste,
    getUsuariosFiltradosRol: getUsuariosFiltradosRol
};