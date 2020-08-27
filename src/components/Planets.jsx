import React from 'react';
import { useQuery } from 'react-query';
import Planet from './Planet';

const fetchPlanets = async () => {
  const res = await fetch('http://swapi.dev/api/planets/');
  return res.json();
};

const Planets = () => {
  const { data, status } = useQuery('planets', fetchPlanets);
  console.log(data);

  return (
    <>
      <h2 className='subtitle is-3 mt-3'>Planets</h2>
      {status === 'loading' && <div>Loading data...</div>}
      {status === 'error' && <div>Error fetching data</div>}
      {status === 'success' && (
        <ul>
          {data.results.map((planet) => {
            return <Planet key={planet.name} planet={planet} />;
          })}
        </ul>
      )}
    </>
  );
};

export default Planets;
