# Stormbound Kitty

Source code for [Stormbound Kitty](https://stormbound-kitty.com/).

## Documentation

- [Adding a deck](./docs/ADDING_A_DECK.md)

## Development

Create a `.env` file at the root of the project, and set:

```
NODE_ENV=development
```

Then run:

```
npm install
npm start
```

## Bot

For the bot to work properly, it requires:

- A #trivia channel for the `!trivia` command.
- A #stormbot channel for all the other commands.
- Ideally some of the roles: Diamond, Platinum, Gold, Silver, Bronze, Iron, Starter, Tournamentee and Streambound.
