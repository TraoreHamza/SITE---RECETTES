import React from 'react';
import { useState } from 'react';
import './header.scss'
import {Link} from 'react-router';

const Header = ({ onSearch }) => {
    const [search, setSearch] = useState('');

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearch(value);
        onSearch(value);
    };

    return (
        <>
        <header className='header'>
            <nav>
                <div>RECETTES.</div>
                <input
                    type="text"
                    placeholder="Rechercher une recette..."
                    value={search}
                    onChange={handleSearch}
                />
                <ul>
                    <li><Link to="/">Accueil</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                    <li><Link to="#">Ajouter une recette</Link></li>
                    <li><Link to="/favories">♡</Link></li>
                </ul>
            </nav>
        </header>
        </>
    );
};

export default Header;