import React from 'react';

const Planet = ({ planet }) => {
  return (
    <li className='box'>
      <h3>{planet.name}</h3>
      <p>Population - {planet.population}</p>
      <p>Terrain - {planet.terrain}</p>
    </li>
  );
};

export default Planet;
