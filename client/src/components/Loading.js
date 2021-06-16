import { useState, useEffect } from 'react';
import { css } from '@emotion/react';
import GridLoader from 'react-spinners/GridLoader';

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 2rem auto;
  border-color: black;
`;

const Loading = () => {
  const [loading, setLoading] = useState();
  const [color, setColor] = useState('#fb9300');

  return (
    <div className="container p-5 text-center text-warning">
      <GridLoader color={color} loading={loading} css={override} size={30} />
      <h3 className="p-2 text-warning">Loading in Progress...</h3>
    </div>
  );
};

export default Loading;
