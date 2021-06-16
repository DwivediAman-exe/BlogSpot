import { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { css } from '@emotion/react';
import GridLoader from 'react-spinners/GridLoader';

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 3rem auto;
  border-color: black;
`;
const LoadingToRedirect = ({ path }) => {
  const [count, setCount] = useState(5);
  const [loading, setLoading] = useState(true);
  const [color, setColor] = useState('#fb9300');
  let history = useHistory();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount);
    }, 1000);

    count === 0 && history.push(path);

    return () => clearInterval(interval);
  }, [count]);

  return (
    <div className="container p-5 text-center text-warning">
      <GridLoader color={color} loading={loading} css={override} size={30} />
      <h3 className="p-2 text-danger">Unauthorised Access !!</h3>
      <h3 className="p-3 text-danger">Redirecting User in {count} sec...</h3>
    </div>
  );
};

export default LoadingToRedirect;
