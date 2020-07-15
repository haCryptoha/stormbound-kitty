import GUIDES from '../../../data/guides.json'
import getEmbed from '../../../helpers/getEmbed'

export default {
  command: 'guides',
  help: function () {
    return getEmbed()
      .setTitle(`🧭  Guides: help`)
      .setURL('https://stormbound-kitty.com/guides')
      .setDescription('List all existing guides from Stormbound-Kitty.')
  },
  handler: function (message) {
    return getEmbed()
      .setTitle('🧭  Guides')
      .setURL('https://stormbound-kitty.com/guides')
      .addFields(
        ...GUIDES.slice(0)
          .sort((a, b) => (a.name > b.name ? +1 : -1))
          .map(guide => ({
            name: guide.name,
            value: `<https://stormbound-kitty.com/guides/${guide.slug}>`,
            inline: true,
          }))
      )
  },
}
