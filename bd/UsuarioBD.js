const ConectarBD = require("./ConectarBD");

class UsuarioBD extends ConectarBD{
    constructor(){
        super();
    }
    async crearUsuario(usuario){
        const sql="INSERT INTO usuarios (nombre, celular, correo) VALUES('"+usuario.nombre+"', '"+usuario.celular+"', '"+usuario.correo+"');";
        try{
            await this.conectarMySql();
            await this.conexion.execute(sql);
            await this.cerrarConexion();
            console.log("Registro creado correctamente");
        } catch (error) {
            console.error("Error al crear el registro "+error);
            console.error(sql);
        }
    }
    async mostrarUsuarios(){
        const sql="SELECT * FROM usuarios"
        try {
            await this.conectarMySql();
            const usuariosBD=await this.conexion.execute(sql);
            await this.cerrarConexion();
            return usuariosBD;
        } catch (error) {
            console.error("Error al recuperar los usuarios "+error);
            console.error(sql);
            return null;
        }
    }

    async buscarUsuarioPorId(idUsuario){
        const sql="SELECT * FROM usuarios WHERE idusuario="+idUsuario;
        try {
            await this.conectarMySql();
            const usuario=await this.conexion.execute(sql);
            await this.cerrarConexion();
            return usuario;
        } catch (error) {
            console.error("Error al recuperar al usuario "+error);
            console.error(sql);
        }
    }

    async actualizarUsuario(usuario){
        console.log(usuario);
        const sql="UPDATE usuarios SET nombre='"+usuario.nombre+"', celular='"+usuario.celular+"', correo='"+usuario.correo+"' WHERE idusuario="+usuario.idusuario;
        try {
            await this.conectarMySql();
            await this.conexion.execute(sql);
            await this.cerrarConexion();
            console.log("Actualización correcta");
        } catch (error) {
            console.error("Error al editar el usuario "+error);
            console.error(sql);
        }
    }

    async borrarUsuario(idusuario){
        const sql="DELETE FROM usuarios WHERE idusuario="+idusuario;
        try {
            await this.conectarMySql();
            await this.conexion.execute(sql);
            await this.cerrarConexion();
            console.log("Usuario borrado");
        } catch (error) {
            console.error("Error al borrar al usuario "+error);
            console.error(sql);
        }
    }
    
}

module.exports=UsuarioBD;