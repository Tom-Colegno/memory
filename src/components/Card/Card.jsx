import React, { useState, useEffect } from 'react';
import Button from '../Button/Button';

function Card() {
    const cardsData = [
        { id: 1, value: '🍎' },
        { id: 2, value: '🍌' },
        { id: 3, value: '🍓' },
        { id: 4, value: '🍒' },
        { id: 5, value: '🍇' },
        { id: 6, value: '🍊' },
        { id: 7, value: '🍋' },
        { id: 8, value: '🍍' },
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
                                <div className="card-front">{card.value}</div>
                                <div className="card-back"></div>
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
