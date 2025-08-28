import express from "express"; //Importa o método express
import userRoutes from "./routes/user.js"//Importa o arquivo de rotas relacionado a usuários

const app = express(); //Cria uma constante para guardar o express

app.use(express.json());// Diz que consegue ler e enviar json.
app.use("/users", userRoutes); //Diz que cada requisição que vier com /users deve ser enviada para userRoutes
app.use("/", (req, res) => res.send("Servidor OK!"));//Caso não tenha requisição, mas a api esteja ativa devolve a resposta (Servidor ok!)



const PORT = 3000;//Cria um constante para guardar a porta em que a nossa api deve rodar
app.listen(PORT, () => { //Faz com que o servidor comece a receber as requisições vindas da porta definida
    console.log(`🚀Servidor rodando em http://localhost:${PORT}`);//Mostra uma mensagem de ok
});