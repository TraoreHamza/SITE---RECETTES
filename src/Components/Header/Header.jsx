import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faBars } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react';
import './header.scss'
import {Link} from 'react-router'; //Correction de l'import

const Header = ({ onSearch }) => {
    const [search, setSearch] = useState('');
    const [isOpen, setIsOpen] = useState(false); 
    
    // Constante pour ouvrir le menu burger
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
    
    // Fonction pour le moteur de recherche
    const handleSearch = (e) => {
        const value = e.target.value;
        setSearch(value);
        onSearch(value);
    };
    
    // Constante pour fermer le menu burger
    const handleClose = () => {
        setIsOpen(false);
    }
    return (
        <>
        <header className='header'>
            <div>RECETTES.</div>
             <div>
                <input className='input'
                    type="text"
                    placeholder="Rechercher une recette..."
                    value={search}
                    onChange={handleSearch}
                />
            </div>
            <nav >
                <ul>
                    <li><Link to="/">Accueil</Link></li>
                    <li><Link to="#">Contact</Link></li>
                    <li><Link to="/add">Ajouter une recette</Link></li>
                    <li className='fav'><Link to="/favories">♡</Link></li>
                </ul>
            </nav>
        <span className='svg' onClick={toggleMenu} id="burger"><FontAwesomeIcon icon={faBars} /></span>
        </header>
        <div className={`header-mobile${isOpen ? ' open' : ''}`}>
            <FontAwesomeIcon icon={faTimes} className='icon' onClick={handleClose}/>
           <div>
                <input
                    type="text"
                    placeholder="Rechercher une recette..."
                    value={search}
                    onChange={handleSearch}
                />
            </div>
            <ul>
                <li><Link to="/">Accueil</Link></li>
                <hr />
                <li><Link to="#">Contact</Link></li>
                <hr />
                <li><Link to="/add">Ajouter une recette</Link></li>
                <hr />
                <li><Link to="/favories">Favoris</Link></li>
                <hr />
            </ul>
        </div>
        </>
    );
};

export default Header;
