import { useState } from 'react';
import './style.scss';

// Creer un composant accordion pour afficher les catégories et les types
const Accordion = ({ title, content, onSelect }) => {
    // Utilisation de hook useState pour gérer l'état d'ouverture/fermeture de l'accordéon.
    const [isOpen, setIsOpen] = useState(false);
    return (
        // Affiche le titre et une icône de flèche.
        // Au clic, bascule l'état isOpen.
        // L'icône change de classe en fonction de l'état isOpen.
        <div className='accordion'>
            <div className="accordion__top" onClick={() => setIsOpen(!isOpen)}>
                <span>{title}</span>
                <img className={isOpen ? "active" : ""} src="/top.svg" alt="Fleche" />
            </div>
        {/* La classe 'active' est ajoutée conditionnellement basée sur isOpen. */}
        {/* Si content est un tableau, chaque élément est rendu comme un paragraphe cliquable. */}
        {/* Si content n'est pas un tableau, il est rendu tel quel. */}
        {/* Chaque élément cliquable appelle onSelect avec sa valeur. */}
            <div className={"accordion__bottom" + (isOpen ? " active" : "")}>
                {Array.isArray(content) ? content.map((categorie, index) => (
                    <p key={index} onClick={() => onSelect(categorie)}>{categorie}</p>
                )) : content}
            </div>
        </div>
    );
};

export default Accordion;