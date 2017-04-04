import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import EntryTicker from '../components/EntryTicker';

import * as PulseActions from '../actions/PulseActions';

class OtherEvents extends Component {
  static propTypes = {
    userId: React.PropTypes.string,
    events: React.PropTypes.array
  };

  render() {
    return (
      <EntryTicker events={this.props.events} userId={this.props.userId} length={3} />
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
)(OtherEvents);