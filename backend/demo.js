const bcryptjs = require('bcryptjs');//encriptar
const crypto = require('crypto');

const algorithm = 'aes-256-ctr';
const secretKey = 'vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3';
const iv = crypto.randomBytes(16);

const encrypt = (text) => {

    const cipher = crypto.createCipheriv(algorithm, secretKey, iv);

    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

    return {
        iv: iv.toString('hex'),
        content: encrypted.toString('hex')
    };
};

const decrypt = (hash) => {

    const decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(hash.iv, 'hex'));

    const decrpyted = Buffer.concat([decipher.update(Buffer.from(hash.content, 'hex')), decipher.final()]);

    return decrpyted.toString();
};

console.log(encrypt('pepe valdivia'))
console.log(decrypt('114177f54a19b9053e5ef934445eb2d1'))

/**
// {
//     iv: '692e44dbbea073fc1a8d1c37ea68dffa',
//     content: 'bbffd902d55d7a00f3a0504e'
// }
problemas! esto es lo que genera la encriptacion, tu solo necesitas un valor,
dos soluciones, o buscan otra libreria, o a la hora de garbar, toman los dos valores 
y los concatenan con un || para saber que la primera para es iv y la segunda content 
*/

var demo = (usPass) => {
    const hash = bcryptjs.hashSync(usPass,10)
    console.log(hash)
}

demo('pepe')
// un gran detalle, cada vez que ejecuto este codigo, que es como el qe tu tienes, siempre de genera una 
// encriptada disit
// eso si lo sabemos, pero como lo solucionamos?
// las veces que encriptado algo, hayque pasarle como parametro un key