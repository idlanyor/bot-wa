const api = require('@libs/utils/api')

/**
 * @type { import('@libs/builders/command').ICommand }
 */
module.exports = {
  aliases: ['coco', 'cocodl'],
  category: 'cocofun',
  description: 'Cocofun Downloader',
  waitMessage: true,
  minArgs: 1,
  expectedArgs: '<link>',
  example: '{prefix}{command} http://i.coco.fun/short/1513tui',
  callback: async ({ msg, args }) => {
    return api('lolhuman')
      .get('/api/cocofun', {
        params: {
          url: args[0],
        },
      })
      .then(({ data }) => {
        return msg.replyVideo({ url: data.result.nowm })
      })
  },
}
