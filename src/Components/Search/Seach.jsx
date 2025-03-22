// import React, { useState, useEffect } from 'react';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faSearch } from "@fortawesome/free-solid-svg-icons";

// const SearchBar = ({ recipes, onSearch }) => {
//     const [query, setQuery] = useState('');
//     const [suggestions, setSuggestions] = useState([]);

//     useEffect(() => {
//         if (query.length > 1) {
//             const filteredSuggestions = recipes.filter(recipe =>
//                 recipe.name.toLowerCase().includes(query.toLowerCase())
//             ).slice(0, 5); // Limiter à 5 suggestions
//             setSuggestions(filteredSuggestions);
//         } else {
//             setSuggestions([]);
//         }
//     }, [query, recipes]);

//     const handleSearch = (searchQuery) => {
//         setQuery(searchQuery);
//         onSearch(searchQuery);
//     };

//     return (
//         <div className="search-bar">
          
//             {suggestions.length > 0 && (
//                 <ul className="suggestions">
//                     {suggestions.map(recipe => (
//                         <li key={recipe.id} onClick={() => handleSearch(recipe.name)}>
//                             {recipe.name}
//                         </li>
//                     ))}
//                 </ul>
//             )}
//         </div>
//     );
// };

// export default SearchBar;
