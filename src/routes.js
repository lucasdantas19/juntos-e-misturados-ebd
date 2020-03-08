const express = require("express");
// const multer = require("multer");
// const uploadConfig = require("./config/upload");
const AlunoController = require("./controllers/alunoController");
const NotaController = require("./controllers/NotaController");
const HistoricoController = require("./controllers/dashboardController");
const SheetAlunosController = require("./controllers/SheetAlunosController");
const SheetNotaController = require("./controllers/SheetNotaController")

const routes = express.Router();
// const upload = multer(uploadConfig);

routes.post("/notas", NotaController.store);
// routes.get("/notas", NotaController.index);
routes.get("/notas", SheetNotaController.show);
routes.post("/sheetsnotas", SheetNotaController.store);
routes.put("/notas", NotaController.update);
routes.post("/notasAlunos", SheetNotaController.adicionarAlunos);

routes.post("/alunos", AlunoController.store);
routes.get("/alunos/:nome", AlunoController.show);
routes.get("/alunos", AlunoController.all);
routes.get("/aluno", AlunoController.index);

routes.get("/historico", HistoricoController.show);


routes.get("/planilhaalunos", SheetAlunosController.show);
module.exports = routes;