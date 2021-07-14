const express = require("express")
const bodyParser = require("body-parser")
 
const rutas = express.Router()
 
const Sequelize = require('sequelize')
const models = require('../models')
const usuario = models.Usuario
const torneo = models.TorneoD
const Equipo = models.EquipoD
const TorneoEquipo = models.TorneoEquipo

 
// Multer
const multer = require('multer')
const { query } = require("express")
const par = multer()
 
// Parsing de lo datos
rutas.use( express.urlencoded( {extended : true}) )
rutas.use( express.json() )
rutas.use( par.array() )
 
// RUTA //
rutas.get('/Admi', (req,res) => {
    res.end("<h1>Hola admi</h1")
})

rutas.get('/Orga', (req,res) => {
    res.end("Hola Organizador")
})
 
rutas.get('/Lider', (req,res) => {
    res.end("Hola Lider")
})

rutas.get('/Espectador', (req,res)=>{
    torneo.findAll({

    })
    .then(rpta =>{
        res.render('VistaEmpleado', {empleado:rpta})
    })
    .catch( error =>{
        console.log(error)
        res.status(500).send(error)
    })
})

//Verificar GET
/*rutas.get('/autenticacion', (req,res) =>{
    return usuario.findAll( 
        {
            where:{
                constrasena: req.query.contrasena
            }
            
        }
    )
    .then( usuario => res.status(200).send(usuario) )
    .catch( error => res.status(400).send(error) )
})*/

//Verificar POST
rutas.post('/autenticacion', (req,res) =>{
    return usuario.findAll( 
        {
            where:{
                correo: req.body.correo,
                contrasena : req.body.contrasena
            }
            
        }
    )
    .then( usuario => res.status(200).send(usuario) )
    .catch( error => res.status(400).send(error) )
})


rutas.get('/TodoTorneo', (req,res) =>{
    return torneo.findAll({
        
    })
    .then( torneo => res.status(200).send(torneo) )
    .catch( error => res.status(400).send(error) )
})

rutas.post('/TodoTorneoEquipo', (req,res) =>{
    return TorneoEquipo.findAll({
        where:{
            IdTorneo: req.body.IdTorneo
        }
    })
    .then( TorneoEquipo => res.status(200).send(TorneoEquipo) )
    .catch( error => res.status(400).send(error) )
})

rutas.post('/BusquedaTorneoEstado', (req,res) =>{
    return torneo.findAll({
        where:{
            Estado: req.body.estado
        }
    })
    .then( torneo => res.status(200).send(torneo) )
    .catch( error => res.status(400).send(error) )
})

rutas.post('/BusquedaTorneoOrganizador', (req,res) =>{
    return torneo.findAll({
        where:{
            Nombre: req.body.nombre
        }
    })
    .then( torneo => res.status(200).send(torneo) )
    .catch( error => res.status(400).send(error) )
})

rutas.get('/TodoTorneoEnCurso', (req,res) =>{
    return torneo.findAll({
        where:{
            Estado: "En Curso"
        }
    })
    .then( torneo => res.status(200).send(torneo) )
    .catch( error => res.status(400).send(error) )
})

rutas.post('/registrolider', (req,res) =>{
    torneo.findAll({
       nombre : req.body.nombre, 
       correo :  req.body.correo,
       contrasena : req.body.contrasena,
       rol :"lider"
   })
   .then( torneo => res.status(200).send(torneo) )
   .catch( error => res.status(400).send(error) )
})


rutas.post('/registrolider', (req,res) =>{
    torneo.findAll({
       nombre : req.body.nombre, 
       correo :  req.body.correo,
       contrasena : req.body.contrasena,
       rol :"lider"
   })
   .then( torneo => res.status(200).send(torneo) )
   .catch( error => res.status(400).send(error) )
})

rutas.post('/actualizarperfil', (req,res) =>{
    usuario.update({
       nombre : req.body.nombre, 
       correo : req.body.correo,
       contrasena : req.body.contrasena

   },{ where :{
       id = req.body.id 
    }
    } 
    )   
   .then( torneo => res.status(200).send(torneo) )
   .catch( error => res.status(400).send(error) )
})


rutas.post('/actualizarequipo', (req,res) =>{
    Equipo.update({
       equipo : req.body.equipo, 
       integrantes :  req.body.integrantes,
      
   },{ where :{
    IdLider = req.body.id 
 }
 } 
 )   
.then( torneo => res.status(200).send(torneo) )
.catch( error => res.status(400).send(error) )
})



module.exports = rutas