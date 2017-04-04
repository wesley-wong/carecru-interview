import React, {PropTypes, Component} from 'react';
import EntryItem from './EntryItem';

export default class EntryTicker extends Component {
  static propTypes = {
    events: PropTypes.array.isRequired,
    length: PropTypes.number.isRequired
  };

  render() {
    const { events, userId, actions } = this.props;

    const otherEvents = events.filter(row => row.userId !== userId );

    let cumulative = otherEvents.reduce((x, event) =>  event.value + x, 0);
    let average = (otherEvents.length > 0) ? Math.round(cumulative/otherEvents.length) : 0;
    let editable = false;

    return (
      <section className='Pulse-entryList'>
        <div className='Pulse-entryList-summary'>
          <span>Other Events</span>
          <span className='val'>{otherEvents.length}</span>
          <span>Avg.</span>
          <span className='val'>{average}</span>
          <span>Cum.</span>
          <span className='val'>{cumulative}</span>
        </div>
        <div className='Pulse-entryList-list'>
          <ul>
            {otherEvents.slice(0,this.props.length).map((event, key) =>
              <EntryItem key={key} row={key} id={event.id} event={event} editable={editable} />
            )}
          </ul>
        </div>
      </section>
    );
  }
}