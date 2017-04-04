import * as types from '../constants/ActionTypes';
import request from 'superagent';

const serverUrl = '';
const entriesUrl = `${serverUrl}/api/0/entries`;

export function setUserId(userId) {
  return {
    type: types.SET_USER_ID,
    userId
  };
}

export function loadEntries() {
  return dispatch => {
    dispatch(loadEntriesRequest());
    return request
      .get(entriesUrl)
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) {
          dispatch(loadEntriesFailure(err));
        } else {
          dispatch(loadEntriesSuccess(res.body));
        }
      });
  };
}

export function loadEntriesRequest() {
  return {
    type: types.LOAD_ENTRIES_REQUEST
  };
}

export function loadEntriesSuccess(entries) {
  return {
    type: types.LOAD_ENTRIES_SUCCESS,
    entries
  };
}

export function loadEntriesFailure(error) {
  return {
    type: types.LOAD_ENTRIES_FAILURE,
    error
  };
}

// Returns a thunk that attempts to add journal entries
export function addJournalEntry(entry) {
  return dispatch => {
    // Notify the store that a request has been sent
    dispatch(addEntryRequest(entry));

    // Add the Journal Entry to the API
    return request
      .post(entriesUrl)
      .send(entry)
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) {
          // Notify the store that there has been an error
          dispatch(addEntryFailure(err, entry));
        } else {
          // Notify the store of a successful
          dispatch(addEntrySuccess(res.body));
        }
      });
  };
}

export function addEntryRequest(entry) {
  return {
    type: types.ADD_ENTRY_REQUEST,
    entry
  };
}

export function addEntrySuccess(entry) {
  return {
    type: types.ADD_ENTRY_SUCCESS,
    entry
  };
}

export function addEntryFailure(error, entry) {
  return {
    type: types.ADD_ENTRY_FAILURE,
    error
  };
}

export function deleteEntry(entry) {
  return dispatch => {
    dispatch(deleteEntryRequest(entry));

    return request
      .del(entriesUrl + '/' + entry.id)
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) {
          dispatch(deleteEntryFailure(err, entry));
        } else {
          dispatch(deleteEntrySuccess(res.body));
        }
      });
  };
}

export function deleteEntryRequest(entry) {
  return {
    type: types.DELETE_ENTRY_REQUEST,
    entry
  };
}

export function deleteEntrySuccess(entry) {
  return {
    type: types.DELETE_ENTRY_SUCCESS,
    entry
  };
}

export function deleteEntryFailure(error, entry) {
  return {
    type: types.DELETE_ENTRY_FAILURE,
    error,
    entry
  };
}

export function editEntry(entry) {
  return dispatch => {
    dispatch(editEntryRequest(entry));

    return request
      .post(entriesUrl + '/' + entry.id)
      .send(entry)
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) {
          dispatch(editEntryFailure(err, entry));
        } else {
          dispatch(editEntrySuccess(res.body));
        }
      });
  };
}

export function editEntryRequest(entry) {
  return {
    type: types.EDIT_ENTRY_REQUEST,
    entry
  };
}

export function editEntrySuccess(entry) {
  return {
    type: types.EDIT_ENTRY_SUCCESS,
    entry
  };
}

export function editEntryFailure(error, entry) {
  return {
    type: types.EDIT_ENTRY_FAILURE,
    error,
    entry
  };
}