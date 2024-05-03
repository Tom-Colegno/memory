import { useState, useEffect } from 'react';
import Button from '../Button/Button';

function Card() {
    // Définition des données des cartes avec les URL des images à afficher
    const cardsData = [
        { id: 1, value: 'public/assets/images/leo1.png' },
        { id: 2, value: 'public/assets/images/leo2.png' },
        { id: 3, value: 'public/assets/images/leo3.png' },
        { id: 4, value: 'public/assets/images/leo4.png' },
        { id: 5, value: 'public/assets/images/leo5.png' },
        { id: 6, value: 'public/assets/images/leo6.png' },
        { id: 7, value: 'public/assets/images/leo7.png' },
        { id: 8, value: 'public/assets/images/leo8.png' },
        { id: 9, value: 'public/assets/images/leo9.png' },
        { id: 10, value: 'public/assets/images/leo10.png'},
        { id: 11, value: 'public/assets/images/leo11.png' },
        { id: 12, value: 'public/assets/images/leo12.png' },
        { id: 13, value: 'public/assets/images/leo13.png'},
        { id: 14, value: 'public/assets/images/leo14.png' },
        { id: 15, value: 'public/assets/images/leo15.png' },
        { id: 16, value: 'public/assets/images/leo16.png'},
        { id: 17, value: 'public/assets/images/leo17.png' },
        { id: 18, value: 'public/assets/images/leo18.png'},
    ];

    // Dupliquez et mélangez les cartes
    const [cards, setCards] = useState(() => {
        const duplicatedCards = [...cardsData, ...cardsData];
        return duplicatedCards.sort(() => Math.random() - 0.5);
    });

    const [firstCard, setFirstCard] = useState(null);
    const [secondCard, setSecondCard] = useState(null);
    const [matches, setMatches] = useState([]);
    const [gameWon, setGameWon] = useState(false);

    const handleCardClick = (index) => {
        if (firstCard === null) {
            setFirstCard(index);
        } else if (secondCard === null && index !== firstCard) {
            setSecondCard(index);
        }
    };

    useEffect(() => {
        if (firstCard !== null && secondCard !== null) {
            const firstCardValue = cards[firstCard].value;
            const secondCardValue = cards[secondCard].value;

            if (firstCardValue === secondCardValue) {
                // Les cartes correspondent
                setMatches((prev) => [...prev, firstCard, secondCard]);
            }

            // Réinitialiser les cartes sélectionnées après une courte pause
            setTimeout(() => {
                setFirstCard(null);
                setSecondCard(null);
            }, 1000);
        }
    }, [firstCard, secondCard, cards]);

    useEffect(() => {
        if (matches.length === cards.length) {
            setGameWon(true);
        }
    }, [matches, cards]);

    const resetGame = () => {
        const shuffledCards = [...cardsData, ...cardsData].sort(() => Math.random() - 0.5);
        setCards(shuffledCards);
        setFirstCard(null);
        setSecondCard(null);
        setMatches([]);
        setGameWon(false);
    };

    return (
        <div className="memory-game-container">
            {gameWon ? (
                <div>Félicitations ! Vous avez gagné !</div>
            ) : (
                <div className="memory-game">
                    {cards.map((card, index) => (
                        <div
                            key={index}
                            className={`card ${matches.includes(index) || index === firstCard || index === secondCard ? 'flipped' : ''}`}
                            onClick={() => handleCardClick(index)}
                        >
                            <div className="card-inner">
                                <div className="card-front">
                                    {/* Affichage de l'image sur la face avant de la carte */}
                                    <img src={card.value} alt="Image de carte" />
                                </div>
                                <div className="card-back">
                                    {/* Insertion d'un GIF */}
                                    <img src="public/assets/images/metaverse.gif" alt="GIF" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <Button onClick={resetGame} className="reset-button" text="Nouvelle partie" />
        </div>
    );
}

export default Card;