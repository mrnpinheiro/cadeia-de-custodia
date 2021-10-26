const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
    nome: {
        type: String,
        require: true
    },
    cargo: {
        type: String,
        require: true
    },
    rg: {
        type: String,
        require: true
    },
    lotacao: {
        type: String,
        require: true
    },
    numero_de_registro: {
        type: String,
        unique: true,
        required: true,
        lowercase: true
    },
    senha: {
        type: String,
        required: true,
        select: false
    },
    data_criacao_usuario: {
        type: Date,
        default: Date.now
    }
});

UserSchema.pre('save', async function(next) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;

    next();
});

const User = mongoose.model('User', UserSchema);

module.exports = User;