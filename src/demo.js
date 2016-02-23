import { subscribe } from './index'

const request = new XMLHttpRequest()
request.open('GET', 'https://api.github.com/users/c0/events', true)

request.onload = function() {
  if (this.status >= 200 && this.status < 400) {
    console.log('AJAX data', JSON.parse(this.response))
  } else {
    // We reached our target server, but it returned an error
  }
}

request.onerror = function() {
  console.log('loading error')
}

request.send()

// preload-json!
subscribe('githubEvents', d => {
  console.log('my lib notified!', d)
})
