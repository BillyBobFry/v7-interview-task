# React Template

This template provides a basic Go project table, built with React. See the root level readme for information on the challenge.

This readme contains information on how to run the React template, and some context on the choices made when building the template.

## Getting started

### Set your API Key

Create a Go API key at https://go.v7labs.com/:yourWorkspaceId/settings/api-keys. Add this API key to `/packages/react/.env` under `VITE_API_KEY`.

### Run the template app

From the project route:

```
npm i
npm run dev -w packages/react
```

### Navigate to a project

Go to `http://localhost:5173/:workspaceId/projects/:projectId`. This is the same route structure as the real Go frontend, so you can visit a project in Go and replace the host with `http://localhost:5173`.

## Styling

We use CSS modules so that we can easily share styles between the Vue and React template apps.
This need not be a consideration when completing your submission, so use whatever styling system you feel would be most effective.

## Global state

We use context because it's built-in and we don't want to lead you towards any particular third party library. Please use whichever state management solution
you feel would be best.
