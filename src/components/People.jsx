import React, { useState } from 'react';
import { usePaginatedQuery } from 'react-query';
import Person from './Person';

const fetchPeople = async (key, page = '1') => {
  const res = await fetch(`https://swapi.dev/api/people/?page=${page}`);
  return res.json();
};

const People = () => {
  const [page, setPage] = useState(1);
  const { resolvedData, latestData, status } = usePaginatedQuery(['people', page], fetchPeople, {
    // staleTime: 5000,
    // cacheTime: 5000,
    onSuccess: () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      console.log('data fetch with no problemo!');
    },
    onError: () => console.log('data fetch error!'),
  });

  return (
    <>
      <h2 className='subtitle is-3 mt-3'>People</h2>

      {/* {isFetching && <div>Is fetching data... </div>} */}

      {status === 'loading' && (
        <div className='box'>
          <h3 className='my-0'>Loading data...</h3>
        </div>
      )}
      {status === 'error' && (
        <div className='box'>
          <h3 className='my-0'>Error fetching data</h3>
        </div>
      )}

      {status === 'success' && (
        <>
          <ul className='mb-5'>
            {resolvedData.results.map((person) => {
              return <Person key={person.name} person={person} />;
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

export default People;
