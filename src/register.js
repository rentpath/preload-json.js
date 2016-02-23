/**
 * Register JSONP callbacks in `window`
 *
 * USAGE
 * - Minimize with `npm run compile:register`
 * - copy-paste into `<head>`
 * - `pj.register('myData')`
 */

(function (scope, cmd, queueName) {
  scope[queueName] = scope[queueName] || []

  function createReceiver(name) {
    scope["pjReceive_" + name] = function (data) {
      scope[queueName].push(['notify', name, data])
    }
  }

  scope[cmd] = {
    register: function() {
      for (var i = 0, len = arguments.length; i < len; i++) {
        createReceiver(arguments[i])
      }
    }
  }
})(window, 'pj', 'pjQueue')
