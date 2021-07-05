const express = require('express') //importar express
const session = require('express-session')
const bodyParser = require('body-parser')
const {getTorneos, createTorneo, deleteTorneo, getTorneo, updateTorneo} = require('./models/dao_torneos');
const daoTipos = require('./models/dao_tipos');
const daoEstados = require('./models/dao_estados');
const daoInscrito = require('./models/dao_inscrito');
const path = require('path')//trabajar con el views en otra ruta
const app =express(); //objeto app ejecutando express
const PORT = 3000;

app.use(express.static(path.join(__dirname,'assets'))); //configurar archivos estaticos

app.set('view engine', 'ejs'); //configurar ejs template
app.set('views', path.join(__dirname,'/views')); //ruta para directorios de views

app.use(bodyParser.json()); //configurar bodyparser
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(session({
    secret: "123456789",
    resave: false,
    saveUninitialized: false
})); //para trabajar con formularios

app.get('/vista_organizador', async (req, res)=>{
    const listaTorneos = await getTorneos();
    res.render("organizador",{
        torneos : listaTorneos
    })
});

app.get('/vista_participante_lider', async (req, res)=>{
    const listaTorneos = await getTorneos();
    res.render("participante_lider",{
        torneos : listaTorneos
    })
});

app.get('/vista_espectador', async (req, res)=>{
    const listaTorneos = await getTorneos();
    res.render("espectador",{
        torneos : listaTorneos
    })
});

app.get('/',(req, res)=>{
    //Valido si hay un usario en la sesion
    if (req.session.usuario != null){
        res.render('index',{
            usuario:req.session.usuario
        });
    }else{
        res.render("index",{
            usuario:{
                nombre: "",
                pais: "",
                mail: "",
                mensaje: ""
            }
        });
    };
});

app.get('/vista_organizador/add', async (req, res)=>{
    const listaTipos = await daoTipos.getTipos();
    const listaEstados = await daoEstados.getEstados();
    const listaInscritos = await daoInscrito.getInscritos();
    res.render('organizador_registro', {
        tipos : listaTipos,
        estados : listaEstados,
        inscritos : listaInscritos
    });
});

app.post('/vista_organizador/add', async (req,res)=>{
    const tn = {
        nombre : req.body.tn_nombre,
        fecha_inicio : req.body.tn_fecha_inicio,
        fecha_fin : req.body.tn_fecha_fin,
        nro_participantes : parseInt(req.body.tn_nro_participantes),
        descripcion : req.body.tn_descripcion,
        max_participantes: parseInt(req.body.tn_max_participantes),
        idTipo : parseInt(req.body.tn_idTipo),
        nro_partidas_dia : parseInt(req.body.tn_nro_partidas_dia),
        part_ganada : parseInt(req.body.tn_part_ganada),
        part_empatada : parseInt(req.body.tn_part_empatada),
        part_perdida : parseInt(req.body.tn_part_perdida),
        nro_equipos_reg : parseInt(req.body.tn_nro_equipos_reg),
        max_equipos : parseInt(req.body.tn_max_equipos),
        idEstado : parseInt(req.body.tn_idEstado),
        idInscrito : parseInt(req.body.tn_idInscrito)
    };
    const tnGuardado = await createTorneo(tn);
    console.log(tnGuardado);
    res.redirect('/vista_organizador');
});

app.get('/vista_organizador/edit/:id', async (req, res) => {
    const tnId = req.params.id;
    const tn = await getTorneo(parseInt(tnId));
    const listaEstados = await daoEstados.getEstados();
    const listaInscritos = await daoInscrito.getInscritos();
    const listaTipos = await daoTipos.getTipos();

    res.render('organizador_edicion', {
        torneo: tn,
        estados: listaEstados,
        inscritos: listaInscritos,
        tipos: listaTipos
    });
});

app.post('/vista_organizador/edit', async (req, res) => {
    const tn = {
        id: parseInt(req.body.tn_id),
        nombre : req.body.tn_nombre,
        fecha_inicio : req.body.tn_fecha_inicio,
        fecha_fin : req.body.tn_fecha_fin,
        nro_participantes : parseInt(req.body.tn_nro_participantes),
        descripcion : req.body.tn_descripcion,
        max_participantes: parseInt(req.body.tn_max_participantes),
        idTipo : parseInt(req.body.tn_idTipo),
        nro_partidas_dia : parseInt(req.body.tn_nro_partidas_dia),
        part_ganada : parseInt(req.body.tn_part_ganada),
        part_empatada : parseInt(req.body.tn_part_empatada),
        part_perdida : parseInt(req.body.tn_part_perdida),
        nro_equipos_reg : parseInt(req.body.tn_nro_equipos_reg),
        max_equipos : parseInt(req.body.tn_max_equipos),
        idEstado : parseInt(req.body.tn_idEstado),
        idInscrito : parseInt(req.body.tn_idInscrito)
    };
    await updateTorneo(tn);
    res.redirect('/vista_organizador');
});

app.get('/vista_organizador/delete/:id', async (req,res)=>{
    const idTn = req.params.id;
    await deleteTorneo(parseInt(idTn));
    res.redirect('/vista_organizador');
});

app.listen(PORT,()=>{
    console.log(`Servidor iniciandose en el puerto ${PORT}`);
});