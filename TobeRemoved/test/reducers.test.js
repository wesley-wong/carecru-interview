/* global describe */
/* global it */
/* global afterEach */

import 'babel-polyfill'; // For use of Object.assign

import sinon from 'sinon';
import chai from 'chai';

var expect = chai.expect;

import reducer from '../universal/reducers';
import * as actions from '../universal/actions/CareCruActions.js';

describe('Reducers', () => {

  /**
   * Example of writing a test on a reducing functiom
   */
  describe('setUserId', () => {
    it('should set user id', () => {
      let initialStateForTest = { userId: null };
      let userId = 234;
      let action = actions.setUserId(userId);

      expect(initialStateForTest.userId).to.be.null;

      let state = reducer(initialStateForTest, action);
      expect(state.userId).to.equal(userId);
    });
  });

  describe('addEntry', () => {
    describe('request', () => {
      it('should set isWorking to true', () => {
        let initialStateForTest = { isWorking: false };
        let action = actions.addEntryRequest();

        expect(initialStateForTest.isWorking).to.be.false;

        let state = reducer(initialStateForTest, action);
        expect(state.isWorking).to.be.true;
      });
    });

    describe('success', () => {
      it('should set isWorking to false and add entry to entries', () => {
        let entries = [
          { id: 22, name: 'Entry', value: 20 }
        ];
        let initialStateForTest = { isWorking: true, entries: entries };
        let entry = { id: 25, name: 'Another Entry', value: 50 };

        let action = actions.addEntrySuccess(entry);

        expect(initialStateForTest.isWorking).to.be.true;
        expect(initialStateForTest.entries.length).to.equal(entries.length);


        let state = reducer(initialStateForTest, action);
        expect(state.isWorking).to.be.false;
        expect(state.entries.length).to.equal(entries.length + 1);
      });
    });

    describe('failure', () => {
      it('should set isWorking to false and error and not change entries', () => {
        let entries = [
          { id: 22, name: 'Entry', value: 20 }
        ];
        let initialStateForTest = { isWorking: true, entries: entries, error: null };
        let error = 'some error';

        let action = actions.addEntryFailure(error);

        expect(initialStateForTest.isWorking).to.be.true;
        expect(initialStateForTest.error).to.be.null;
        expect(initialStateForTest.entries.length).to.equal(entries.length);


        let state = reducer(initialStateForTest, action);
        expect(state.isWorking).to.be.false;
        expect(state.error).to.equal(error);
        expect(state.entries.length).to.equal(entries.length);
      });
    });
  });
});