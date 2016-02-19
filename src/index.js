
var subscribers = {};

function notify (name, data) {
  console.log('notify', name)
  let toNotify = subscribers[name] || [];
  for (let i = 0, len = toNotify.length; i < len; i++) {
    toNotify[i](data)
  }
}

function subscribe (name, callback) {
  console.log('subscribe', name)
  subscribers[name] = subscribers[name] || []
  subscribers[name].push(callback)
}

function push(command) {
  console.log('cmd', command);
  var action = command[0]
  command.shift()

  // white-list actions
  switch (action) {
    case 'notify':
      notify.apply(this, command)
      break;
    case 'subscribe':
      subscribe.apply(this, command)
      break;
  }
}

// Hookup
if (typeof window === 'object' && typeof window.parallelData !== 'undefined') {
  while (window.parallelData.length) {
    push(window.parallelData.shift())
  }
  console.log('replace window.parallelData')
  window.parallelData = { push: push }
}

export default { push: push }
