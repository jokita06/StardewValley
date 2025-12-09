import { useRef, useState, useEffect } from "react";

export function Camera({ onFotoTirada }) {
  // Referências para acessar diretamente os elementos do DOM
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  // Guarda a imagem capturada
  const [foto, setFoto] = useState(null);

  // Inicia a câmera assim que o componente aparece na tela
  useEffect(() => {
    iniciarCamera();

    // Para a câmera quando o componente for desmontado
    return () => pararCamera();
  }, []);

  // Solicita permissão e ativa a câmera
  const iniciarCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      streamRef.current = stream;

      if (videoRef.current) videoRef.current.srcObject = stream;
    } catch (error) {
      console.error("Erro ao acessar a câmera:", error);
    }
  };

  // Encerra todas as streams da câmera
  const pararCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
  };

  // Captura um frame do vídeo e transforma em imagem PNG
  const tirarFoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Ajusta o canvas ao tamanho real do vídeo
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Copia a imagem do vídeo para o canvas
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Converte para base64
    const imagem = canvas.toDataURL("image/png");
    setFoto(imagem);

    // Para a câmera depois da foto
    pararCamera();

    // Envia a foto para o componente pai
    onFotoTirada(imagem);
  };

  // Permite tirar outra foto
  const reiniciar = () => {
    setFoto(null);
    iniciarCamera();
  };

  return (
    <section className="camera-panel">
      <h2 className="painel-title">Captura de Imagem</h2>

      <div className="preview">
        {/* Se ainda não tirou foto, mostra o vídeo; caso contrário, mostra a imagem */}
        {!foto ? (
          <video ref={videoRef} autoPlay playsInline aria-label="Fluxo da câmera" />
        ) : (
          <img src={foto} alt="Foto capturada" />
        )}
      </div>

      <div className="botoes">
        {!foto ? (
          <button type="button" onClick={tirarFoto} className="btn-stardew">
            Tirar Foto
          </button>
        ) : (
          <button type="button" onClick={reiniciar} className="btn-stardew">
            Nova Foto
          </button>
        )}
      </div>

      {/* Canvas invisível apenas para capturar a imagem */}
      <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
    </section>
  );
}
