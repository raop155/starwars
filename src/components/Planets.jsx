import React, { useState } from 'react';
import { usePaginatedQuery } from 'react-query';
import Planet from './Planet';

const fetchPlanets = async (key, page) => {
  const res = await fetch(`https://swapi.dev/api/planets/?page=${page}`);
  // const res = await fetch('/text.json');
  return res.json();
};

const Planets = () => {
  const [page, setPage] = useState(1);
  const { resolvedData, latestData, status } = usePaginatedQuery(['planets', page], fetchPlanets, {
    // staleTime: 5000,
    // cacheTime: 5000,
    onSuccess: () => {
      console.log('data fetch with no problemo!');
      // window.scrollTo(0, 0);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      // document.querySelector('#buttons').scrollIntoView();
    },
    onError: () => console.log('data fetch error!'),
  });

  return (
    <>
      <h2 className='subtitle is-3 mt-3'>Planets</h2>
      {/* {isFetching && <div>Is fetching data...</div>} */}

      {status === 'loading' && <div>Loading data...</div>}
      {status === 'error' && <div>Error fetching data</div>}
      {status === 'success' && (
        <>
          <ul className='mb-5'>
            {resolvedData.results.map((planet) => {
              return <Planet key={planet.name} planet={planet} />;
            })}
          </ul>

          <div className='buttons'>
            <button
              className='button is-dark is-outlined is-inverted'
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
            >
              Previous Page
            </button>
            <span className='mr-2 mb-2 is-size-5'>{page}</span>
            <button
              className='button is-dark is-outlined is-inverted'
              onClick={() => setPage((prev) => (!latestData || !latestData.next ? prev : prev + 1))}
              disabled={!latestData || !latestData.next}
            >
              Next Page
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default Planets;
