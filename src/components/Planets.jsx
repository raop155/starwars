import React from 'react';
import { useInfiniteQuery } from 'react-query';
import Planet from './Planet';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

const fetchPlanets = async (key, page = '1') => {
  const api_url = `https://swapi.dev/api/planets/?page=${page}`;
  console.log(api_url);
  const res = await fetch(api_url);
  return res.json();
};

const Planets = () => {
  const { status, data, isFetchingMore, fetchMore, canFetchMore } = useInfiniteQuery(
    ['planets'],
    fetchPlanets,
    {
      refetchOnWindowFocus: false,
      onSuccess: () => console.log('data fetch with no problemo!'),
      onError: () => console.log('data fetch error!'),
      getFetchMore: (lastGroup) => {
        lastGroup.page = lastGroup.next?.split('=')[1];
        return lastGroup.page;
      },
    },
  );

  console.log('data', data);

  const loadMoreButtonRef = React.useRef();
  useIntersectionObserver({
    target: loadMoreButtonRef,
    onIntersect: fetchMore,
    enabled: canFetchMore,
  });

  return (
    <>
      <h2 className='subtitle is-3 mt-3'>Planets</h2>

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
          <ul className=''>
            {data?.map((group, i) => (
              <React.Fragment key={i}>
                {group.results.map((planet) => (
                  <Planet key={planet.name} planet={planet} />
                ))}
              </React.Fragment>
            ))}
          </ul>
        </>
      )}

      <div className='' ref={loadMoreButtonRef}>
        {isFetchingMore && (
          <div className='mt-5'>
            <div className='box'>
              <h3 className='my-0'>Loading more...</h3>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Planets;
