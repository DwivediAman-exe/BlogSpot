import { useState } from 'react';
import { useHistory } from 'react-router-dom';

const Search = () => {
  return (
    <form className="d-flex input-group w-auto pe-5">
      <input
        type="search"
        className="form-control"
        aria-label="Search"
        placeholder="Search Post"
      />
      <button
        className="btn btn-dark"
        type="button"
        data-mdb-ripple-color="dark"
      >
        <i class="fas fa-search" />
      </button>
    </form>
  );
};

export default Search;
