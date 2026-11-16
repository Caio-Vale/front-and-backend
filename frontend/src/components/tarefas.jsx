import { useEffect, useState } from 'react';

function ListaDeTarefas() {
  const [tarefas, setTarefas] = useState([]);
  const [novoTitulo, setNovoTitulo] = useState('');
  const [criadorId, setCriadorId] = useState(1);

  // 1. GET - Carrega a lista ao abrir a página
  const carregarTarefas = () => {
    fetch('http://localhost:3000/tarefas')
      .then(resposta => resposta.json())
      .then(data => setTarefas(data))
      .catch(erro => console.error("Erro ao buscar tarefas:", erro));
  };

  useEffect(() => {
    carregarTarefas();
  }, []);

  // 2. POST - Envia os dados do formulário para criar nova tarefa
  const adicionarTarefa = async (e) => {
    e.preventDefault();
    if (!novoTitulo.trim()) return;

    try {
      const resposta = await fetch('http://localhost:3000/tarefas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          titulo: novoTitulo,
          concluido: false,
          criadorId: Number(criadorId)
        })
      });

      if (resposta.ok) {
        setNovoTitulo(''); // Limpa o campo de texto
        carregarTarefas(); // Atualiza a lista na tela
      } else {
        alert('Erro ao salvar a tarefa. Verifique o console do back-end.');
      }
    } catch (erro) {
      console.error("Erro ao criar tarefa:", erro);
    }
  };

  

  return (
    <div style={{ background: "#1725752f", borderRadius: "15px", padding: "20px" }}>
      
      {/* Formulário para criar tarefa */}
      <form onSubmit={adicionarTarefa} style={{ marginBottom: "20px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
        <input
          type="text"
          placeholder="Título da nova tarefa..."
          value={novoTitulo}
          onChange={(e) => setNovoTitulo(e.target.value)}
          style={{ padding: "10px", borderRadius: "8px", border: "1px solid #ccc", flex: "1", minWidth: "200px" }}
        />
        
        <select 
          value={criadorId} 
          onChange={(e) => setCriadorId(e.target.value)}
          style={{ padding: "10px", borderRadius: "8px", border: "1px solid #ccc" }}
        >
          <option value={1}>Ana Silva (ID: 1)</option>
          <option value={2}>Pedro Costa (ID: 2)</option>
          <option value={3}>Anaaaa Silva (ID: 3)</option>
        </select>

        <button 
          type="submit" 
          style={{ padding: "10px 20px", borderRadius: "8px", border: "none", background: "#2e7d32", color: "white", cursor: "pointer", fontWeight: "bold" }}
        >
          + Adicionar
        </button>
      </form>

      {/* Lista de cartões */}
      <ul style={{ display: "flex", listStyle: "none", flexWrap: "wrap", padding: 0 }}>
        {tarefas.map(tarefa => (
          <li key={tarefa.id}>
            <div style={{ 
              background: tarefa.concluido ? "#3d5a45" : "#5e5e5e", 
              color: "white", 
              padding: "15px", 
              margin: "10px", 
              width: "250px", 
              display: "flex", 
              flexDirection: "column", 
              justifyContent: "space-between",
              borderRadius: "15px" 
            }}>
              <div>
                <h2 style={{ margin: "0 0 10px 0", fontSize: "1.2rem", textDecoration: tarefa.concluido ? "line-through" : "none" }}>
                  {tarefa.titulo}
                </h2>
                
                <p style={{ margin: "5px 0" }}>
                  <strong>Status: </strong> 
                  {tarefa.concluido ? "✅ Concluída" : "⏳ Pendente"}
                </p>
                
                <div style={{ marginTop: "10px", paddingTop: "10px", borderTop: "1px solid #ffffff3b", fontSize: "0.9rem" }}>
                  <p style={{ margin: "2px 0" }}>
                    <strong>Criador: </strong> {tarefa.criador?.nome}
                  </p>
                  <p style={{ margin: "2px 0", color: "#dcdcdc" }}>
                    {tarefa.criador?.email}
                  </p>
                </div>
              </div>

              <div style={{ display: "flex", gap: "8px", marginTop: "15px" }}>
                <button
                  onClick={() => alternarConclusao(tarefa)}
                  style={{
                    flex: 1,
                    padding: "8px",
                    borderRadius: "8px",
                    border: "none",
                    background: tarefa.concluido ? "#ed6c02" : "#1976d2",
                    color: "white",
                    cursor: "pointer",
                    fontWeight: "bold"
                  }}
                >
                  {tarefa.concluido ? "Reabrir" : "Concluir"}
                </button>

                <button
                  onClick={() => excluirTarefa(tarefa.id)}
                  style={{
                    padding: "8px 12px",
                    borderRadius: "8px",
                    border: "none",
                    background: "#d32f2f",
                    color: "white",
                    cursor: "pointer",
                    fontWeight: "bold"
                  }}
                >
                  Excluir
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListaDeTarefas;
