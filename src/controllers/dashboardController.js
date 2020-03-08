const Nota = require("../models/Nota");

module.exports = {
    async show(req, res){
        const {aluno_id} = req.headers;

        const notas = await Nota.find({"aluno": aluno_id});

        if(!notas){
            return res.json({"mensagem": "Nehuma nota encontrada"});
        }
        return res.json(notas);
    }
}