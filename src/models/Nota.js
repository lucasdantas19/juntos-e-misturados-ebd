const mongoose = require("mongoose");

const NotaSchema = new mongoose.Schema({
    nota: Number,
    data: Date,
    tema: String,
    aluno: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Aluno"
    }
});

module.exports = mongoose.model("Nota", NotaSchema);