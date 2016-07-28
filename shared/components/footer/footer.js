import React, { Component } from 'react';

import styles from './footer.scss';

export default class Footer extends Component {
  render() {
    return <div className={styles.default}>{this.props.children}</div>
  }
}
