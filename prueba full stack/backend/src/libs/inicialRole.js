const role = require('../models/role.model')
const usuarioModel = require('../models/usuario.model')
const auth = require('../helpers/Auth.helpers');
const jwt = require('jsonwebtoken');
const createRole = {};

createRole.create = async (req, res) => {
    try {
        const count = await role.estimatedDocumentCount();
        if (count > 0) return;

        const values = await Promise.all([
            new role({ name: 'admin' }).save(),
            new role({ name: 'vendedor' }).save(),
            new role({ name: 'bodega' }).save(),
            new role({ name: 'THumano' }).save(),
        ])
        return values
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: error.message
        })
    }
}

createRole.userAdmin = async (req, res) => {
    //creando el usuario default administrador
    const nombre = "admin"
    const apellido = "admin"
    const email = "admin@admin.com"
    const password = "admin"
    const user = await usuarioModel.find( {email} );
    //console.log(user.length);
    if (user.length===0) {
        const roleAdmin = await role.findOne({ name: "admin" })
        const newUser = new usuarioModel({
            nombre,
            apellido,
            email,
            //encriptando la contraseña
            password: auth.encryptPassword(password),
        })
        newUser.roles = roleAdmin;
        //console.log(newUser);
        await newUser.save();
    }
    return
}

module.exports = createRole;