import type * as v from 'valibot'

/*
 * This example makes partykit available throughout the entirety of the Nuxt application.
 * This is useful when designing complete realtime Nuxt application rather than adding some
 * real-time to a single page. A simpler approach is just using the `usePartySocket`
 * composable directly in the page you want realtime in.
 */
export default defineNuxtPlugin({
  name: 'partykit',
  parallel: true,
  setup() {
    const config = useRuntimeConfig()
    const accessToken = useAccessToken()

    const { hostname } = window.location

    const partySocket = usePartySocket<string>({
      host: `${hostname}${config.public.partyHost}`,
      room: 'hello',
      immediate: false,
      autoReconnect: true,
      query: {
        token: accessToken,
      },
    })

    const message = computed((): v.InferOutput<typeof ServerSchemas> | null => {
      try {
        return JSON.parse(partySocket.data.value || '')
      }
      catch (error) {
        return null
      }
    })

    return {
      provide: {
        partySocket,
        message,
      },
    }
  },
})
