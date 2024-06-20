export default defineNuxtPlugin({
  name: 'realtime-application',
  parallel: true,
  dependsOn: ['partykit'],
  setup() {
    const { $message } = useNuxtApp()

    watch($message, (event) => {
      if (!event?.type) return console.warn('Unknown event received: ', JSON.stringify(event))
      const { type, data } = event

      console.log('Received event: ', type, data)

      switch (type) {
        // message
        case 'message':
          navigateTo('/')
          alert('Message received')
          break

        // unknown event
        default:
          console.warn('Unknown event received: ', event)
          break
      }
    })
  },
})
