//Valída 

import { response } from "express";
import { getUsuarios, postUser, switchStatus } from "../services/userService.js"; //Aqui eu estou importando as funções get e post criadas na services

export async function listarUsuarios(request, response) {//Função não valída pq não recebe dados do usuário
    try{
        const users = await getUsuarios();//A função pede os usuários e aguarda uma resposta
        response.json(users);//Retornando um json com os usuários
    }catch(err){//Mostra um erro
        console.error(err);
        response.status(500).json({erro: "Erro ao buscar usuário!"}); //erro interno
    }
};

export async function cadastrarUsuario(req, res) {
    try {
        const user = req.body;//A constante recebe o corpo da requisição (Guarda os dados que foram enviados pelo cliente)

        if(user == null){ //Verifica se os dados necessários foram fornecidos
            return res.status(400).json({//Retorna uma mensagem caso dê erro
                erro: "Dados do usuário não fornecidos."
            });
        }

        const resultado = await postUser(user); //espera enviar o usuário 
        res.status(201).json(resultado);//Volta um resultado em json
    } catch (err) {
        console.error(err);
        res.status(500).json({erro: "Erro ao cadastrar usuário", detalhes: err.message});//Caso dê algum erro ao enviar
        
    }
};

export async function mudarStatusUser(req, res) {
    try{
        const {userId} = req.params;

        if(userId == null || userId == 0)
            return res.status(400).json({erro: "Id do usuário não informado."})

        const resultado = await switchStatus(userId);

        if (resultado == null){
            return res
                .status(404)
                .json({
                    erro: `Nenhum usuário encontrado com o id ${userId}`
                });
        }

        console.log(userId);
        return res.status(200).json(resultado);

    }catch(err){
        console.error(err);
        res.status(500).json({erro: `Erro ao inativar o usuário com id ${req.params.userId}`, detalhes: err.message});
    }
}