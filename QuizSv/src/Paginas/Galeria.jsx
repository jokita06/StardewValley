import { useState } from "react";
import { Camera } from "../Componentes/Camera";
import ImageGallery from "../Componentes/ImageGallery";

export function Galeria() {
  // Estado para armazenar as fotos tiradas, carregando do localStorage
  const [pictures, setPictures] = useState(() => {
    const saved = localStorage.getItem("pictures");
    return saved ? JSON.parse(saved) : [];
  });

  // Adiciona uma nova foto à galeria
  const addPicture = (newPicture) => {
    const updated = [newPicture, ...pictures]; // Nova foto no início
    setPictures(updated);
    localStorage.setItem("pictures", JSON.stringify(updated));
  };

  // Remove todas as fotos da galeria
  const clearPictures = () => {
    if (confirm("Tem certeza que deseja apagar todas as fotos?")) {
      localStorage.removeItem("pictures");
      setPictures([]);
    }
  };

  return (
    <main className="galeria-wrapper" aria-label="Galeria de fotos" role="main">
      <section
        className="painel-horizontal"
        role="region"
        aria-label="Área da galeria"
        style={{
          justifyContent: pictures.length > 0 ? "space-between" : "center"
        }}
      >
        {/* Painel da câmera para tirar novas fotos */}
        <section className="camera-lado" role="region" aria-label="Seção da câmera">
          <Camera onFotoTirada={addPicture} />
        </section>

        {/* Painel da galeria - só aparece se houver fotos */}
        {pictures.length > 0 && (
          <section 
            className="gallery-panel gallery-side"
            role="region"
            aria-labelledby="galeria-titulo"
          >
            <header role="heading" aria-level="2">
              <h2 id="galeria-titulo" className="painel-title">Suas Fotos</h2>
            </header>

            <ImageGallery fotos={pictures} />

            <button
              onClick={clearPictures}
              className="btn-stardew btn-clear"
              style={{ marginTop: "20px" }}
              role="button"
            >
              Limpar Galeria
            </button>
          </section>
        )}
      </section>
    </main>
  );
}