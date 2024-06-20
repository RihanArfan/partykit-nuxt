import { useWebSocket, type UseWebSocketOptions, type UseWebSocketReturn } from '@vueuse/core'
import { computed, readonly, ref, toValue, watchEffect, type MaybeRef, type MaybeRefOrGetter, type Ref } from '#imports'
// import { type PartySocketOptions } from "partysocket";

type VuePartySocketOptions = {
  id?: MaybeRef<string>
  host: MaybeRef<string>
  room?: MaybeRef<string>
  party?: MaybeRef<string>
  path?: MaybeRef<string>
  protocol?: MaybeRef<'ws' | 'wss'>
  query: Record<string, MaybeRefOrGetter<string>>
}

type UsePartySocketOptions = VuePartySocketOptions & UseWebSocketOptions
type UsePartySocketReturn<T> = { id: Readonly<Ref<string>> } & UseWebSocketReturn<T>

export function usePartySocket<Data = unknown>(
  partySocketOptions: UsePartySocketOptions,
): UsePartySocketReturn<Data> {
  // _pk is either partySocketOptions.id (maybe a ref so toValue it) or crypto.randomUUID(); if it's a ref
  const _pk = computed(() => toValue(partySocketOptions.id) ?? crypto.randomUUID())
  const id = readonly(_pk)

  // TODO: config merge with default for autoReconnect true

  const partyUrl = usePartyUrl(partySocketOptions, { _pk })
  const webSocket = useWebSocket<Data>(partyUrl, partySocketOptions)

  return {
    ...webSocket,
    id,
  }
}

// code large ripped from https://github.com/partykit/partykit/blob/main/packages/partysocket/src/index.ts#L60
function usePartyUrl(
  partySocketOptions: VuePartySocketOptions,
  defaultParams: Record<string, MaybeRefOrGetter<string>>,
) {
  const url = ref<string | undefined>()

  const generatePartyUrl = (): string => {
    const rawHost = toValue(partySocketOptions.host)
    const rawPath = toValue(partySocketOptions.path)
    const rawProtocol = toValue(partySocketOptions.protocol)
    const room = toValue(partySocketOptions.room)
    const party = toValue(partySocketOptions.party)

    // strip the protocol from the beginning of `host` if any
    let host = rawHost.replace(/^(http|https|ws|wss):\/\//, '')

    // if user provided a trailing slash, remove it
    if (host.endsWith('/')) {
      host = host.slice(0, -1)
    }

    if (rawPath && rawPath.startsWith('/')) {
      throw new Error('path must not start with a slash')
    }

    const path = rawPath ? `/${rawPath}` : ''
    const protocol
      = rawProtocol
      || (host.startsWith('localhost:')
      || host.startsWith('127.0.0.1:')
      || host.startsWith('192.168.')
      || host.startsWith('10.')
      || (host.startsWith('172.') && host.split('.')[1] >= '16' && host.split('.')[1] <= '31')
      || host.startsWith('[::ffff:7f00:1]:')
        ? 'ws'
        : 'ws' + 's')
    const baseUrl = `${protocol}://${host}/${party ? `parties/${party}` : 'party'}/${room}${path}`
    const urlSearchParams = new URLSearchParams([
      ...Object.entries(partySocketOptions.query).map(([key, value]) => [key, toValue(value)]),
      ...Object.entries(defaultParams).map(([key, value]) => [key, toValue(value)]),
    ])

    return new URL(`${baseUrl}?${urlSearchParams}`).toString()
  }

  watchEffect(() => {
    url.value = generatePartyUrl()
  })

  return readonly(url)
}
