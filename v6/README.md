# React Router Demo

_React Router v6 has since been superceded by v7. This example would correspond to the `data` mode offered in v7._

This is a completed example of the [v6 React Router Demo](https://reactrouter.com/6.30.0/start/tutorial), with the addition of TypeScript and some minor (preference) deviations from the tutorial.

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
