import React from 'react';

const Navbar = ({ setPage }) => {
  const changePage = (e, page) => {
    e.preventDefault();
    setPage(page);
  };

  return (
    <header>
      <nav>
        <div className='buttons is-centered'>
          <a
            className='button is-dark is-outlined is-inverted is-rounded'
            href='/#'
            onClick={(e) => changePage(e, 'Planets')}
          >
            Planets
          </a>
          <a
            className='button is-dark is-outlined is-inverted is-rounded'
            href='/#'
            onClick={(e) => changePage(e, 'People')}
          >
            People
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
