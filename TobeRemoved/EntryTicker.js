import React, {PropTypes, Component} from 'react';
import EntryItem from './EntryItem';

export default class EntryTicker extends Component {
  static propTypes = {
    entries: PropTypes.array.isRequired,
    length: PropTypes.number.isRequired
  };

  render() {
    const { entries, userId, actions } = this.props;

    const otherEntries = entries.filter(row => row.userId !== userId );

    let cumulative = otherEntries.reduce((x, entry) =>  entry.value + x, 0);
    let average = (otherEntries.length > 0) ? Math.round(cumulative/otherEntries.length) : 0;
    let editable = false;

    return (
      <section className='CareCru-entryList'>
        <div className='CareCru-entryList-summary'>
          <span>Other Entries</span>
          <span className='val'>{otherEntries.length}</span>
          <span>Avg.</span>
          <span className='val'>{average}</span>
          <span>Cum.</span>
          <span className='val'>{cumulative}</span>
        </div>
        <div className='CareCru-entryList-list'>
          <ul>
            {otherEntries.slice(0,this.props.length).map((entry, key) =>
              <EntryItem key={key} row={key} id={entry.id} entry={entry} editable={editable} />
            )}
          </ul>
        </div>
      </section>
    );
  }
}