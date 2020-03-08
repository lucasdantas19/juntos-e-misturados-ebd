const GoogleSpreadSheet = require("google-spreadsheet");
const {promisify}= require("util");

const creds = require("../../client_secret.json");

const docId = "18UamdVpNHi3dNU4bQPxyUpK3pm5wAXauGbvpr2sEL6c";

const domingos = ["05/01/2020"	,"12/01/2020"	,"19/01/2020"	,"26/01/2020"	,"02/02/2020"	,"09/02/2020"	,"16/02/2020"	,"23/02/2020"	,"01/03/2020", "08/03/2020", "15/03/2020", "22/03/2020", "29/03/2020"];

function dataFormat(data) {
    let d = data.split("/");
    let dataFormatada = d[0] + d[1] + d[2];
    return dataFormatada;
}
// index, show, store, update, destroy
module.exports = {

    
    

    async adicionarAlunos(req,res){
        const alunosCadastrados = req.body;

        const doc = new GoogleSpreadSheet(docId);
        await promisify(doc.useServiceAccountAuth)(creds);
        const info = await promisify(doc.getInfo)();
        const worksheet = info.worksheets[0];

        console.log(worksheet);
        const rows = await promisify(worksheet.getRows)({
        });
        alunosCadastrados.forEach(async aluno => {
            console.log(aluno);
            if(rows.find(row => {return aluno.nome == row.nome}) != undefined){
                console.log("aluno encontrado");
            }else{
                let newRow = {"id_aluno": aluno.id, "nome": aluno.nome};
                console.log(newRow);
                await promisify(worksheet.addRow)(newRow);

            }
        });

        return res.json({"messagem": "ok"});
    },

    async show(req, res){

        const doc = new GoogleSpreadSheet(docId);
        await promisify(doc.useServiceAccountAuth)(creds);
        const info = await promisify(doc.getInfo)();
        const worksheet = info.worksheets[0];
        // console.log(worksheet);
        const rows = await promisify(worksheet.getRows)({
        });
        // console.log(rows);
        
        let alunos = [];
        rows.forEach(row => {
            console.log(row);
            let aluno = {"nome": row.nome, "id": row.id};
            domingos.forEach(domingo => {
                let data = dataFormat(domingo);
                aluno[domingo] = row["d" + data];
                
                console.log("domingo" + domingo);
                console.log(aluno);
            })
            alunos.push(aluno);

        });
        return res.json(alunos);
    },

    async store(req, res){
        const doc = new GoogleSpreadSheet(docId);
        await promisify(doc.useServiceAccountAuth)(creds);
        const info = await promisify(doc.getInfo)();
        const worksheet = info.worksheets[0];

        const {id_aluno} = req.body;
        const {nota} = req.body; 
        const {data} = req.body;
        const {nome} = req.body;

        console.log("aqui1");
        let dataFormatada = "d" + dataFormat(data);
        
        console.log("aqui2");
        let novaNota = {
            "id_aluno": id_aluno,
            "nota": nota,
            "data": dataFormatada,
            "nome": "nome"
        }

        console.log("nova nota",novaNota);

        let linhas = await promisify(worksheet.getRows)();
        for(index = 0; index < linhas.length; index++){
            if(linhas[index].nome == nome){
                linhas[index][dataFormatada] = nota;
                await promisify(linhas[index].save)();
                break;
            }
        }
        return res.json({"menssagem": "ok"});
    }
    
}