import React, {PropTypes, Component} from 'react';
import EntryItem from './EntryItem';

export default class EntryList extends Component {
  static propTypes = {
    events: PropTypes.array.isRequired,
    userId: PropTypes.string.isRequired,
    actions: PropTypes.object.isRequired
  };

  render() {
    const { events, userId, actions } = this.props;

    const journalEntries = events.filter(row => row.userId === userId );
    journalEntries.sort((a, b) => {return b.value - a.value})
    console.log(journalEntries);
    let list;
    let editable = true;

    let cumulative = journalEntries.reduce((x, event) =>  event.sentiment + x, 0);
    let average = (journalEntries.length > 0) ? Math.round(cumulative/journalEntries.length): 0;


    if (journalEntries.length > 0) {
      list = journalEntries.map((event, key) =>
        <EntryItem key={key} row={key} id={event.id} editable={editable} event={event} {...actions} />
      );
    } else {
      list = <li>
        <div className='CareCru-entryItem empty'>
          <p>No events recorded!</p>
        </div>
      </li>;
    }

    return (
      <section className='CareCru-entryList'>
        <div className='CareCru-entryList-summary'>
          <span>Your Entries</span>
          <span className='val'>{journalEntries.length}</span>
          <span>Avg.</span>
          <span className='val'>{average}</span>
          <span>Cum.</span>
          <span className='val'>{cumulative}</span>
        </div>

        <div className='CareCru-entryList-list'>
          <ul>
            {list}
          </ul>
        </div>
      </section>
    );
  }
}