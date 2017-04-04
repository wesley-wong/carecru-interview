import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import EntryList from '../components/EntryList';

import * as CareCruActions from '../actions/CareCruActions';

class journalEntries extends Component {
  static propTypes = {
    editEntry: React.PropTypes.func.isRequired,
    deleteEntry: React.PropTypes.func.isRequired,
    userId: React.PropTypes.string,
    entries: React.PropTypes.array
  };

  render() {
    let actions = {
      editEntry: this.props.editEntry,
      deleteEntry: this.props.deleteEntry
    };


    return (
      <EntryList entries={this.props.entries} userId={this.props.userId} actions={actions} />
    );
  }
}

/**
 * Expose "Smart" Component that is connect-ed to Redux
 */
export default connect(
  state => ({
    entries: state.CareCruApp.entries,
    userId: state.CareCruApp.userId
  }),
  dispatch => bindActionCreators(CareCruActions, dispatch)
)(journalEntries);