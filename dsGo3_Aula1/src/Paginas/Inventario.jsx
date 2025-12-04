import { useEffect, useState } from "react";

export function Inventario() {
  const [figurinhas, setFigurinhas] = useState([]);

  useEffect(() => {
    // Carrega o inventário salvo no localStorage ao abrir a página
    const armazenado = JSON.parse(localStorage.getItem("inventario")) || [];
    setFigurinhas(armazenado);
  }, []);

  // Atualiza o inventário quando o localStorage muda
  useEffect(() => {
    const handleStorageChange = () => {
      const armazenado = JSON.parse(localStorage.getItem("inventario")) || [];
      setFigurinhas(armazenado);
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const limparInventario = () => {
    if (!window.confirm("Deseja realmente limpar o inventário?")) return;
    localStorage.removeItem("inventario");
    setFigurinhas([]);
  };

  return (
    <main className="conteiner">
      <section className="inventario">
        <h2>Inventário</h2>
        <button className="limpar-inventario" onClick={limparInventario}>
          Limpar Inventário
        </button>

        {figurinhas.length === 0 ? (
          <p className="vazio">Nenhuma figurinha coletada ainda!</p>
        ) : (
          <div className="grid">
            {figurinhas.map((f) => (
              <div key={f.id} className="figurinha">
                <img src={f.imagem} alt={f.nome} />
                <div className="figurinha-info">
                  <h3>{f.nome}</h3>
                  <p>{f.descricao}</p>
                  {f.dataConquista && (
                    <small>Conquistada em: {f.dataConquista}</small>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
