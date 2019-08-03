import React from 'react';

import User from '../../components/User';

const index = () => {
  return (
    <div>
      <p>Hello About page</p>
      <User name="Thanh" age={20} />
    </div>
  );
};

export default index;
