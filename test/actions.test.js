/* global describe */
/* global it */
/* global afterEach */

import sinon from 'sinon';
import chai from 'chai';

const expect = chai.expect;

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { setUserId, loadEntries, __RewireAPI__ as actions } from '../universal/actions/CareCruActions.js';
import * as types from '../universal/constants/ActionTypes';

describe('Actions', () => {
  afterEach(function() {
    actions.__ResetDependency__('request');
  });

  /**
   * Example of writing a test on a syncronous action creator
   */
  describe('setUserId', () => {
    it('should return action with type SET_USER_ID and userId equal to 200', () => {
      let action = setUserId(200);
      expect(action.type).to.equal(types.SET_USER_ID);
      expect(action.userId).to.equal(200);
    });

    it('should return action with type SET_USER_ID and userId equal to 6700102', () => {
      let action = setUserId(6700102);
      expect(action.type).to.equal(types.SET_USER_ID);
      expect(action.userId).to.equal(6700102);
    });
  });

});