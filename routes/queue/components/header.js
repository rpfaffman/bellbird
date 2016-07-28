import React, { Component } from 'react';
import styles from './header.scss';
import { Link } from 'react-router';

export default class Header extends Component {
  render() {
    return (
      <div className={ styles.default }>
        
        <Link to="/">
          <img src='images/back-arrow-icon.svg' className={ styles['back-arrow'] } />
        </Link>
        <div className={ styles['header'] }>Playlist Queue</div>
      </div>
    );
  }
}
