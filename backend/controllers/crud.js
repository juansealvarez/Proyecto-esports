const alert = require('alert')
//aqui añadimos el bcrypt que tenemos
const bcryptjs=require('bcryptjs');
//express
const express = require("express");
//requerimentos
const path = require('path');
//traigo mis helpers
const mail = require('../helpers/mail');

//GUARDAR un REGISTRO
exports.save = async (req, res)=>{
    const user = req.body.user;
    const rol = req.body.rol;
    const password=req.body.password;
    const correo=req.body.correo;
    let passwordHash= await bcryptjs.hash(password,8);
//
};

//Guardar un registro de equipos
exports.saveEquipo = async (req, res)=>{
    const user = req.body.user;
    const correo = req.body.correo;
    const equipo = req.body.equipo;
    const password=req.body.password;
    
    let passwordHash= await bcryptjs.hash(password,8);

};
//ACTUALIZAR un REGISTRO
exports.update = async (req, res)=>{
    const id = req.body.id;
    const user = req.body.user;
    const rol = req.body.rol;
    const password = req.body.password;
    const correo = req.body.correo;
    let passwordHash= await bcryptjs.hash(password,8);

};

