import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Header from '../components/Header';
import EntryList from '../components/EntryList';
import EntryInput from '../components/EntryInput';

import * as CareCruActions from '../actions/CareCruActions';

class CareCruApp extends Component {

  render() {
    // changed onSubmit function name
    return (
      <div className="CareCru-Container">
        <Header/>
        <section className='CareCru-addEntryForm'>
          <EntryInput onSubmit={this.props.addJournalEntry} userId={this.props.userId} textLabel='What happened?' valueLabel='Rating' />
        </section>
        {this.props.journalEntries}
      </div>
    );
  }
}

/**
 * Expose "Smart" Component that is connect-ed to Redux
 */
export default connect(
  state => ({
    entries: state.CareCruApp.entries,
    userId: state.CareCruApp.userId,
    isWorking: state.CareCruApp.isWorking,
    error: state.CareCruApp.error
  }),
  dispatch => bindActionCreators(CareCruActions, dispatch)
)(CareCruApp);
