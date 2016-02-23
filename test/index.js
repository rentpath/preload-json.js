import sinon from 'sinon'
import { expect } from 'chai'
import { notify, subscribe, cmd, reset } from '../src'

describe('preload-json.js', function() {
  describe('#notify', function() {
    afterEach(function() {
      reset()
    })

    it('calls the callback with a valid name', function() {
      const callback = sinon.spy()
      const data = { foo: 'bar' }
      subscribe('foo', callback)
      notify('foo', data)
      expect(callback).to.have.been.called
      expect(callback).to.have.been.calledWith(data)
    })

    it('does not call the callback with an invalid name', function() {
      const callback = sinon.spy()
      subscribe('foo', callback)
      notify('bar', {})
      expect(callback).not.to.have.been.called
    })

    it('calls the callback when subscribing after notifying', function() {
      const callback = sinon.spy()
      const data = { foo: 'bar' }
      notify('foo', data)
      subscribe('foo', callback)
      expect(callback).to.have.been.called
      expect(callback).to.have.been.calledWith(data)
    })

    it('clears the notify queue once its used', function() {
      const first = sinon.spy()
      const second = sinon.spy()
      notify('foo', { foo: 'bar' })
      subscribe('foo', first)
      subscribe('foo', second)
      expect(first).to.have.been.called
      expect(second).not.to.have.been.called
    })
  })

  describe('#cmd', function() {
    afterEach(function() {
      reset()
    })

    it('allows subscribing', function() {
      const callback = sinon.spy()
      const data = { foo: 'bar' }
      cmd(['subscribe', 'foo', callback])
      notify('foo', data)
      expect(callback).to.have.been.called
      expect(callback).to.have.been.calledWith(data)
    })

    it('notifies subscribers', function() {
      const callback = sinon.spy()
      const data = { foo: 'bar' }
      subscribe('foo', callback)
      cmd(['notify', 'foo', data])
      expect(callback).to.have.been.called
      expect(callback).to.have.been.calledWith(data)
    })
  })

  context('browser environment', function() {
    before(function() {
      this.jsdom = require('jsdom-global')()
    })

    after(function() {
      this.jsdom()
    })

    it('runs commands from window')

    it('replaces the window queue with the lib')
  })
})
