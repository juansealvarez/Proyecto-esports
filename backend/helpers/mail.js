const nodemailer = require('nodemailer');

module.exports = (correo, usuario, contrasenia) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: "1a619b249c407a", // generated ethereal user
            pass: "ac5fffa63d6409", // generated ethereal password
        },
    });
    
      // send mail with defined transport object
    return transporter.sendMail({
        from: '"ESPORTS 👻" <esport@gmail.com>', // sender address
        to: correo, // list of receivers
        subject: "Datos del participante", // Subject line
        text: "Bienvenido a ESPORTS", // plain text body
        html: "<b>Contraseña: </b>" + contrasenia +"<br>"+ "<b>Usuario: </b>"+usuario, // html body
    } , (error,info)=>{
          if(error) res.status(200).send({ success: false, error:error});
          return res.status(200).send({
              success:true,
              message: 'correo enviado'
        });
    });
}