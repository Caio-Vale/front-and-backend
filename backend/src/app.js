import { listarTarefas,buscarPorUsuario, obterTarefasComUsuario } from './services/tarefaService.js';
import express from 'express';
import './models/associations.js'; // Obrigatório para o JOIN com 'criador' funcionar
import tarefaRoutes from './routers/tarefaRoutes.js';

const app = express();
app.use(express.json());

app.use(tarefaRoutes);

const PORTA = 3000;

async function iniciarServidor() {
  try {
    // Testa a conexão e cria as tabelas no Postgres caso ainda não existam
    console.log('Banco de dados conectado e tabelas sincronizadas!');

    app.listen(PORTA, () => {
      console.log(`Servidor rodando em http://localhost:${PORTA}/tarefas`);
    });
  } catch (erro) {
    console.error('Erro ao iniciar o servidor:', erro);
  }
}

iniciarServidor();

async function testarConsultas() {
  try {
    console.log('--- 1. Todas as tarefas ---');
    const todas = await listarTarefas();
    console.log(todas);

    console.log('\n--- 2. Tarefas do usuário 1 ---');
    const doUsuario = await buscarPorUsuario(1);
    console.log(doUsuario);

    console.log('\n--- 3. Tarefas com nome do usuário (JOIN) ---');
    const comUsuario = await obterTarefasComUsuario();
    console.log(comUsuario);

  } catch (erro) {
    console.error('Erro ao executar consulta:', erro);
  }
}

//testarConsultas();
