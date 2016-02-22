var request = new XMLHttpRequest()
request.open('GET', 'https://api.github.com/users/c0/events', true)

var data;

request.onload = function() {
  if (this.status >= 200 && this.status < 400) {
    data = JSON.parse(this.response)
    console.log('AJAX data', data)
  } else {
    // We reached our target server, but it returned an error
  }
}

request.onerror = function() {
  console.log('loading error')
}

request.send()

// preload-json!
window.parallelData = window.parallelData || []
window.parallelData.push([
  'subscribe',
  'githubEvents',
  function(d) {
    console.log('my lib notified!', d)
  }
])
