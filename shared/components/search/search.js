import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

import Form from './form'
import Results from './results'
import Footer from 'components/footer/footer'


import * as SearchAction from 'modules/search/actions';
import { add as addToQueue } from 'modules/queue/actions';

import styles from './search.scss';

export default class Search extends Component {

  shouldComponentUpdate(nextProps) {
    return (nextProps !== this.props)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.form.query.length > 0 &&
        nextProps.form.query.length !== this.props.form.query.length) {
      this.props.search(nextProps.form.query)
    }
  }

  buildQuery(searchTerm) {
    // there is a search term
    if (searchTerm && searchTerm.length > 0) {
      this.props.buildQuery(searchTerm)

    // The term has been cleared out or is not present
    } else {
      // this.props.dispatch(SearchAction.reset())
    }
  }

  hasResults() {
    return this.props.results.artists.length || this.props.results.videos.length
  }

  render() {
    return (
      <div className={styles.default}>
        <div className={styles.formContainer}>
          <Form onChange={(searchTerm) => this.buildQuery(searchTerm) }/>
        </div>
        <div className={styles.resultsContainer}>
          <Results results={this.props.results} onClickItem={(item) => this.props.addToQueue(item)} />
        </div>
        <Footer>
          <Link to="/queue">Queue</Link>
        </Footer>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    form: state.search.form,
    results: state.search.results
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addToQueue: (item) => { dispatch(addToQueue(item)) },
    search: (query) => { dispatch(SearchAction.search(query)) },
    buildQuery: (query) => { dispatch (SearchAction.buildQuery(query)) }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)
