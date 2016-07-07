import {noop} from 'lodash';
import {assert} from 'chai';

import {ComponentController} from './component.controller';

describe('controller: ComponentController', () => {
  let instance;

  beforeEach(() => {
    instance = new ComponentController();
  });

  describe('storeSubscribe', () => {
    it('default unsuscribeCallback should be callable', () => {
      assert.strictEqual(instance.unsubscribeCallback, noop);
    });

    it('unsuscribeCallback should be overriden', () => {
      instance.storeSubscribe();

      assert.isFunction(instance.unsubscribeCallback);
      assert.notStrictEqual(instance.unsubscribeCallback, noop);
    });
  });

  it('storeUnsubscribe', () => {
    let unsubscribeCallback;

    sinon.stub(instance, 'unsubscribeCallback');
    unsubscribeCallback = instance.unsubscribeCallback;
    instance.storeUnsubscribe();

    sinon.assert.calledOnce(unsubscribeCallback);
    assert.strictEqual(instance.unsubscribeCallback, noop);
  });

  it('select', () => {
    const state = {};
    const componentState = instance.select(state);

    assert.strictEqual(componentState, state);
  });

  describe('getNewState', () => {
    let state;

    beforeEach(() => {
      state = {};
      sinon.stub(instance.storeService, 'getState').returns(state);
    });

    afterEach(() => {
      instance.storeService.getState.restore();
    });

    it('should call this.select()', () => {
      sinon.stub(instance, 'select');
      instance.getNewState();

      sinon.assert.calledOnce(instance.select);
    });

    it('should return new state', () => {
      const newState = instance.getNewState();

      assert.strictEqual(newState, state);
    });
  });

  it('getInitialState', () => {
    assert.isUndefined(instance.getInitialState());
  });

  describe('setState', () => {
    it('should change state to given argument if it is an object', () => {
      const objectState = {};

      instance.setState(objectState);

      assert.strictEqual(instance.state, objectState);
    });

    it('should execute function and change state to its result', () => {
      const objectState = {};
      const functionState = function(previousState, controller) {
        return Object.assign(objectState, {previousState, controller});
      };

      instance.setState(functionState);

      assert.strictEqual(instance.state, objectState);
    });
  });
});
