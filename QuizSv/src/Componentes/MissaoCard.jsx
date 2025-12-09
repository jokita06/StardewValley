export function MissaoCard({ missao, onIniciarMissao, concluida }) {
  return (
    <article className='missao-card'>
      {/* Título e texto da missão */}
      <h3 id={missao.id}>{missao.titulo}</h3>
      <p>{missao.missao}</p>

      {/* Botão muda o texto e bloqueia quando já concluída */}
      <button 
        onClick={() => onIniciarMissao(missao)} 
        className="btn-stardew"
        disabled={concluida}
      >
        {concluida ? "Missão concluída" : "Iniciar Missão"}
      </button>
    </article>
  )
}
