const Nota = require("../models/Nota");
const Aluno = require("../models/Aluno");


module.exports = {
    
    async index(req, res){
        const {data} = req.body;
        console.log("Data:", data);

        if(data == undefined){
            
            const notas = await Nota.find({}).populate("aluno"); 
            return res.json(notas);

        }else{
            const notas = await Nota.find({data}).populate("aluno");
            return res.json(notas);
        }
        return [];
        
    },



    async store(req, res){
        const {nota} = req.body;
        const {data} = req.body;
        const {tema} = req.body;
    
        const {aluno_id} = req.body;

        const aluno = await Aluno.findById(aluno_id);
        console.log("PARTE 1");
        if(!aluno){
            return res.status(400).json({error: "Aluno não encontrado"})
        }
        console.log("CHEGUEI AQUI");
        let prova = await Nota.findOne({"data":data,"aluno":aluno_id});
        console.log(prova);
        if(!prova){
            prova = await Nota.create({nota,data,tema,"aluno": aluno_id});
        }
        console.log(prova);
        console.log(aluno_id);
        return res.json(prova);
    },

    async update(req, res){
        const {aluno_id} = req.body;
        const {data} = req.body;

        const {nota} = req.body;
        const {tema} = req.body;
        let prova = await Nota.findOne({"aluno": aluno_id,"data": data});

        console.log(prova);
        prova.nota =  nota;
        prova.tema = tema;

        await prova.save();

        return res.json(prova);
    }
}