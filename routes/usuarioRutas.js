const ruta=require("express").Router();
const Usuario = require("../clases/UsuarioClase");
const UsuarioBD = require("../bd/UsuarioBD");

ruta.get("/",async (req, res)=>{
    try {
        const usuariobd = new UsuarioBD();
        const [usuariosBD]=await usuariobd.mostrarUsuarios();
        console.log(usuariosBD);
        var usuariosCorrectos=[];
        usuariosBD.forEach(usuario => {
            const usuario1 = new Usuario(usuario);
            //console.log(usuario1.obtenerDatos);
            if (usuario1.obtenerDatos.nombre != undefined && usuario1.obtenerDatos.celular != undefined && usuario1.obtenerDatos.correo != undefined){
                usuariosCorrectos.push(usuario);
            }
        });
        //console.log(usuariosCorrectos);
        //res.end();
        res.render("mostrarUsuario",{usuariosCorrectos});
    } catch (error) {
        console.error("Error al recuperar los usuarios "+error);
    }
});

ruta.post("/agregarUsuario",(req,res)=>{
    var usuario1 = new Usuario(req.body);
    console.log(usuario1.obtenerDatos);
    if (usuario1.obtenerDatos.nombre == undefined && usuario1.obtenerDatos.celular == undefined && usuario1.obtenerDatos.correo == undefined){
        res.render("error");
    }
    else{
        const usuariobd = new UsuarioBD();
        usuariobd.crearUsuario(usuario1.obtenerDatos);
        res.redirect("/");
    }
});

ruta.get("/agregarUsuario",(req,res)=>{
    res.render("formulario");
});

ruta.get("/editarUsuario/:id",async(req,res)=>{
    const usuariobd = new UsuarioBD();
    const [[usuario]] = await usuariobd.buscarUsuarioPorId(req.params.id);
    //console.log(usuario);
    res.render("editarUsuario", usuario);
});    

ruta.post("/editarUsuario",async(req,res)=>{
    const usuario1=new Usuario(req.body);
    if (usuario1.obtenerDatos.nombre == undefined && usuario1.obtenerDatos.celular == undefined && usuario1.obtenerDatos.correo == undefined){ 
        res.render("error");
    }
    else{
        const usuariobd=new UsuarioBD();
        await usuariobd.actualizarUsuario(usuario1.obtenerDatos);
        res.redirect("/");
    }
});

ruta.get("/borrarUsuario/:idusuario",async(req,res)=>{
    const usuariobd=new UsuarioBD();
    await usuariobd.borrarUsuario(req.params.idusuario);
    res.redirect("/");
});

module.exports=ruta;