import React from 'react';

const Navbar = ({ setPage }) => {
  const resetFocus = () => {
    const planetsLink = document.querySelector('#planetsLink');
    const peopleLink = document.querySelector('#peopleLink');

    planetsLink.classList.remove('is-focused');
    peopleLink.classList.remove('is-focused');
  };

  const changePage = (e, page) => {
    e.preventDefault();
    resetFocus();
    e.target.classList.toggle('is-focused');
    setPage(page);
  };

  return (
    <header>
      <nav>
        <div className='buttons is-centered '>
          <a
            id='planetsLink'
            className='button is-dark is-outlined is-inverted is-rounded is-focused'
            href='/#'
            onClick={(e) => changePage(e, 'Planets')}
          >
            Planets
          </a>
          <a
            id='peopleLink'
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
