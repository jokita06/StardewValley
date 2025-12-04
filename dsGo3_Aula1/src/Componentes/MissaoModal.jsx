import { useState } from "react";
import sucesso from "../assets/win.png";
import erro from "../assets/raios.png";

export function MissaoModal({ missao, onClose, onConcluir }) {
  const [resposta, setResposta] = useState("");
  const [resultado, setResultado] = useState(null);
  const [status, setStatus] = useState(null);

  const verificarResposta = () => {
    if (!resposta.trim()) {
      alert("Por favor, digite uma resposta antes de enviar!");
      return;
    }

    if (
      resposta.trim().toLowerCase() ===
      missao.respostaCorreta.trim().toLowerCase()
    ) {
      setResultado("Resposta correta! Parabéns!");
      setStatus("sucesso");

      // ✅ Cria a figurinha para o inventário
      const novaFigurinha = {
        id: missao.id,
        nome: missao.titulo,
        imagem: sucesso, // Imagem de sucesso
        descricao: missao.descricao,
        respostaCorreta: missao.respostaCorreta,
        dataConquista: new Date().toLocaleDateString('pt-BR'),
        tipo: "missao"
      };

      // ✅ chama a função de concluir após 1s (tempo para mostrar feedback)
      setTimeout(() => {
        onConcluir(missao.id, novaFigurinha);
      }, 1000);
    } else {
      setResultado("Resposta incorreta. Tente novamente!");
      setStatus("erro");
    }
  };

  return (
    <dialog open className="modal">
      <h2 className="titulo" id="titulo-missao">
        {missao.titulo}
      </h2>
      <p id="descricao-missao">{missao.descricao}</p>
      <input
        className="caixaTexto"
        id="resposta"
        type="text"
        placeholder="Digite sua resposta..."
        value={resposta}
        onChange={(e) => setResposta(e.target.value)}
        required
      />

      <div className="modal-botoes">
        <button onClick={verificarResposta} className="btn-stardew">Enviar</button>
        <button onClick={onClose} className="btn-stardew">Fechar</button>
      </div>

      {resultado && (
        <div className="resultado">
          <p>{resultado}</p>
          {status === "sucesso" && (
            <img
              src={sucesso}
              alt="Missão concluída com sucesso"
              width="100"
            />
          )}
          {status === "erro" && (
            <img
              src={erro}
              alt="Erro na resposta da missão"
              width="100"
            />
          )}
        </div>
      )}
    </dialog>
  );
}
