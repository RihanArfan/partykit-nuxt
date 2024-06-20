# 🎉 partykit-nuxt

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

Use PartyKit 🎉 with Nuxt 💚

Vue port of PartySocket (PartyKit's Client API), powered by VueUse's [useWebSocket](https://vueuse.org/core/useWebSocket/).

- [✨ &nbsp;Release Notes](/CHANGELOG.md)
<!-- - [🏀 Online playground](https://stackblitz.com/github/your-org/partykit-nuxt?file=playground%2Fapp.vue) -->
<!-- - [📖 &nbsp;Documentation](https://example.com) -->

## Features

<!-- Highlight some of the features your module provide here -->
- ↔️ &nbsp;usePartySocket() - Vue PartySocket composable

## Roadmap

- Automatically start PartyKit server with Nuxt

## Quick Setup

Install the module to your Nuxt application with one command:

```bash
npx nuxi module add partykit-nuxt
```

That's it! You can now use partykit-nuxt in your Nuxt app ✨

## Documentation

### `usePartySocket()`

```ts
const { close, data, id, open, send, status, ws } = usePartySocket<string>({
  host: 'localhost:1999',
  room: 'room',
  immediate: false,
  autoReconnect: true,
  query: {
    token: accessToken,
  },
})
```

## Contribution

<details>
  <summary>Local development</summary>

  ```bash
  # Install dependencies
  npm install

  # Generate type stubs
  npm run dev:prepare

  # Develop with the playground
  npm run dev

  # Build the playground
  npm run dev:build

  # Run ESLint
  npm run lint

  # Run Vitest
  npm run test
  npm run test:watch

  # Release new version
  npm run release
  ```

</details>


<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/partykit-nuxt/latest.svg?style=flat&colorA=020420&colorB=00DC82
[npm-version-href]: https://npmjs.com/package/partykit-nuxt

[npm-downloads-src]: https://img.shields.io/npm/dm/partykit-nuxt.svg?style=flat&colorA=020420&colorB=00DC82
[npm-downloads-href]: https://npmjs.com/package/partykit-nuxt

[license-src]: https://img.shields.io/npm/l/partykit-nuxt.svg?style=flat&colorA=020420&colorB=00DC82
[license-href]: https://npmjs.com/package/partykit-nuxt

[nuxt-src]: https://img.shields.io/badge/Nuxt-020420?logo=nuxt.js
[nuxt-href]: https://nuxt.com
