// Conecta o banco com a api
import mysql from "mysql2/promise"; //Importa a biblioteca no node que permite que o programa interaja com o mySQL
//mysql é apelido

import dotenv  from "dotenv";

dotenv.config();

console.log("USER:", process.env.DB_USER);
console.log("HOST:", process.env.DB_HOST);
console.log("PASS:", process.env.DB_PASS);
console.log("DATABASE:", process.env.DATABASE);

export const pool = mysql.createPool({//Cria e exporta uma constante que possui as conexões necessárias para se conectar com o banco de dados.
    //Dados necessários para conectar com o banco de dados 
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DATABASE
});

