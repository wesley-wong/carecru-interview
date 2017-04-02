import React, { Component, PropTypes } from 'react';
import { VALUE_CLASSES } from '../constants/ActionTypes.js';

export default class EventInput extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    userId: PropTypes.string.isRequired,
    textLabel: PropTypes.string,
    valueLabel: PropTypes.string,
    editing: PropTypes.bool
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      errors: [],
      title: this.props.title || '',
      text: this.props.text || '',
      value: this.props.value || 0
    };
  }

  handleSubmit(e) {
    let errors;
    e.preventDefault();

    if (this.state.text.length === 0) {
      errors = ['You have not said what happened!'];
    }

    if (this.state.value < -10 || this.state.value > 10) {
      errors = [...errors, 'You have somewhere set an invalid value!'];
    }

    if (errors && errors.length > 0) {
      this.setState({errors: errors});
    } else {
      this.props.onSubmit({text: this.state.text, value: this.state.value, userId: this.props.userId});
      this.setState({text: '', value: 0});
    }
  }

  handleTextChange(e) {
    console.log('in handle TEXT change', e.target.value);
    this.setState({ text: e.target.value });
  }


  handleTitleChange(e) {
    console.log('in handle TITLE change', e.target.value);
    this.setState({ title: e.target.value });
  }


  handleValueChange(e) {
    // count words:
    // e.target.value
    this.setState({ value: parseInt(e.target.value, 10) });
  }


  render() {
    let self = this;
    let saveText = (this.props.editing) ? 'Save' : 'Add';
    let className = Object.keys(VALUE_CLASSES).reduce((current, key) => {
      if (!current && self.state.value <= key) {
        return VALUE_CLASSES[key];
      } else {
        return current;
      }
    }, null);

    return (
      <form className='Pulse-eventInput pure-form'>
        <fieldset>
          <div>
            <input className='full-width' type='text' placeholder='Title' autoFocus='true' value={this.state.title} onChange={::this.handleTitleChange} />
            <hr />
            <textarea className='full-width' type='text' rows='5' placeholder={this.props.textLabel} autoFocus='true' value={this.state.text} onChange={::this.handleTextChange} />
          </div>
          <label htmlFor='value'>Happiness Level</label>
          <input className={className} type='range' id='value' min='-10' max='10' value={this.state.value} onChange={::this.handleValueChange} />
          <span className='Pulse-eventInput-value'>{this.state.value}</span>
          <button type='submit' className='save pure-button' onClick={::this.handleSubmit}>{saveText}</button>
        </fieldset>
        <div>
          <span>Number of Words </span>
          <span className='val'>{4}</span>
          <span> &#215; Happiness Level </span>
          <span className='val'>{this.state.value}</span>
          <span> = Sentiment Score </span>
          <span className='val'>{4* this.state.value}</span>
        </div>
      </form>
    );
  }
}