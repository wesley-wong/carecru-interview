import {
  LOAD_ENTRIES_REQUEST, LOAD_ENTRIES_SUCCESS, LOAD_ENTRIES_FAILURE,
  ADD_ENTRY_REQUEST, ADD_ENTRY_SUCCESS, ADD_ENTRY_FAILURE,
  DELETE_ENTRY_REQUEST, DELETE_ENTRY_SUCCESS, DELETE_ENTRY_FAILURE,
  EDIT_ENTRY_REQUEST, EDIT_ENTRY_SUCCESS, EDIT_ENTRY_FAILURE,
  SET_USER_ID
} from '../constants/ActionTypes';

const initialState = {
  isWorking: false,
  userId: null,
  error: null,
  entries: []
};

export default function entryReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER_ID:
      return Object.assign({}, state, {
        userId: action.userId
      });
    case ADD_ENTRY_REQUEST:
      return Object.assign({}, state, {
        isWorking: true,
        error: null
      });

    case ADD_ENTRY_SUCCESS:
      let entries = state.entries;
      if (entries.findIndex(evt => evt.id === action.entry.id) === -1) {
        entries = [action.entry, ...state.entries];
      }
      return Object.assign({}, state, {
        isWorking: false,
        error: null,
        entries: entries
      });

    case DELETE_ENTRY_REQUEST:
      return Object.assign({}, state, {
        isWorking: true,
        error: null
      });

    case DELETE_ENTRY_SUCCESS:
      return Object.assign({}, state, {
        isWorking: false,
        error: null,
        entries: state.entries.filter(entry =>
        entry.id !== action.entry.id)
      });

    case EDIT_ENTRY_REQUEST:
      return Object.assign({}, state, {
        isWorking: true,
        error: null
      });

    case EDIT_ENTRY_SUCCESS:
      return Object.assign({}, state, {
        isWorking: false,
        error: null,
        entries: state.entries.map(entry =>
          entry.id === action.entry.id ?
            action.entry :
            entry
        )
      });

    case ADD_ENTRY_FAILURE:
    case DELETE_ENTRY_FAILURE:
    case EDIT_ENTRY_FAILURE:
      return Object.assign({}, state, {
        isWorking: false,
        error: action.error,
      });

    default:
      return state;
  }
}
