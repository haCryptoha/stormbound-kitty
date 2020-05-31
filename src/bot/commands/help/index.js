import { TRIVIA_CHANNEL } from '../../../constants/bot'

const formatCommand = ({
  channel,
  command,
  description,
  example,
  icon,
  name,
}) => `${icon} **${name}** (e.g. \`!${command}${
  example ? ` ${example}` : ''
}\`)${channel ? ` *(only in <#${channel}>)*` : ''}
       *${description}*`

export default {
  command: 'help',
  name: 'Help',
  description: 'Get help about KittyBot’s commands',
  icon: '🤖',
  isAllowed: channel => channel.id !== TRIVIA_CHANNEL,
  handler: function (message, client) {
    let reply = ''

    for (let [, command] of client.commands) {
      reply += '\n' + formatCommand(command)
    }

    return reply
  },
}
