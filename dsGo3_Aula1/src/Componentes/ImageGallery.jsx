import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

export default function ImageGallery({ fotos }) {
  return (
    <ImageList sx={{ width: 600, maxHeight: 450 }} cols={3} gap={8}>
      {fotos.map((foto, index) => (
        <ImageListItem key={index}>
          <img
            src={foto}
            alt={`Foto ${index}`}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}
