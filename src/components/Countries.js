import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "./Card";

const Countries = () => {
    // pour affichage de pays
  const [data, setData] = useState([]);
    // progressbar determinant les nombres de pays à afficher
  const [rangeValue, setRangeValue] = useState(36)
    // pour filtrer les pays par continents
  const [selectedRadio, setSelectedRadio] = useState("");
    // Pour le bouton radio pour chaque continent
  const radios = ["Africa", "America", "Asia", "Europe", "Oceania"]

  // le useEffect se joue lorque le composant est monté
  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((res) => setData(res.data));
  }, []);

  return (
    <div className="countries">
      {/* progressBar */}
      <ul className="radio-container">
        <input 
        type="range" 
        min="1" 
        max="250" 
        defaultValue={rangeValue} 
        onChange={(e) => setRangeValue(e.target.value)} />
      
      {/* input de type radio pour ranger les pays par continent */}
      {radios.map((continent) => ( 
         <li>
            <input 
            type="radio" 
            id={continent} 
            name="continentRadio" 
            onChange={(e) => setSelectedRadio(e.target.id)} />
            <label htmlFor={continent}>{continent}</label>
         </li>
         ))}
     </ul>
     {selectedRadio && 
      <button>Annuler la recherche</button>
     }
      {/* affichage de pays */}
      <ul>
        {/* filter (pour filtrer le pays par continent), sort (pour trier par nombre de population), la méthode .slice determiner le nombre de pays à afficher sur la page principal, .map il nous permet d'afficher tout les contenus de notre tableau pays */}
        {data
        .filter((country) => country.continents[0].includes(selectedRadio))
        .sort((a, b) =>  b.population - a.population)
        .slice(0, rangeValue) 
        .map((country, index) => (
          <Card key={index} country={country} />
        ))}
      </ul>
    </div>
  );
};

export default Countries;
