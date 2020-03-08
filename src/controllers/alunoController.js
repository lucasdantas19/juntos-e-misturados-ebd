const Aluno = require("../models/Aluno");

module.exports = {

    async all(req, res) {        
        const alunos = await Aluno.find({});
        return res.json(alunos); 
    },


    async index(req, res) {
        const {aluno_id} = req.headers;
        const aluno = await Aluno.findById(aluno_id);

        return res.json(aluno);
    },

    async show(req, res) {

        const {nome} = req.params;
        console.log(nome);
        
        const alunos = await Aluno.find({ "nome": { $regex: '.*' + nome + '.*', $options: 'i'}});
        return res.json(alunos);
    },

    async store(req, res) {
        const {nome} = req.body;
        const {telefone} = req.body;
        const {id} = req.body;
        const {nascimento}= req.body;
        let aluno = await Aluno.findOne({nome,id});

        if(!aluno){
            aluno = await Aluno.create({nome,telefone,nascimento,id});
        }

        return res.json(aluno);

    }


}