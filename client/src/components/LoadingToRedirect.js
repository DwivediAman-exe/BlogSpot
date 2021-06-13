import { useState, useEffect } from 'react';
import { useHistory } from 'react-router';

const LoadingToRedirect = ({ path }) => {
  const [count, setCount] = useState(5);
  let history = useHistory();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount);
    }, 1000);

    count === 0 && history.push(path);

    return () => clearInterval(interval);
  }, [count]);

  return (
    <h3 className="container p-5 m-5  text-warning">
      Redirecting you in {count} seconds...
    </h3>
  );
};

export default LoadingToRedirect;
