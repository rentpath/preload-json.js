let subscribers = {}
let notifyQueue = {}

function notify(name, data) {
  const toNotify = subscribers[name] || []
  for (let i = 0, len = toNotify.length; i < len; i++) {
    toNotify[i](data)
  }
  notifyQueue[name] = data
}

function subscribe(name, callback) {
  subscribers[name] = subscribers[name] || []
  subscribers[name].push(callback)

  if (notifyQueue.hasOwnProperty(name)) {
    callback(notifyQueue[name])
    delete notifyQueue[name]
  }
}

function cmd(commandArgs) {
  const [action, name, args] = commandArgs
  if (action === 'notify') {
    notify(name, args)
  } else if (action === 'subscribe') {
    subscribe(name, args)
  }
}

function reset() {
  subscribers = {}
  notifyQueue = {}
}

function applyCommandQueue(scope) {
  if (typeof scope.preloadJSON !== 'undefined') {
    while (scope.preloadJSON.length) {
      cmd(scope.preloadJSON.shift())
    }
  }
}

// Hookup to globals
if (typeof window === 'object') {
  applyCommandQueue(window)
  window.preloadJSON = { push: cmd }
}

export default {
  cmd,
  notify,
  subscribe,
  reset,
  applyCommandQueue
}
