const express = require('express') //importar express
const session = require('express-session')
const bodyParser = require('body-parser')
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

app.listen(PORT,()=>{
    console.log(`Servidor iniciandose en el puerto ${PORT}`);
});