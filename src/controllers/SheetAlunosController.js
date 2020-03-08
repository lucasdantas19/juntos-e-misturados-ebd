const GoogleSpreadSheet = require("google-spreadsheet");
const {promisify}= require("util");

const creds = require("../../client_secret.json");

const docId = "1TmeJjcBvBRwlxdCagtVEOUlD7A9E-KyR2nakZrgjr3Y";

// index, show, store, update, destroy
module.exports = {
    async show(req, res){

        const doc = new GoogleSpreadSheet(docId);
        await promisify(doc.useServiceAccountAuth)(creds);
        const info = await promisify(doc.getInfo)();
        const worksheet = info.worksheets[0];

        console.log(worksheet);
        const rows = await promisify(worksheet.getRows)({
        });
        
        let alunos = [];
        rows.forEach(row => {
            alunos.push({"nome": row.nomecompleto, "telefone": row.telefone, "nascimento": row.datadenascimento, "id": row.id});
        });
        console.log(alunos);
        console.log(rows);
        return res.json(alunos);
    }
}