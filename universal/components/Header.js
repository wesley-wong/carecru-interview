import React, { PropTypes, Component } from 'react';
import { IndexLink, Link } from 'react-router';

export default class Header extends Component {
  render() {
    return (
      <div>
        <header className='Pulse-header'>
            <img src="https://carecru.com/wp-content/uploads/2017/02/Logo_H2-1-e1487616217405.png" alt='Carecru' />
          <h1>
            Interview
          </h1>
        </header>
      </div>
    );
  }
}