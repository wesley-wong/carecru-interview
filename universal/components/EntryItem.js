import React, {PropTypes, Component} from 'react';
import moment from 'moment';
import EntryInput from './EntryInput';

export default class EntryItem extends Component {
  static propTypes = {
    id: PropTypes.any.isRequired,
    row: PropTypes.number.isRequired,
    entry: PropTypes.object.isRequired,
    editable: PropTypes.bool,
    editEntry: PropTypes.func,
    deleteEntry: PropTypes.func
  };

  constructor(props, context){
    super(props, context);
    this.state = {
      editing: false
    };
  }

  handleClick() {
    if (this.props.editable) {
      this.setState({ editing: true });
    }
  }

  handleSave(entry) {
    if (entry.text.length === 0) {
      this.props.deleteEntry(entry);
    } else {
      this.props.editEntry(entry);
    }
    this.setState({ editing: false });
  }

  render() {
    const { row, id, entry, editEntry, deleteEntry } = this.props;
    console.log('this props', this.props);
    console.log('evevnt', entry);
    let element, className = (row % 2 === 0) ? 'even' : 'odd';
    let modified = (entry.updated) ? entry.updated : entry.created;

    if (this.state.editing) {
    // EntryInput now passes down title, wordCount & sentiment
      element = (
        <EntryInput text={entry.text}
                    title={entry.title}
                    value={entry.value}
                    wordCount={entry.wordCount}
                    sentiment={entry.sentiment}
                    userId={entry.userId}
                    editing={this.state.editing}
                    valueLabel='Rating'
                    onSubmit={ (entry) => this.handleSave(Object.assign({}, entry, { id: id })) } />
      );
    } else {
      let del = (this.props.editable) ?
        <button className='destroy pure-button' onClick={ () => deleteEntry(entry) } /> :
        null;
      // Added entry.title
      element = (
        <div className='CareCru-entryItem'>
          <p className='rowNumber'>{row+1}.</p>
          <p>
            <h1>
              {entry.title}
            </h1>
          </p>
          <p className='title' onClick={::this.handleClick}>
            {entry.text}

          </p>
          {del}
          <p className='created'>{moment(modified).fromNow()}</p>
          <p className='outcome'>{entry.sentiment}</p>
        </div>
      );
    }

    return (
      <li className={className}>{element}</li>
    );
  }
}