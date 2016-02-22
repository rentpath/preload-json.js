const subscribers = {}

function notify(name, data) {
  console.log('notify', name)
  const toNotify = subscribers[name] || []
  for (let i = 0, len = toNotify.length; i < len; i++) {
    toNotify[i](data)
  }
}

function subscribe(name, callback) {
  console.log('subscribe', name)
  subscribers[name] = subscribers[name] || []
  subscribers[name].push(callback)
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

// Hookup
if (typeof window === 'object' && typeof window.parallelData !== 'undefined') {
  while (window.parallelData.length) {
    cmd(window.parallelData.shift())
  }
  console.log('replace window.parallelData')
  window.parallelData = { push: cmd }
}

export default { push: cmd, cmd, notify, subscribe }
