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

function push(command) {
  const action = command[0]
  console.log('cmd', command)
  command.shift()

  // white-list actions
  switch (action) {
    case 'notify':
      notify.apply(this, command)
      break
    case 'subscribe':
      subscribe.apply(this, command)
      break
    default:
      // no-op
  }
}

// Hookup
if (typeof window === 'object' && typeof window.parallelData !== 'undefined') {
  while (window.parallelData.length) {
    push(window.parallelData.shift())
  }
  console.log('replace window.parallelData')
  window.parallelData = { push }
}

export default { push }
