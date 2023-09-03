const api = require('@libs/utils/api')

/**
 * @type { import('@libs/builders/command').ICommand }
 */
module.exports = {
  aliases: ['kn', 'kisahnabi'],
  category: 'islami',
  description: 'Kisah Nabi',
  minArgs: 1,
  expectedArgs: '<nama nabi>',
  example: '{prefix}{command} Muhammad',
  callback: async ({ msg, args }) => {
    return api('lolhuman')
      .get(`/api/kisahnabi/${args[0]}`)
      .then(({ data }) => {
        let text = ''
        text += `Nama Nabi : ${data.result.name}  \n`
        text += `Tahun Kelahiran : ${data.result.thn_kelahiran}  \n`
        text += `Tempat : ${data.result.place}  \n`
        text += `Cerita :  ${data.result.story}  \n`
        return msg.reply(text)
      })
  },
}
