import { subscribe } from './index'

subscribe('githubEvents', d => {
  console.log('my lib notified!', d)
})
