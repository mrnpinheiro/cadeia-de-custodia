const mongoose = require('mongoose');
const Schema = mongoose.Schema

const custodySchema =  new Schema({
    data_criacao_custodia:{
        type: Date,
        default: Date.now
    },
    id_novo_lacre:{
        type: String,
        required: false
    },
    finalidade_lacre:{
        type: String,
        required: false
    },
    lacre_rompido:{
        type: String,
        enum: [
            'sim',
            'não',
        ],
        required: false
    },
    razao:{
        type: String,
        required: true
    },
    endereco_local_custodia:{
        latitude_local_custodia:{
            type: Number,
            required: false
        },
        longitude_local_custodia:{
            type: Number,
            required: false
        },
        cep_local_custodia:{
            type: String,
            required: false
        },
        endereco_local_custodia:{
            type: String,
            required: false
        },
        numero_local_custodia:{
            type: Number,
            required: false
        },
        cidade_local_custodia:{
            type: String,
            required: false
        },
        estado_local_custodia:{
            type: String,
            required: false
        }
    },
    usuario:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
},
{
    collection: 'Custody',
    versionKey: false
}
);

const custodyCollection = mongoose.model('Custody', custodySchema)

module.exports = {
    custodyCollection
}