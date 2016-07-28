import React, { Component } from 'react';
import { Link } from 'react-router'

import Header from './header';
import AddVideo from './addVideo';
import Footer from 'components/footer/footer'

import styles from './queue.scss';

const QUEUE_POLL_INTERVAL = 1000;

export class Queue extends Component {
  componentWillMount() {
    this._activeStyles = this.activeStyles.bind(this);
  }

  componentDidMount() {
    this.props.getQueue();
    this.pollQueueInterval = setInterval(this.pollQueue.bind(this), QUEUE_POLL_INTERVAL);
  }

  componentWillUnmount() { clearInterval(this.pollQueueInterval); }

  pollQueue() { this.props.getQueue(); }

  onRemove(item) {
    if (confirm('Remove video from queue?')) this.props.removeVideo(item);
  }

  render() {
    return (
      <div className={ styles.default }>
        <Header />
        <AddVideo />
        {this.props.queue.map((i, k) => this.renderItem(i, k))}
        <Footer>
          <Link to="/">Search</Link>
        </Footer>
      </div>
    );
  }

  voteUp(item, key) {
    if (!item.votes[this.props.userId]) {
      this.props.addVote(item, this.props.userId);
    }
  }

  activeStyles(item) {
    return item.votes[this.props.userId] ? { backgroundColor: 'green' } : {}
  }

  renderItem(item, key) {
    const artistName = item.primaryArtists ? item.primaryArtists[0].name : item.artists[0].name;
    return (
      <div className={styles.item} style={this._activeStyles(item)}>
        <img className={ styles['background-img'] } src={ item.thumbnailUrl } />
        <div className={ styles.info }>
          <span className={ styles.artist }>{ artistName }</span>
          <br/>
          <span>{ item.title }</span>
          <br/>
          <span>{ item.voteCount } VOTE{ item.voteCount !== 1? 'S' : '' }</span>
        </div>
        <img src='images/thumbs-up-icon.png' className={ styles.buttonUp } onClick={() => this.voteUp(item, key)} />
        <img src='images/close-icon.svg' className={ styles['close-icon'] } onClick={() => this.onRemove(item)} />
      </div>
    );
  }
}
