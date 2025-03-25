import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react';
import './header.scss'
import {Link} from 'react-router'; //Correction de l'import

const Header = ({ onSearch, onClose }) => {
    const [search, setSearch] = useState('');
    const [isOpen, setIsOpen] = useState(false); 

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearch(value);
        onSearch(value);
    };

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
        <svg className='svg' onClick={toggleMenu} id="burger" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path d="M0 64H448v64H0V64zM0 224H448v64H0V224zM448 384v64H0V384H448z" />
        </svg>
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
