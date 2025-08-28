//Faz

import { use } from "react";
import { pool } from "../config/db.js"; //Importa o pool (conexões com o banco de dados )

export async function getUsuarios() { //Exporta a função assíncrona getUsuarios

    

    const [rows] = await pool.query("SELECT * FROM usuarios where user_status = 1"); //Guarda na constante/lista rows a resposta do (await) depois da espera (pool.query)
    return rows; //Retorna o resultado


}//Essa função lista todos os usuários.

export async function postUser(user) {//Exporta a função post user e tem como parâmetro user
    const {nome, cpf, dataNas} = user; //Aqui mostra as propriedades do parâmetro (ou seja, os dados exatos que o banco pede para usuários)

    const [result] = await pool.query( // Guarda os resultados dentro da lista result e espera
        "INSERT INTO usuarios (nome, cpf, dataNas) VALUES (?,?,?)",//pede para inserir algo novo na tabela usuários, mostra os dados que vão enviar e depois 
        [nome, cpf, dataNas]//Valores que serão guardados no dicionário
    );

    return {id: result.insertId, ...user} //Retorna as informações fornecidas e o id gerado pelo banco.

}//Essa função adiciona um usuario

export async function switchStatus(userId) {
    const getOneUserResponse = await getOne(userId);

    const user = getOneUserResponse[0];

    var query;
    if(user.user_status == 0)
        query = "update usuarios set user_status = 1 where id = ?"
    else if(user.user_status == 1)
        query = "update usuarios set user_status = 0 where  id = ?"
        
    const [result] = await pool.query(
        query,
        [userId]
    );

    if(result.affectedRows === 0) return null;
    return {id: userId, message: "O usuário teve seu status alterado"  }
}

export async function getOne(userId) { //Exporta a função assíncrona getUsuarios
    const [resultado] = await pool.query(
        "SELECT * FROM usuarios where id = ?",
        [userId]
    );
    return resultado;
}