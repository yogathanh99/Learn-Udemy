import React from 'react';
import Link from 'next/link';

const errorPage = () => {
  return (
    <div>
      <h1>Oops, Something went wrong</h1>
      <p>
        Try to go back{' '}
        <Link href="/">
          <a>Home page</a>
        </Link>
      </p>
    </div>
  );
};

export default errorPage;
