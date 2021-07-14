const express = require('express') //importar express
const session = require('express-session')
const bodyParser = require('body-parser')
const { getTorneos, createTorneo, deleteTorneo, getTorneo, updateTorneo, getTorneosFiltrados, getTorneosFiltradosNombre, getTorneosFiltradosEstado, getTorneosFiltradosInscrito } = require('./models/dao_torneos');
const { getUsers, getUsuario, updateUsuario, createUsuario, deleteUsuario, getConfirmacion} = require('./models/dao_users');
const daoTipos = require('./models/dao_tipos');
const daoEquipos = require('./models/dao_equipos');
const daoEstados = require('./models/dao_estados');
const daoInscrito = require('./models/dao_inscrito');
const bcryptjs = require('bcryptjs');
const mail = require('./helpers/mail');
const path = require('path')//trabajar con el views en otra ruta
const app = express(); //objeto app ejecutando express
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'assets'))); //configurar archivos estaticos

app.set('view engine', 'ejs'); //configurar ejs template
app.set('views', path.join(__dirname, '/views')); //ruta para directorios de views

app.use(bodyParser.json()); //configurar bodyparser
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(session({
    secret: "123456789",
    resave: false,
    saveUninitialized: false
})); //para trabajar con formularios

app.get('/organizador', async (req, res) => {
    if(req.session.loggedin){
        const listaTorneos = await getTorneos();
        res.render("organizador", {
            torneos: listaTorneos
        })
    }else{
        res.render('principal',{
            login:false,
            rol:'Debe iniciar sesion'
        })
    }
    
});

app.get('/participante', async (req, res) => {
    if(req.session.loggedin){
        const listaTorneos = await getTorneos();
        res.render("participante_lider", {
            torneos: listaTorneos
        })
    }else{
        res.render('principal',{
            login:false,
            rol:'Debe iniciar sesion'
        })
    }
  
});

app.post('/participante/filtrate/status', async (req, res) => {
    //obtener el nombre del campo de texto
    const est = req.body.estado
    estado = parseInt(est);
    if (estado > 0 && estado < 4) {//revisar si la casilla esta marcada
        const listaTorneos = await getTorneosFiltradosEstado(estado);
        res.render("participante_lider_filtro_estado", {
            torneos: listaTorneos
        })
        console.log(torneos);
    } else {// si no
        res.redirect('/participante');
    }

});

app.post('/participante/filtrate/signed_up', async (req, res) => {
    //obtener el nombre del campo de texto
    const ins = req.body.inscrito
    inscrito = parseInt(ins);
    if (inscrito > 0 && inscrito < 3) {//revisar si la casilla esta marcada
        const listaTorneos = await getTorneosFiltradosInscrito(ins);
        res.render("participante_lider_filtro_inscrito", {
            torneos: listaTorneos
        })
        console.log(torneos);
    } else {//si no
        res.redirect('/participante');
    }

});

app.get('/espectador', async (req, res) => {
    
        const listaTorneos = await getTorneosFiltrados();
        res.render("espectador", {
            torneos: listaTorneos
        })
        //console.log(torneos);
    
});

app.get('/', async (req, res) => {
    //Valido si hay un usario en la sesion
    const listaUsuarios = await getUsers();
    res.render("login", {
        usuarios: listaUsuarios
    })
});

app.post('/login', async (req, res) => {
    //Valido si hay un usario en la sesion
    const usUs = req.body.user
    const usPass = req.body.password
    const usRol = req.body.rol
    //let passwordH = await bcryptjs.hash(usPass, 8);
    // let confirmpass=await bcryptjs.compare(password,passwordH)
    const confirmacion = await getConfirmacion(usUs, usPass, usRol)
    console.log(confirmacion)
    if(confirmacion == true){
        req.session.loggedin = true;
        req.session.rol = usRol;
        switch (usRol) {
            case 'admin':
                res.redirect('/admin');
                break;
            case 'Organizador':
                res.redirect('/organizador')
                break;
            case 'Participante':
                res.redirect('/participante');
                break;
        }
    }else{
        res.redirect('/');
    }
});

app.get('/registro', async (req,res) => {
    res.render('create')
})

app.post('/registro', async (req, res) => {
    const password= req.body.password;
    //let passwordHash= await bcryptjs.hash(password,8);
    const usr = {
        user: req.body.user,
        correo: req.body.correo,
        password:passwordHash,
        rol: req.body.rol,
        equipo: parseInt(req.body.equipo)
        
    };
    const tnGuardado = await createUsuario(usr);
    mail(usr.correo,usr.user,usr.password)
    console.log(usr);
    res.redirect('/');
});
app.get('/recuperar',(req,res)=>{
    res.render('recuperar');
})
app.post('/recuperar',(req,res)=>{
    res.render('recuperar');
})
app.get('/organizador/add', async (req, res) => {
    if(req.session.loggedin){
        const listaTipos = await daoTipos.getTipos();
        const listaEstados = await daoEstados.getEstados();
        const listaInscritos = await daoInscrito.getInscritos();
        res.render('organizador_registro', {
            tipos: listaTipos,
            estados: listaEstados,
            inscritos: listaInscritos
        });
    }else{

        res.render('principal',{
            login:false,
            rol:'Debe iniciar sesion'
        })
    }
    
});

app.post('/organizador/add', async (req, res) => {
    const tn = {
        nombre: req.body.tn_nombre,
        fecha_inicio: req.body.tn_fecha_inicio,
        fecha_fin: req.body.tn_fecha_fin,
        nro_participantes: parseInt(req.body.tn_nro_participantes),
        descripcion: req.body.tn_descripcion,
        max_participantes: parseInt(req.body.tn_max_participantes),
        idTipo: parseInt(req.body.tn_idTipo),
        nro_partidas_dia: parseInt(req.body.tn_nro_partidas_dia),
        part_ganada: parseInt(req.body.tn_part_ganada),
        part_empatada: parseInt(req.body.tn_part_empatada),
        part_perdida: parseInt(req.body.tn_part_perdida),
        nro_equipos_reg: parseInt(req.body.tn_nro_equipos_reg),
        max_equipos: parseInt(req.body.tn_max_equipos),
        idEstado: parseInt(req.body.tn_idEstado),
        idInscrito: parseInt(req.body.tn_idInscrito)
    };
    const tnGuardado = await createTorneo(tn);
    console.log(tnGuardado);
    res.redirect('/organizador');
});

app.get('/equipo/add', async (req, res) => {
    if(req.session.loggedin){
        res.render('createEquipo');
    }else{
        res.render('principal',{
            login:false,
            rol:'Debe iniciar sesion'
        })
    }
    
});

app.post('/equipo/add', async (req, res) => {
    const eq = {
        user:req.body.user,
        equipo:req.body.equipo,
        correo:req.body.correo,
        password:req.body.password
    };
    const eqGuardado = await daoEquipos.createEquipo(eq);
    console.log(eqGuardado);
    res.redirect('/organizador');
});

app.get('/equipo/delete', async (req, res) => {
    if(req.session.loggedin){
        const listaEquipos = await daoEquipos.getEquipos();
        res.render('listEquipos', {
            equipos: listaEquipos
        });
    }else{
        res.render('principal',{
            login:false,
            rol:'Debe iniciar sesion'
        })
    }
    
});

app.get('/organizador/edit/:id', async (req, res) => {
    if(req.session.loggedin){
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
    }else{
        res.render('principal',{
            login:false,
            rol:'Debe iniciar sesion'
        })
    }
   
});

app.post('/organizador/edit', async (req, res) => {
    const tn = {
        id: parseInt(req.body.tn_id),
        nombre: req.body.tn_nombre,
        fecha_inicio: req.body.tn_fecha_inicio,
        fecha_fin: req.body.tn_fecha_fin,
        nro_participantes: parseInt(req.body.tn_nro_participantes),
        descripcion: req.body.tn_descripcion,
        max_participantes: parseInt(req.body.tn_max_participantes),
        idTipo: parseInt(req.body.tn_idTipo),
        nro_partidas_dia: parseInt(req.body.tn_nro_partidas_dia),
        part_ganada: parseInt(req.body.tn_part_ganada),
        part_empatada: parseInt(req.body.tn_part_empatada),
        part_perdida: parseInt(req.body.tn_part_perdida),
        nro_equipos_reg: parseInt(req.body.tn_nro_equipos_reg),
        max_equipos: parseInt(req.body.tn_max_equipos),
        idEstado: parseInt(req.body.tn_idEstado),
        idInscrito: parseInt(req.body.tn_idInscrito)
    };
    await updateTorneo(tn);
    res.redirect('/organizador');
});

app.post('/organizador/filtrate/', async (req, res) => {
    //obtener el nombre del campo de texto
    const nomb = req.body.filtro_nombre
    if (nomb != "") {
        const listaTorneos = await getTorneosFiltradosNombre(nomb);
        res.render("organizador_filtro_nombre", {
            torneos: listaTorneos
        })
        console.log(torneos);
    } else {
        res.redirect('/organizador');
    }

});

app.get('/equipo/remove/:id', async (req, res) => {
    if(req.session.loggedin){
        const idEq = req.params.id;
        await daoEquipos.deleteEquipo(parseInt(idEq));
        res.redirect('/organizador');
    }else{
        res.render('principal',{
            login:false,
            rol:'Debe iniciar sesion'
        })

    }
    
});

app.get('/organizador/delete/:id', async (req, res) => {
    if(req.session.loggedin){
        const idTn = req.params.id;
        await deleteTorneo(parseInt(idTn));
        res.redirect('/organizador');
    }else{
        res.render('principal',{
            login:false,
            rol:'Debe iniciar sesion'
        })

    }
    
});

app.get('/admin', async (req, res) => {
    if(req.session.loggedin){
    const listaUsuarios = await getUsers();
    res.render("index", {
        usuarios: listaUsuarios
    })
    }else{
        res.render('principal',{
            login:false,
            rol:'Debe iniciar sesion'
        })
    }
    
});

app.get('/admin/add', async (req, res) => {
    if (req.session.loggedin) {
        res.render('create', {
            login: true,
            rol: req.session.rol
        });
    } else {
        res.render('principal', {
            login: false,
            rol: 'Debe iniciar sesion'
        })
    }
});
app.post('/admin/add', async (req, res) => {
    const password= req.body.password;
    //let passwordHash= await bcryptjs.hash(password,8);
    const usr = {
        user: req.body.user,
        correo: req.body.correo,
        password: req.body.password,
        rol: req.body.rol,
        equipo: parseInt(req.body.equipo)
        
    };
    const tnGuardado = await createUsuario(usr);
    mail(usr.correo,usr.user,usr.password)
    console.log(usr);
    res.redirect('/admin/add');
});

app.get('/principal', async (req, res) => {
    if(req.session.loggedin){
        
        res.render('principal',{
            usuarios:usuarios
        })
    }else{
        res.render('principal', {
            login: false,
            rol: 'Error'
        })   
    }
  
});

app.get('/index', async (req, res) => {

    if(req.session.loggedin){
        const usuarios = await getUsers();
        res.render("index",{
            usuarios:usuarios
        })
    }else{
        res.render('principal', {
            login: false,
            rol: 'Debe iniciar sesion'
        })   
    }
    //prueba denuevo borre el metodo de llamar a usuarios
});
app.get('/login',(req,res)=>{
    if(req.session.loggedin){
        
        res.render('login',{
            login:true,
            rol:req.session.rol
        });
    }else{
        res.render('principal', {
            login: false,
            rol: 'Debe iniciar sesion'
        })   
    }
})
app.get('/logout', async (req, res) => {
    if (req.session.loggedin) {
        res.render('login', {
            login: true,
            rol: req.session.rol
        });
    } else {
        res.render('principal', {
            login: false,
            rol: 'Debe iniciar sesion'
        })   
    }
    
});

app.get('/admin/delete/:id', async (req, res) => {
    if(req.session.loggedin){
        const idUs = req.params.id;
        await deleteUsuario(parseInt(idUs));
        res.redirect('/admin');
    }else{
        res.render('principal', {
            login: false,
            rol: 'Debe iniciar sesion'
        })
    }
   
});

app.get('/admin/edit/:id', async (req, res) => {
    if(req.session.loggedin){
        const usId = req.params.id;
        const us = await getUsuario(parseInt(usId));
        res.render('edit', {
            usuario: us,
        });
    }else{
        res.render('principal', {
            login: false,
            rol: 'Debe iniciar sesion'
        })
    }
 
});

app.post('/admin/edit', async (req, res) => {
    const us = {
        id: parseInt(req.body.us_id),
        user: req.body.us_user,
        correo: req.body.us_correo,
        rol: req.body.us_rol,
        password: req.body.us_password
    };
    await updateUsuario(us);
    res.redirect('/admin');
});


const crud = require('./controllers/crud');
//metodos que pueda realizar el admin de la bd
app.post('/save', crud.save);
app.post('/saveEquipo', crud.saveEquipo);
app.post('/update', crud.update);

app.listen(PORT, () => {
    console.log(`Servidor iniciandose en el puerto ${PORT}`);
});