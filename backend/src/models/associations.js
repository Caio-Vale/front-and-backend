import { Usuario } from "./usuario.js";
import { Tarefa } from "./tarefa.js";

// Um usuário tem muitas tarefas (1:N)
Usuario.hasMany(Tarefa, {
  foreignKey: 'usuario_id'
});

// Uma tarefa pertence a um usuário
Tarefa.belongsTo(Usuario, {
  foreignKey: 'usuario_id',
  as: 'criador'
});
