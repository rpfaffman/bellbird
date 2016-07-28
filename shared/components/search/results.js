import React, { Component } from 'react'
import ListItem from 'components/listItem/listItem'

export default class Results extends Component {
  addItem(item) {
    this.props.onClickItem(item)
  }

  renderVideoItem(video, key) {
    return <ListItem key={key} item={video} onClick={ (item) => this.addItem(item) } />
  }

  render() {
    return (
      <div className="results-container">
        { this.props.results.videos.map((video, i) => this.renderVideoItem(video, i)) }
      </div>
    )
  }
}
