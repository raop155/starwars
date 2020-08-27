import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Planets from './components/Planets';
import People from './components/People';

const App = () => {
  const [page, setPage] = useState('Planets');

  return (
    <>
      <div className='container--padding-x container--padding-t'>
        <div className='container'>
          <h1 className='title is-1'>Star Wars</h1>
          <Navbar setPage={setPage} />
          <main className='content'>{page === 'Planets' ? <Planets /> : <People />}</main>
        </div>
      </div>
    </>
  );
};

export default App;
