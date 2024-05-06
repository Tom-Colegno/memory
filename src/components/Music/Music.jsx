import React, { useEffect, useRef } from 'react';

function BackgroundMusic() {
    // Utilisez useRef pour accéder à l'élément audio
    const audioRef = useRef(null);

    useEffect(() => {
        // Vous pouvez utiliser l'audioRef pour configurer l'élément audio
        const audio = audioRef.current;
        if (audio) {
            audio.autoplay = true; // Jouer automatiquement
            audio.loop = true; // Jouer en boucle
            audio.play().catch(err => {
                console.error('Erreur lors de la lecture de la musique de fond:', err);
            });
        }
    }, []);

    // Rendre l'élément audio
    return (
        <audio ref={audioRef}>
            <source src="https://www.youtube.com/watch?v=m86mBRKZHY0" type="audio/mpeg" />
            Votre navigateur ne supporte pas l'audio HTML.
        </audio>
    );
}

export default BackgroundMusic;
