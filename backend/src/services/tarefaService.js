import { pool } from '../config/bancoDeDados.js';
import { Tarefa } from '../models/tarefa.js';
import { Usuario } from '../models/usuario.js';

export const listarTarefas = async () => {
  const resultado = await pool.query(
    'SELECT * FROM tarefas'
  );

  // Array com os registros do banco
  return resultado.rows;
};

export const buscarPorUsuario = async (usuarioId) => {
  const query =
    'SELECT * FROM tarefas WHERE usuario_id = $1';

  const { rows } = await pool.query(query,[usuarioId]);

  return rows;
};

export const obterTarefasComUsuario = async () => {
  const query = 'SELECT tarefas.id, tarefas.titulo, tarefas.concluido, usuario.nome AS usuario_nome FROM tarefas INNER JOIN usuario ON tarefas.usuario_id = usuario.id';

  const { rows } = await pool.query(query);
  return rows;
};

export const listarTarefasSequelize = async () => {
  return await Tarefa.findAll({
    attributes: ['id', 'titulo', 'concluido'],
    include: [{
      model: Usuario,
      as: 'criador',
      attributes: ['id', 'nome', 'email'],
      required: true
    }]
  });
};

export const criarTarefaSequelize = async ({ titulo, concluido, criadorId }) => {
  // Nota: Confirme no seu model Tarefa se a chave estrangeira se chama 'criadorId' ou 'usuarioId'
  const novaTarefa = await Tarefa.create({
    titulo,
    concluido: concluido ?? false,
    usuario_id: Number(criadorId) 
  });
  return novaTarefa;
};

export const atualizarTarefaSequelize = async (id, dados) => {
  const tarefa = await Tarefa.findByPk(id);
  if (!tarefa) return null;
  
  await tarefa.update(dados);
  return tarefa;
};

export const deletarTarefaSequelize = async (id) => {
  const tarefa = await Tarefa.findByPk(id);
  if (!tarefa) return false;
  
  await tarefa.destroy();
  return true;
};
