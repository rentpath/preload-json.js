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
  }
}

function cmd(commandArgs) {
  const action = commandArgs[0]
  console.log('cmd', commandArgs)
  commandArgs.shift()

  // white-list actions
  switch (action) {
    case 'notify':
      notify.apply(this, commandArgs)
      break
    case 'subscribe':
      subscribe.apply(this, commandArgs)
      break
    default:
      // no-op
  }
}

function reset() {
  subscribers = {}
  notifyQueue = {}
}

// Hookup
if (typeof window === 'object' && typeof window.parallelData !== 'undefined') {
  while (window.parallelData.length) {
    cmd(window.parallelData.shift())
  }
  console.log('replace window.parallelData')
  window.parallelData = { push: cmd }
}

export default { push: cmd, cmd, notify, subscribe, reset }
