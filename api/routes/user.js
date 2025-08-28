//pede


import { Router } from "express"; //Importa o objeto router do express para organizar e lidar com rotas
import { cadastrarUsuario, listarUsuarios, mudarStatusUser } from "../controllers/userController.js"; //Importa as funções da controller para saber o que fazer com cada requisição

const router = Router();//Atribuindo a variável router o método Router(); do express 

router.get("/get-all", listarUsuarios);//Criando uma rota de get de listar usuários, mostrando a rota exata da requisição e onde está o que o programa deve fazer
router.post("/insert-user", cadastrarUsuario);//Criando uma rota post para criar um usuário, mostrando a rota exata da requisição e qual função da controller deve ser executada
router.patch("/change-status/:userId", mudarStatusUser);

export default router; //Exportando o arquivo de rotas para qualquer outro que precise dele 

