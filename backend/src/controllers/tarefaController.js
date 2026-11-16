import { 
  listarTarefasSequelize, 
  criarTarefaSequelize, 
  atualizarTarefaSequelize, 
  deletarTarefaSequelize 
} from '../services/tarefaService.js';

export const getTarefas = async (req, res) => {
  try {
    const tarefas = await listarTarefasSequelize(); 
    return res.status(200).json(tarefas);
  } catch (error) {
    console.error('DETALHE DO ERRO:', error);
    return res.status(500).json({ erro: 'Erro ao buscar tarefas.' });
  }
};

export const postTarefa = async (req, res) => {
  try {
    const { titulo, concluido, criadorId } = req.body;
    if (!titulo) {
      return res.status(400).json({ erro: 'O título é obrigatório.' });
    }

    const novaTarefa = await criarTarefaSequelize({ titulo, concluido, criadorId });
    return res.status(201).json(novaTarefa);
  } catch (error) {
    console.error('DETALHE DO ERRO:', error);
    return res.status(500).json({ erro: 'Erro ao criar tarefa.' });
  }
};

export const patchTarefa = async (req, res) => {
  try {
    const { id } = req.params;
    const tarefaAtualizada = await atualizarTarefaSequelize(id, req.body);
    
    if (!tarefaAtualizada) {
      return res.status(404).json({ erro: 'Tarefa não encontrada.' });
    }
    return res.status(200).json(tarefaAtualizada);
  } catch (error) {
    console.error('DETALHE DO ERRO:', error);
    return res.status(500).json({ erro: 'Erro ao atualizar tarefa.' });
  }
};

export const deleteTarefa = async (req, res) => {
  try {
    const { id } = req.params;
    const deletado = await deletarTarefaSequelize(id);
    
    if (!deletado) {
      return res.status(404).json({ erro: 'Tarefa não encontrada.' });
    }
    return res.status(204).send();
  } catch (error) {
    console.error('DETALHE DO ERRO:', error);
    return res.status(500).json({ erro: 'Erro ao excluir tarefa.' });
  }
};
