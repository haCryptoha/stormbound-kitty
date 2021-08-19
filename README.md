# Stormbound-Kitty

Source code for [Stormbound-Kitty](https://stormbound-kitty.com/).

## Documentation

- [Adding a deck](./docs/ADDING_A_DECK.md)

## Development

The site runs with Next [Next](https://nextjs.org/) application. Therefore, it uses Node.js (version 14). It is recommended to install [nvm](https://github.com/nvm-sh/nvm) (or [nvm-windows](https://github.com/coreybutler/nvm-windows)) to manage Node versions, but it’s not mandatory, as long as Node 14 is installed on the machine.

Then run the following commands to install the local dependencies and start the development server:

```
npm install
npm start
```

## Bot

For the bot to work properly on a Discord server, it requires:

- A #trivia channel for the `!trivia` command.
- A #stormbot channel for all the other commands.
- Ideally some of the roles: Diamond, Platinum, Gold, Silver, Bronze, Iron, Starter, Swarm, Shadowfen, Ironclad, Winter, Neutral, Tournamentee, Artist and Streambound.

## Acknowledgements

![Powered by Vercel](https://www.datocms-assets.com/31049/1618983297-powered-by-vercel.svg)
