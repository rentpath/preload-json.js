import sinon from 'sinon'
import { expect } from 'chai'
import { notify, subscribe, reset } from '../src'

describe('preload-json.js', function() {
  after(function() {
    reset()
  })

  describe('#notify', function() {
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
