import React, { Component } from 'react';
import styles from './addVideo.scss';
import { Link } from 'react-router';

export default class AddVideo extends Component {
  render() {
    return (
      <Link to="/" className={ styles.default }>
        <img src='/images/plus-icon.svg' className={ styles['add-icon'] } />
        <span className={ styles.text }>Add Video</span>
      </Link>
    );
  }
}
