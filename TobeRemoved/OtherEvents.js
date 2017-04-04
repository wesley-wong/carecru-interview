import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import EntryTicker from '../components/EntryTicker';

import * as CareCruActions from '../actions/CareCruActions';

class OtherEntries extends Component {
  static propTypes = {
    userId: React.PropTypes.string,
    entries: React.PropTypes.array
  };

  render() {
    return (
      <EntryTicker entries={this.props.entries} userId={this.props.userId} length={3} />
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
)(OtherEntries);