import React, { Component, PropTypes } from 'react'
import styles from './listItem.scss';

const thumbParamsWide = '?crop=auto&scale=both&width=423&height=220'
const thumbnailDefault = 'images/thumbnail-default.jpg'

const PLUS = '/images/add@2x.png'
const CHECK = '/images/check-icon.svg'

export default class ListItem extends Component {
  constructor(props) {
    super(props)
    this.state = { iconSrc: PLUS }
  }

  onClick() {
    // only add the first time
    if (this.state.iconSrc === PLUS) this.props.onClick(this.props.item)
    this.setState({ iconSrc: CHECK })
  }

  render() {
    const {item} = this.props
    const artistName = item.primaryArtists ? item.primaryArtists[0].name : item.artists[0].name;
    return (
      <div className={styles.default}>
        <img
          className={styles.thumbnail}
          src={ item.thumbnailUrl ? `${item.thumbnailUrl}${thumbParamsWide}` : thumbnailDefault }
          ref={(ref) => this.image = ref}
          onError={()=> this.image.src = thumbnailDefault }
        />
        <div className={styles.details}>
          <div className={styles.artist}>{artistName}</div>
          <div className={styles.title}>{item.title}</div>
        </div>
        <img className={styles.btnAdd} src={this.state.iconSrc} onClick={() => {this.onClick(item)}} />
      </div>
    )
  }

}
