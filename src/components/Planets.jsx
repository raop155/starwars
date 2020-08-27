import React, { useState } from 'react';
import { useQuery } from 'react-query';
import Planet from './Planet';

const fetchPlanets = async (key, page) => {
  const res = await fetch(`http://swapi.dev/api/planets/?page=${page}`);
  // const res = await fetch('/text.json');
  return res.json();
};

const Planets = () => {
  const [page, setPage] = useState(1);
  const { data, status, isFetching } = useQuery(['planets', page], fetchPlanets, {
    // staleTime: 5000,
    // cacheTime: 5000,
    onSuccess: () => console.log('data fetch with no problemo!'),
    onError: () => console.log('data fetch error!'),
  });

  // console.log(data);

  return (
    <>
      <h2 className='subtitle is-3 mt-3'>Planets</h2>
      {/* {isFetching && <div>Is fetching data...</div>} */}

      <div className='buttons'>
        <button
          className='button is-dark is-outlined is-inverted is-focused'
          onClick={() => setPage(1)}
        >
          Page 1
        </button>
        <button className='button is-dark is-outlined is-inverted' onClick={() => setPage(2)}>
          Page 2
        </button>
        <button className='button is-dark is-outlined is-inverted' onClick={() => setPage(3)}>
          Page 3
        </button>
      </div>

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
