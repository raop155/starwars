import React, { useState } from 'react';
import { useQuery } from 'react-query';
import Person from './Person';

const fetchPeople = async (key, page) => {
  const res = await fetch(`http://swapi.dev/api/people/?page=${page}`);
  return res.json();
};

const People = () => {
  const [page, setPage] = useState(1);
  const { data, status, isFetching } = useQuery(['people', page], fetchPeople, {
    // staleTime: 5000,
    // cacheTime: 5000,
    onSuccess: () => console.log('data fetch with no problemo!'),
    onError: () => console.log('data fetch error!'),
  });

  return (
    <>
      <h2 className='subtitle is-3 mt-3'>People</h2>
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
          {data.results.map((person) => {
            return <Person key={person.name} person={person} />;
          })}
        </ul>
      )}
    </>
  );
};

export default People;
