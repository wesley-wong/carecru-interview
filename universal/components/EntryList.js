import React, {PropTypes, Component} from 'react';
import EntryItem from './EntryItem';

export default class EntryList extends Component {
  static propTypes = {
    entries: PropTypes.array.isRequired,
    userId: PropTypes.string.isRequired,
    actions: PropTypes.object.isRequired
  };

  render() {
    const { entries, userId, actions } = this.props;

    const journalEntries = entries.filter(row => row.userId === userId );

    // Sort Journal Entries by Sentiment Value desc
    journalEntries.sort((a, b) => {return b.sentiment - a.sentiment})
    let list;
    let editable = true;

    let cumulative = journalEntries.reduce((x, entry) =>  entry.sentiment + x, 0);
    let average = (journalEntries.length > 0) ? Math.round(cumulative/journalEntries.length): 0;


    if (journalEntries.length > 0) {
      list = journalEntries.map((entry, key) =>
        <EntryItem key={key} row={key} id={entry.id} editable={editable} entry={entry} {...actions} />
      );
    } else {
      list = <li>
        <div className='CareCru-entryItem empty'>
          <p>No entries recorded!</p>
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