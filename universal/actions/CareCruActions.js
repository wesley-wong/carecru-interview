import * as types from '../constants/ActionTypes';
import axios from 'axios';

const serverUrl = '';
const entriesUrl = `${serverUrl}/api/0/entries`;

export function setUserId(userId) {
  return {
    type: types.SET_USER_ID,
    userId
  };
}
// Returns a thunk that attempts to load journal entries
export function loadEntries() {
  // Notify the store that a request has been made
  return dispatch => {
    dispatch(loadEntriesRequest());
    return axios
      .get(entriesUrl)
      .then(res => {
        // Notify the store of a successful response
        dispatch(loadEntriesSuccess(res.body));
      })
      .catch(err => {
        // Notfiy the store of a fail response
        dispatch(loadEntriesFailure(err));
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
    // Notify the store that an axios request has been sent
    dispatch(addEntryRequest(entry));

    // Add the Journal Entry to the API
    return axios
      .post(entriesUrl, entry)
      .then(res => {
        // Notify the store of a successful
        dispatch(addEntrySuccess(res.body));
      })
      .catch(err => {
        // Notify the store that there has been an error
        dispatch(addEntryFailure(err, entry));
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

// Returns a thunk that attempts to delete a journal entry
export function deleteEntry(entry) {
  // Notify the store that a request has been made
  return dispatch => {
    dispatch(deleteEntryRequest(entry));

    return axios
      .delete(entriesUrl + '/' + entry.id)
      .then(res => {
        // Notify store of a success
        dispatch(deleteEntrySuccess(res.body));
      })
      .catch(err => {
        // Notify store of a failure
        dispatch(deleteEntryFailure(err, entry));
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

// Returns a thunk that attempts to edit an entry
export function editEntry(entry) {
  // Notifies the store that a request has been made
  return dispatch => {
    dispatch(editEntryRequest(entry));
    return axios
      .post(entriesUrl + '/' + entry.id, entry)
      .then((err, res) => {
        // Notifies the store of a sucess
        dispatch(editEntrySuccess(res.body));
      })
      .catch(err => {
        // Notifies the store of a failure
        dispatch(editEntryFailure(err, entry));
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