import { useState } from 'react';
import { css } from '@emotion/react';
import { Link } from 'react-router-dom';
import HashLoader from 'react-spinners/HashLoader';

const override = css`
  display: block;
  margin: 5rem auto;
  border-color: black;
`;

const Lost = () => {
  const [loading, setLoading] = useState(true);
  const [color, setColor] = useState('#fb9300');

  return (
    <div className="container  p-2 text-center text-danger">
      <HashLoader color={color} loading={loading} css={override} size={100} />
      <h1 className="text-center fw-bold">404 | Page not Found !!!</h1>
      <Link to="/" className="text-center fw-bold">
        <button className="btn btn-lg btn-rounded py-2 fs-6 btn-outline-warning mt-5">
          back to Home
        </button>
      </Link>
    </div>
  );
};

export default Lost;
