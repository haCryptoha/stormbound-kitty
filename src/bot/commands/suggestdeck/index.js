import Discord from 'discord.js'
import decks from '../../../data/decks'
import arrayRandom from '../../../helpers/arrayRandom'
import getIgnoredSearch from '../../../helpers/getIgnoredSearch'
import serialisation from '../../../helpers/serialisation'
import capitalise from '../../../helpers/capitalise'
import getRawCardData from '../../../helpers/getRawCardData'
import { parseMessage } from '../decks'
import { CATEGORIES } from '../../../constants/decks'

export default {
  command: 'suggestdeck',
  help: function () {
    const embed = new Discord.MessageEmbed()

    embed
      .setColor('#D7598B')
      .setTitle(`✅  Deck Suggestion help`)
      .setURL('https://stormbound-kitty.com/guides/lexicon')
      .setDescription(
        `Suggest a deck matching the given search criteria. It optionally accepts a faction, category and card to include (regardless of order and casing). For instance, \`!${this.command} ic\`, \`!${this.command} wp d1\` or \`!${this.command} brawl kg\`.`
      )

    return embed
  },
  handler: function (message) {
    const { params, ignored } = parseMessage(message.toLowerCase())

    const embed = new Discord.MessageEmbed()

    embed.setColor('#D7598B').setTitle(`✅  Deck Suggestion`)

    if (Object.keys(params).length === 0) {
      const deck = arrayRandom(
        // If the category is not provided, assume the expectation is to have
        // a deck that works and is competitive under normal circumstances (so
        // ranking and Diamond) and therefore discard any Brawl/Equals deck.
        decks.filter(deck => !['BRAWL', 'EQUALS'].includes(deck.category))
      )

      embed.setTitle(deck.name)
      embed.setURL('https://stormbound-kitty.com/deck/' + deck.id)
      embed.addFields(
        { name: 'Author', value: deck.author, inline: true },
        { name: 'Faction', value: capitalise(deck.faction), inline: true },
        { name: 'Category', value: CATEGORIES[deck.category], inline: true }
      )

      return embed
    }

    const results = decks.filter(deck => {
      if (params.faction && deck.faction !== params.faction) {
        return false
      }

      if (params.category) {
        if (deck.category !== params.category) return false
      } else {
        // If the category is not provided, assume the expectation is to have a
        // deck that works and is competitive under normal circumstances (so
        // ranking and Diamond) and therefore discard any Brawl/Equals deck.
        if (['BRAWL', 'EQUALS'].includes(deck.category)) return false
      }

      if (
        params.including &&
        !serialisation.deck
          .deserialise(deck.id)
          .map(card => card.id)
          .includes(params.including)
      ) {
        return false
      }

      return true
    })

    if (results.length > 0) {
      const deck = arrayRandom(results)

      embed.setTitle(deck.name)
      embed.setURL('https://stormbound-kitty.com/deck/' + deck.id)
      embed.addFields(
        { name: 'Author', value: deck.author, inline: true },
        { name: 'Faction', value: capitalise(deck.faction), inline: true },
        { name: 'Category', value: CATEGORIES[deck.category], inline: true }
      )

      if (ignored.length > 0) {
        embed.addFields({
          name: 'Ignored terms',
          value: ignored.join(', '),
        })
      }

      return embed
    }
  },
}
