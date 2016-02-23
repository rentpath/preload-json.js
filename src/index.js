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
  if (typeof scope.parallelData !== 'undefined') {
    while (scope.parallelData.length) {
      cmd(scope.parallelData.shift())
    }
  }
}

// Hookup to globals
if (typeof window === 'object') {
  applyCommandQueue(window)
  window.parallelData = { push: cmd }
}

export default { push: cmd, cmd, notify, subscribe, reset, applyCommandQueue }
