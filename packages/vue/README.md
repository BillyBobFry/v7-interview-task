# Vue Template

This template provides a basic Go project table, built with Vue. See the root level readme for information on the challenge.

This readme contains information on how to run the Vue template, and some context on the choices made when building the template.

## Getting started

### Set your API Key

Create a Go API key at https://go.v7labs.com/:yourWorkspaceId/settings/api-keys. Add this API key to `/packages/react/.env` under `VITE_API_KEY`.

### Run the template app

From the project route:

```
npm i
npm run dev -w packages/vue
```

### Navigate to a project

Go to `http://localhost:5173/:workspaceId/projects/:projectId`. This is the same route structure as the real Go frontend, so you can visit a project in Go and replace the host with `http://localhost:5173`.

## Styling

We import CSS fles from a separate package so we can easily share styles between the Vue and React template apps.

This need not be a consideration when completing your submission, so use whatever styling system you feel would be most effective.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

### Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.
