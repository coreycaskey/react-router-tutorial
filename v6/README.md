# React Router Demo

> [!IMPORTANT]
> React Router v7 is now the latest major version. This example would equate to the "data" mode offered in v7, but with previous package imports specific to v6 (i.e. `react-router-dom` with v6 vs. `react-router` with v7). Data mode is useful if you want the benefits of data and render separation but don't want or need SSR (or other server-side capabilities) that the "framework" mode bakes in. For a v7 framework-mode approach, see [reference](https://github.com/coreycaskey/react-router-tutorial/tree/main/v7).

This is a completed example of the [v6 React Router Demo](https://reactrouter.com/6.30.0/start/tutorial), with the addition of TypeScript and some minor (preferential) deviations from the tutorial.

1. I used named exports over `default` exports because I prefer import and export names to be the same, and this is is the easiest way to enforce it.

2. I used function expressions with arrow syntax over function declarations. I just like them better.

3. I split out certain interfaces, constants, and JSX to make the repo more modular and readable

## Development

From your terminal:

```sh
npm i

npm run dev
```

This starts your app in development mode, rebuilding assets on file changes.

👋
