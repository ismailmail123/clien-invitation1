import React from 'react';
import Placeholder from 'react-bootstrap/Placeholder';

function LoadingTable() {
  return (
    <>
      <Placeholder as="p" animation="glow">
        <Placeholder xs={12} />
      </Placeholder>
      <Placeholder as="p" animation="wave">
        <Placeholder xs={12} />
      </Placeholder>
    </>
  );
}

export default LoadingTable;