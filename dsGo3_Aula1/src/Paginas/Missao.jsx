import { useState, useEffect } from "react";
import { missoes } from '../Dados/dadosMissao';
import { MissaoCard } from '../Componentes/MissaoCard';
import { MissaoModal } from '../Componentes/MissaoModal';

export function Missao() {
  const [missaoSelecionada, setMissaoSelecionada] = useState(null);
  const [missoesConcluidas, setMissoesConcluidas] = useState([]); 

  // Carrega missões concluídas do localStorage ao iniciar
  useEffect(() => {
    const missoesSalvas = JSON.parse(localStorage.getItem("missoesConcluidas")) || [];
    setMissoesConcluidas(missoesSalvas);
  }, []);

  // Salva missões concluídas no localStorage sempre que atualizar
  useEffect(() => {
    localStorage.setItem("missoesConcluidas", JSON.stringify(missoesConcluidas));
  }, [missoesConcluidas]);

  const concluirMissao = (missaoId, figurinha) => {
    // Adiciona a missão às concluídas
    setMissoesConcluidas((prev) => {
      const novasMissoes = [...prev, missaoId];
      return novasMissoes;
    });

    // Salva a figurinha no inventário
    if (figurinha) {
      const inventarioAtual = JSON.parse(localStorage.getItem("inventario")) || [];
      
      // Verifica se a figurinha já existe para evitar duplicatas
      const figurinhaExistente = inventarioAtual.find(f => f.id === missaoId);
      if (!figurinhaExistente) {
        const novoInventario = [...inventarioAtual, figurinha];
        localStorage.setItem("inventario", JSON.stringify(novoInventario));
      }
    }

    setMissaoSelecionada(null);
  };

  const abrirMissao = (missao) => {
    if (missoesConcluidas.includes(missao.id)) {
      alert("Esta missão já foi concluída!");
      return;
    }
    setMissaoSelecionada(missao);
  };

  return (
    <section className='conteiner'>
      <h2>Missões</h2>
      
      {/* Contador de progresso */}
      <div className="progresso-missoes">
        <p>
          Progresso: {missoesConcluidas.length} de {missoes.length} missões concluídas
        </p>
        <div className="barra-progresso">
          <div 
            className="progresso-preenchido"
            style={{ width: `${(missoesConcluidas.length / missoes.length) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="missoes-grid">
        {missoes.map((m) => (
          <MissaoCard
            key={m.id} 
            missao={m}  
            onIniciarMissao={() => abrirMissao(m)} 
            concluida={missoesConcluidas.includes(m.id)} 
          />
        ))}
      </div>

      {missaoSelecionada && (
        <MissaoModal 
          missao={missaoSelecionada} 
          onClose={() => setMissaoSelecionada(null)} 
          onConcluir={concluirMissao} 
        />
      )}
    </section>
  );
}
