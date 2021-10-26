const mongoose = require('mongoose');
const Schema = mongoose.Schema

const evidenceSchema =  new Schema({
    data_criacao_evidencia: {
        type: Date,
        default: Date.now
    },
    id_lacre: {
        type: String,
        required: true
    },
    unidade: {
        type: String,
        required: true
    },
    id_vestigio: {
        type: String,
        required: false
    },
    id_laudo: {
        type: String,
        required: true
    },
    id_bo: {
        type: String,
        required: true
    },
    id_dp: {
        type: String,
        required: true
    },
    id_ip_pm: {
        type: String,
        required: true
    },
    endereco_local_crime: {
        latitude_local_crime: {
            type: Number,
            required: false
        },
        longitude_local_crime: {
            type: Number,
            required: false
        },
        cep_local_crime: {
            type: String,
            required: false
        },
        endereco_local_crime: {
            type: String,
            required: false
        },
        numero_local_crime: {
            type: Number,
            required: false
        },
        cidade_local_crime: {
            type: String,
            required: false
        },
        estado_local_crime: {
            type: String,
            required: false
        }
    },
    tipo_vestigio: {
        type: String,
        required: true
    },
    descricao_vestigio: {
        type: String,
        required: true
    },
    localizacao_vestigio: {
        type: String,
        required: true
    },
    tipo_amostra: {
        type: String,
        enum: [
            'prova',
            'contraprova',
            'contraperícia'
        ],
        required: true,
        default: 'prova'
    },
    numero_fcc: {
        type: String,
        required: true
    },
    realizacao_pericia: {
        type: String,
        enum: [
            'já periciado no local',
            'a periciar',
            'solicitar Relatório de Análise'
        ],
        required: true,
        default: 'a periciar'
    },
    observacoes: {
        type: String,
        required: false
    },
    usuarios: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }]
},
{ 
    collection: 'Evidence',
    versionKey: false
}
);

const evidenceCollection = mongoose.model('Evidence', evidenceSchema)

module.exports = {
    evidenceCollection
}