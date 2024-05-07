import { useState, useEffect } from 'react';
import Button from '../Button/Button';

const cardsData = [
    { id: 1, value: ('./src/assets/images/leo1.png') },
    { id: 2, value: ('./src/assets/images/leo2.png') },  
    { id: 3, value: ('./src/assets/images/leo3.png') },
    { id: 4, value: ('./src/assets/images/leo4.png') },
    { id: 5, value: ('./src/assets/images/leo5.png') },
    { id: 6, value: ('./src/assets/images/leo6.png') },
    { id: 7, value: ('./src/assets/images/leo7.png') },
    { id: 8, value: ('./src/assets/images/leo8.png') },
    { id: 9, value: ('./src/assets/images/leo9.png') },
    { id: 10, value: ('./src/assets/images/leo10.png') },
    { id: 11, value: ('./src/assets/images/leo11.png') },
    { id: 12, value: ('./src/assets/images/leo12.png') },
    { id: 13, value: ('./src/assets/images/leo13.png') },
    { id: 14, value: ('./src/assets/images/leo14.png') },
    { id: 15, value: ('./src/assets/images/leo15.png') },
    { id: 16, value: ('./src/assets/images/leo16.png') },
    { id: 17, value: ('./src/assets/images/leo17.png') },
    { id: 18, value: ('./src/assets/images/leo18.png') },
];

function Card() {
    const [cards, setCards] = useState(() => {
        const duplicatedCards = [...cardsData, ...cardsData];
        return duplicatedCards.sort(() => Math.random() - 0.5);
    });

    const [selectedCards, setSelectedCards] = useState({});
    const [matches, setMatches] = useState([]);
    const [gameWon, setGameWon] = useState(false);
    const [lockCards, setLockCards] = useState(false); // Nouvel état pour verrouiller les cartes

    // Fonction de gestion du clic sur une carte
    const handleCardClick = (index) => {
        // Ne pas autoriser de retourner de carte si les cartes sont verrouillées ou déjà sélectionnées
        if (lockCards || selectedCards[index]) {
            return;
        }

        // Ajouter la carte à `selectedCards`
        setSelectedCards((prev) => ({ ...prev, [index]: true }));
    };

    // Effet pour vérifier si le jeu est gagné
    useEffect(() => {
        if (matches.length === cards.length) {
            setGameWon(true);
        }
    }, [matches, cards]);

    // Effet pour traiter les cartes sélectionnées
    useEffect(() => {
        if (Object.keys(selectedCards).length === 2) {
            // Verrouiller les cartes pendant que nous traitons les cartes sélectionnées
            setLockCards(true);

            const [firstIndex, secondIndex] = Object.keys(selectedCards);
            const firstCardValue = cards[firstIndex].value;
            const secondCardValue = cards[secondIndex].value;

            // Vérifier si les cartes correspondent
            if (firstCardValue === secondCardValue) {
                setMatches((prev) => [...prev, parseInt(firstIndex), parseInt(secondIndex)]);
            }

            // Réinitialiser `selectedCards` et déverrouiller les cartes après une courte pause
            setTimeout(() => {
                setSelectedCards({});
                setLockCards(false);
            }, 1000);
        }
    }, [selectedCards, cards]);

    // Fonction pour réinitialiser le jeu
    const resetGame = () => {
        setCards(() => {
            const duplicatedCards = [...cardsData, ...cardsData];
            return duplicatedCards.sort(() => Math.random() - 0.5);
        });
        setSelectedCards({});
        setMatches([]);
        setGameWon(false);
        setLockCards(false); // Réinitialiser le verrou des cartes
    };

    return (
        <div className="memory-game-container">
            {gameWon ? (
                <div className="win">Félicitations! Vous avez gagné!</div>
            ) : (
                <div className="memory-game">
                    {cards.map((card, index) => (
                        <div
                            key={index}
                            className={`card ${selectedCards[index] || matches.includes(index) ? 'flipped' : ''}`}
                            onClick={() => handleCardClick(index)}
                        >
                            <div className="card-inner">
                                <div className="card-front" style={{ display: selectedCards[index] || matches.includes(index) ? 'block' : 'none' }}>
                                    <img src={card.value} alt="Image de carte" />
                                </div>
                                <div className="card-back" style={{ display: selectedCards[index] || matches.includes(index) ? 'none' : 'block' }}>
                                    <img src="/src/assets/images/metaverse.gif" alt="GIF" />
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