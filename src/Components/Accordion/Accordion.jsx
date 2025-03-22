import { useState } from 'react';
import './style.scss';

// Creer un composant accordion pour afficher les catégories et les types
const Accordion = ({ title, content, onSelect }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className='accordion'>
            <div className="accordion__top" onClick={() => setIsOpen(!isOpen)}>
                <span>{title}</span>
                <img className={isOpen ? "active" : ""} src="/top.svg" alt="Fleche" />
            </div>
            <div className={"accordion__bottom" + (isOpen ? " active" : "")}>
                {Array.isArray(content) ? content.map((categorie, index) => (
                    <p key={index} onClick={() => onSelect(categorie)}>{categorie}</p>
                )) : content}
            </div>
        </div>
    );
};

export default Accordion;