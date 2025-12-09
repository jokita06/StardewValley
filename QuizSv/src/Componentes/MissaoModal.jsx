import { useState, useEffect, useRef } from "react";
import erro from "../assets/Shade.png";

import sebastian from "../assets/sucesso/Sebastian.png";
import abigail from "../assets/sucesso/Abigail.png";
import alex from "../assets/sucesso/Alex.png";
import elliot from "../assets/sucesso/Elliot.png";
import haley from "../assets/sucesso/Haley.png";
import leah from "../assets/sucesso/Leah.png";
import penny from "../assets/sucesso/Penny.png";
import sam from "../assets/sucesso/Sam.png";
import hervey from "../assets/sucesso/Harvey.png";

// Lista de imagens de recompensa
const imagensSucesso = [sebastian, abigail, alex, elliot, haley, leah, penny, sam, hervey];

export function MissaoModal({ missao, onClose, onConcluir }) {
  const [resposta, setResposta] = useState("");
  const [resultado, setResultado] = useState(null);
  const [status, setStatus] = useState(null);
  const [imagemSorteada, setImagemSorteada] = useState(null);

  // Input e dialog como referências do DOM
  const inputRef = useRef(null);
  const dialogRef = useRef(null);

  // Foca no campo de texto ao abrir o modal
  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

  // Permite fechar com a tecla ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  // Sorteia uma imagem que ainda não foi usada
  const sortearImagem = () => {
    let usadas = JSON.parse(localStorage.getItem("imagensUsadas")) || [];

    // Filtra imagens que ainda não foram sorteadas
    const disponiveis = imagensSucesso.filter((img) => !usadas.includes(img));

    // Se esgotar todas, reinicia
    if (disponiveis.length === 0) {
      usadas = [];
      localStorage.setItem("imagensUsadas", JSON.stringify([]));

      return imagensSucesso[Math.floor(Math.random() * imagensSucesso.length)];
    }

    // Sorteia aleatoriamente entre as disponíveis
    const randomImg = disponiveis[Math.floor(Math.random() * disponiveis.length)];

    usadas.push(randomImg);
    localStorage.setItem("imagensUsadas", JSON.stringify(usadas));

    return randomImg;
  };

  // Verifica se a resposta está correta
  const verificarResposta = () => {
    if (!resposta.trim()) {
      alert("Por favor, digite uma resposta antes de enviar!");
      inputRef.current?.focus();
      return;
    }

    // Resposta correta
    if (resposta.trim().toLowerCase() === missao.respostaCorreta.trim().toLowerCase()) {
      setResultado("Resposta correta! Parabéns!");
      setStatus("sucesso");

      const imagem = sortearImagem();
      setImagemSorteada(imagem);

      // Cria o objeto com a figurinha da missão
      const novaFigurinha = {
        id: missao.id,
        nome: missao.titulo,
        imagem: imagem,
        descricao: missao.descricao,
        respostaCorreta: missao.respostaCorreta,
        dataConquista: new Date().toLocaleDateString("pt-BR"),
        tipo: "missao",
      };

      // Dá um pequeno tempo antes de concluir
      setTimeout(() => {
        onConcluir(missao.id, novaFigurinha);
      }, 1000);

    } else {
      // Resposta incorreta
      setResultado("Resposta incorreta. Tente novamente!");
      setStatus("erro");
      setImagemSorteada(null);
    }
  };

  // Permite enviar com tecla Enter
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') verificarResposta();
  };

  return (
    <dialog 
      open 
      className="modal"
      aria-modal="true"
      ref={dialogRef}
    >
      <h2 className="titulo">{missao.titulo}</h2>
      <p>{missao.descricao}</p>

      {/* Campo onde o usuário digita a resposta */}
      <input
        ref={inputRef}
        className="caixaTexto"
        type="text"
        placeholder="Digite sua resposta..."
        value={resposta}
        onChange={(e) => setResposta(e.target.value)}
        onKeyDown={handleKeyDown}
      />

      <div className="modal-botoes">
        <button onClick={verificarResposta} className="btn-stardew">
          Enviar
        </button>
        <button onClick={onClose} className="btn-stardew">
          Fechar
        </button>
      </div>

      {/* Feedback visual do resultado */}
      {resultado && (
        <div className="resultado" role="alert">
          <p>{resultado}</p>

          {status === "sucesso" && imagemSorteada && (
            <img 
              src={imagemSorteada}
              alt="Figurinha sorteada como recompensa"
              width="100"
            />
          )}

          {status === "erro" && (
            <img 
              src={erro}
              alt="Ícone indicando resposta incorreta"
              width="100"
            />
          )}
        </div>
      )}
    </dialog>
  );
}
