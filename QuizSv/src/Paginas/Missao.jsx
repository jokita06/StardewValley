import { useState, useEffect } from "react";
import { missoes } from '../Dados/dadosMissao';
import { MissaoCard } from '../Componentes/MissaoCard';
import { MissaoModal } from '../Componentes/MissaoModal';

export function Missao() {

  // Estado para controlar quais missões foram concluídas
  // Carrega diretamente do localStorage na inicialização
  const [missoesConcluidas, setMissoesConcluidas] = useState(() => {
    const salvo = localStorage.getItem("missoesConcluidas");
    return salvo ? JSON.parse(salvo) : [];
  });

  const [missaoSelecionada, setMissaoSelecionada] = useState(null);

  // Salva no localStorage sempre que as missões concluídas mudam
  useEffect(() => {
    localStorage.setItem("missoesConcluidas", JSON.stringify(missoesConcluidas));
  }, [missoesConcluidas]);

  // Função para marcar uma missão como concluída
  const concluirMissao = (missaoId, figurinha) => {
    // Adiciona a missão à lista de concluídas
    setMissoesConcluidas((prev) => {
      if (prev.includes(missaoId)) return prev; // Evita duplicação
      return [...prev, missaoId];
    });

    // Se a missão dá uma figurinha, salva no inventário
    if (figurinha) {
      const inventarioAtual = JSON.parse(localStorage.getItem("inventario")) || [];
      const figurinhaExistente = inventarioAtual.find(f => f.id === missaoId);

      if (!figurinhaExistente) {
        const novoInventario = [...inventarioAtual, figurinha];
        localStorage.setItem("inventario", JSON.stringify(novoInventario));
      }
    }

    setMissaoSelecionada(null); // Fecha o modal
  };

  // Abre o modal da missão selecionada
  const abrirMissao = (missao) => {
    // Verifica se a missão já foi concluída
    if (missoesConcluidas.includes(missao.id)) {
      alert("Esta missão já foi concluída!");
      return;
    }
    setMissaoSelecionada(missao);
  };

  // Reseta todo o progresso das missões
  const resetarMissoes = () => {
    const confirmar = window.confirm("Tem certeza que deseja resetar todas as missões?");
    if (!confirmar) return;

    setMissoesConcluidas([]);
    localStorage.removeItem("missoesConcluidas");
  };

  return (
    <section className='conteiner' aria-label="Seção de missões">
      <div className="header-page">
        <h2>Missões</h2>
        <div>
          <button className="btn-stardew" onClick={resetarMissoes}>
            Resetar Missões
          </button>
        </div>
      </div>

      {/* Barra de progresso visual */}
      <div className="progresso-missoes" role="status" aria-live="polite">
        <p>
          Progresso: {missoesConcluidas.length} de {missoes.length} missões concluídas
        </p>
        <div 
          className="barra-progresso"
          role="progressbar"
          aria-valuenow={missoesConcluidas.length}
          aria-valuemin="0"
          aria-valuemax={missoes.length}
        >
          <div
            className="progresso-preenchido"
            style={{ width: `${(missoesConcluidas.length / missoes.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Grid com todas as missões disponíveis */}
      <div className="missoes-grid" role="list">
        {missoes.map((m) => (
          <MissaoCard
            key={m.id}
            missao={m}
            onIniciarMissao={() => abrirMissao(m)}
            concluida={missoesConcluidas.includes(m.id)}
          />
        ))}
      </div>

      {/* Modal que aparece quando uma missão é selecionada */}
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