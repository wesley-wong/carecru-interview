import * as types from '../constants/ActionTypes';
import request from 'superagent';

const serverUrl = '';
const eventsUrl = `${serverUrl}/api/0/events`;

export function setUserId(userId) {
  return {
    type: types.SET_USER_ID,
    userId
  };
}

export function loadEvents() {
  return dispatch => {
    dispatch(loadEventsRequest());
    return request
      .get(eventsUrl)
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) {
          dispatch(loadEventsFailure(err));
        } else {
          dispatch(loadEventsSuccess(res.body));
        }
      });
  };
}

export function loadEventsRequest() {
  return {
    type: types.LOAD_ENTRIES_REQUEST
  };
}

export function loadEventsSuccess(events) {
  return {
    type: types.LOAD_ENTRIES_SUCCESS,
    events
  };
}

export function loadEventsFailure(error) {
  return {
    type: types.LOAD_ENTRIES_FAILURE,
    error
  };
}

// Returns a thunk that attempts to add journal entries
export function addJournalEntry(event) {
  return dispatch => {
    // Notify the store that a request has been sent
    dispatch(addEventRequest(event));

    // Add the Journal Entry to the API
    return request
      .post(eventsUrl)
      .send(event)
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) {
          // Notify the store that there has been an error
          dispatch(addEventFailure(err, event));
        } else {
          // Notify the store of a successful
          dispatch(addEventSuccess(res.body));
        }
      });
  };
}

export function addEventRequest(event) {
  return {
    type: types.ADD_ENTRY_REQUEST,
    event
  };
}

export function addEventSuccess(event) {
  return {
    type: types.ADD_ENTRY_SUCCESS,
    event
  };
}

export function addEventFailure(error, event) {
  return {
    type: types.ADD_ENTRY_FAILURE,
    error
  };
}

export function deleteEvent(event) {
  return dispatch => {
    dispatch(deleteEventRequest(event));

    return request
      .del(eventsUrl + '/' + event.id)
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) {
          dispatch(deleteEventFailure(err, event));
        } else {
          dispatch(deleteEventSuccess(res.body));
        }
      });
  };
}

export function deleteEventRequest(event) {
  return {
    type: types.DELETE_ENTRY_REQUEST,
    event
  };
}

export function deleteEventSuccess(event) {
  return {
    type: types.DELETE_ENTRY_SUCCESS,
    event
  };
}

export function deleteEventFailure(error, event) {
  return {
    type: types.DELETE_ENTRY_FAILURE,
    error,
    event
  };
}

export function editEvent(event) {
  return dispatch => {
    dispatch(editEventRequest(event));

    return request
      .post(eventsUrl + '/' + event.id)
      .send(event)
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) {
          dispatch(editEventFailure(err, event));
        } else {
          dispatch(editEventSuccess(res.body));
        }
      });
  };
}

export function editEventRequest(event) {
  return {
    type: types.EDIT_ENTRY_REQUEST,
    event
  };
}

export function editEventSuccess(event) {
  return {
    type: types.EDIT_ENTRY_SUCCESS,
    event
  };
}

export function editEventFailure(error, event) {
  return {
    type: types.EDIT_ENTRY_FAILURE,
    error,
    event
  };
}