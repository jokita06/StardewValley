import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

export default function ImageGallery({ fotos }) {
  // Exibe a lista de fotos em grade usando o componente do MUI
  return (
    <ImageList
      sx={{
        width: "100%",
        maxWidth: 650,
        maxHeight: 400,
        margin: "0 auto",
      }}
      cols={3}   // quantidade de colunas
      gap={12}   // espaçamento entre as imagens
    >
      {fotos.map((foto, index) => (
        <ImageListItem key={index}>
          {/* Cada imagem da galeria */}
          <img
            src={foto}
            alt={`Foto ${index}`}
            loading="lazy"
            className="card-photo"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}
