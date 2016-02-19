
function notify (name, data) {
  console.log('notify', name)
}

function subscribe (name, callback) {
  console.log('subscribe', name)
}

export function push(command) {
  console.log('push', command);
  var action = command[0]
  var argument = command.shift()

  // white-list actions
  switch (action) {
    case 'notify':
      notify.apply(this, arguments)
      break;
    case 'subscribe':
      subscribe.apply(this, arguments)
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

export default {}
