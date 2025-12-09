import { useEffect, useState } from "react";

export function Inventario() {
  const [figurinhas, setFigurinhas] = useState([]);

  // Carrega as figurinhas do localStorage quando o componente é montado
  useEffect(() => {
    const armazenado = JSON.parse(localStorage.getItem("inventario")) || [];
    setFigurinhas(armazenado);
  }, []);

  // Escuta mudanças no localStorage de outras abas/componentes
  useEffect(() => {
    const handleStorageChange = () => {
      const armazenado = JSON.parse(localStorage.getItem("inventario")) || [];
      setFigurinhas(armazenado);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Limpa todo o inventário
  const limparInventario = () => {
    if (!window.confirm("Tem certeza que deseja limpar todo o inventário?")) return;

    localStorage.removeItem("inventario");
    setFigurinhas([]);
  };

  return (
    <main className="conteiner">
      <section className="inventario">
        <header className="header-page">
          <h2>Inventário</h2>
          {figurinhas.length > 0 && (
            <div>
              <button className="btn-stardew" onClick={limparInventario}>
                Limpar Inventário
              </button>
            </div>
          )}
        </header>

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