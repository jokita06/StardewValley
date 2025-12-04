import { use, useState } from "react";
import { Camera } from "../Componentes/Camera";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

export function Gallery() {
    const [pictures, setPictures] = useState(() => {
        const savedPictures = localStorage.getItem("pictures");
        return savedPictures ? JSON.parse(savedPictures) : [];
    });

    const addPicture = (newPicture) => {
        const updatedPictures = [newPicture, ...pictures];
        setPictures(updatedPictures);
        localStorage.setItem("pictures", JSON.stringify(updatedPictures));
    };

    const clearPictures = () => {
        if ((confirm("Are you sure you want to clear all pictures?"))) {
            localStorage.removeItem("pictures");
            setPictures([]);
        }
    };

    return (
        <main>
            <Camera onFotoTirada={addPicture}/>
            <button onClick={clearPictures}>Clear Gallery</button>
            
            <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
                {itemData.map((item) => (
                <ImageListItem key={i}>
                    <img
                        src={f}
                        alt={`foto ${i + 1}`}
                        loading="lazy"
                    />
                </ImageListItem>
                ))}
            </ImageList>

        </main>
        
    )
}