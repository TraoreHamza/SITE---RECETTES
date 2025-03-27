import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faBars } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react';
import './header.scss'
import {Link} from 'react-router'; //Correction de l'import

const Header = ({ onSearch }) => {
    // setSearch et setIsOpen sont les fonctions pour mettre à jour ces états respectivement.
    // search : pour stocker la valeur de recherche, initialisée à une chaîne vide.
    const [search, setSearch] = useState('');
    // isOpen : pour gérer l'état d'ouverture/fermeture du menu burger, initialisé à false.
    const [isOpen, setIsOpen] = useState(false); 
    
    // Constante pour ouvrir le menu burger
    // Cette fonction est utilisée pour basculer l'état du menu burger :
    // Si isOpen est true, elle le passe à false, et vice versa.
    // Cela permet d'ouvrir ou fermer le menu burger en inversant sa valeur actuelle
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
    
    // Fonction pour le moteur de recherche
    // Cette fonction gère les changements dans le champ de recherche :
    // e.target.value récupère la valeur actuelle du champ de saisie.
    // setSearch(value) met à jour l'état search avec cette nouvelle valeur.
    // onSearch(value) appelle probablement une fonction passée en prop pour effectuer la recherche avec la nouvelle valeur
    const handleSearch = (e) => {
        const value = e.target.value;
        setSearch(value);
        onSearch(value);
    };
    
    // Fonction pour fermer le menu burger
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
