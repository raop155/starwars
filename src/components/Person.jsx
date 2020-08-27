import React from 'react';

const Person = ({ person }) => {
  return (
    <li className='box'>
      <h3>{person.name}</h3>
      <p>Gender - {person.gender}</p>
      <p>Birth year - {person.birth_year}</p>
    </li>
  );
};

export default Person;
