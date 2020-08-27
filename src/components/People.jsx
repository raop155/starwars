import React from 'react';
import { useQuery } from 'react-query';
import Person from './Person';

const fetchPeople = async () => {
  const res = await fetch('http://swapi.dev/api/people/');
  return res.json();
};

const People = () => {
  const { data, status } = useQuery('people', fetchPeople);
  console.log(data);

  return (
    <>
      <h2 className='subtitle is-3 mt-3'>People</h2>
      {status === 'loading' && <div>Loading data...</div>}
      {status === 'error' && <div>Error fetching data</div>}
      {status === 'success' && (
        <ul>
          {data.results.map((person) => {
            return <Person key={person.name} person={person} />;
          })}
        </ul>
      )}
    </>
  );
};

export default People;
