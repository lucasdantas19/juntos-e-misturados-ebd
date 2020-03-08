const GoogleSpreadSheet = require("google-spreadsheet");
const {promisify}= require("util");

const creds = require("./client_secret.json");

const docId = "1TmeJjcBvBRwlxdCagtVEOUlD7A9E-KyR2nakZrgjr3Y";

const acessSheet = async() => {
    const doc= new GoogleSpreadSheet(docId);
    await promisify(doc.useServiceAccountAuth)(creds);
    const info = await promisify(doc.getInfo)();
    const worksheet = info.worksheets[0];
    // Get Data
    const rows = await promisify(worksheet.getRows)({
        query: 'nome = "Lucas Dantas de Araújo" '
    });
    console.log(rows);
    rows.forEach(row => {
        // console.log(row);
    });

    
}

acessSheet();