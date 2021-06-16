import { useState } from 'react';
import { useHistory } from 'react-router-dom';

const Search = () => {
  const [query, setQuery] = useState('');

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push(`/search/${query}`);
  };

  return (
    <form className="d-flex input-group w-auto pe-5" onSubmit={handleSubmit}>
      <input
        type="search"
        className="form-control"
        aria-label="Search"
        placeholder="Search Post"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button
        className="btn btn-dark"
        type="submit"
        data-mdb-ripple-color="dark"
      >
        {' '}
        <i class="fas fa-search" />
      </button>
    </form>
  );
};

export default Search;
