import React from 'react';
import Link from 'next/link';
import Router from 'next/router';

class indexPage extends React.Component {
  static getInitialProps(context) {
    console.log(context);
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ appName: 'Next App' });
      }, 500);
    });
    return promise;
  }
  render() {
    return (
      <div>
        <h1>Hello Main page of {this.props.appName}</h1>
        <p>
          Go to{' '}
          <Link href="/about">
            <a>About</a>
          </Link>
        </p>
        <button onClick={() => Router.push('/about')}>About</button>
      </div>
    );
  }
}

export default indexPage;
