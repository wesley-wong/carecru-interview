import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import EntryList from '../components/EntryList';

import * as PulseActions from '../actions/PulseActions';

class journalEntries extends Component {
  static propTypes = {
    editEvent: React.PropTypes.func.isRequired,
    deleteEvent: React.PropTypes.func.isRequired,
    userId: React.PropTypes.string,
    events: React.PropTypes.array
  };

  render() {
    let actions = {
      editEvent: this.props.editEvent,
      deleteEvent: this.props.deleteEvent
    };


    return (
      <EntryList events={this.props.events} userId={this.props.userId} actions={actions} />
    );
  }
}

/**
 * Expose "Smart" Component that is connect-ed to Redux
 */
export default connect(
  state => ({
    events: state.CareCruApp.events,
    userId: state.CareCruApp.userId
  }),
  dispatch => bindActionCreators(PulseActions, dispatch)
)(journalEntries);