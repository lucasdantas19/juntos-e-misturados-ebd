const mongoose = require("mongoose");

const AlunoSchema = new mongoose.Schema({
    nome: String,
    telefone: String,
    nascimento: Date,
    id: String,
});

module.exports = mongoose.model("Aluno", AlunoSchema);