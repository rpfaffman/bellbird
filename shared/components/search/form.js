import React, { Component } from 'react'
import { connect } from 'react-redux'
import style from './search.scss'

const searchIcon = '/images/search-icon@3x.png'


export default class Form extends Component {

  // not all of the form components have the same number
  // of elements in a row. This helps transition between
  // components so the focus doesn't disappear.

  // update the search query
  update() {
    const input = this.searchField
    this.props.onChange(input.value)
  }

  // add character to query
  addChar(char) {
    const input = this.searchField

    input.value = input.value + char
    this.update()
  }

  render() {
    return (
      <div className={style.searchInput}>
        <img src={searchIcon} />
        <input placeholder="Search Vevo" ref={(ref) => this.searchField = ref} type="text" onChange={() => this.update()} />
      </div>
    )
  }
}

