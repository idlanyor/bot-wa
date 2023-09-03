const users = require('@database/services/users')
const i18n = require('i18n')
const api = require('@libs/utils/api')

const _collection = new Map()

/**
 * @type { import('@libs/builders/command').ICommand }
 */
module.exports = {
  category: 'game',
  description: 'Teka Teki Cak Lontong, guest and get exp.',
  callback: async ({ msg }) => {
    if (_collection.get(msg.from)) {
      return msg.reply(i18n.__('game.finish_last_first'), _collection.get(msg.from))
    }

    const { data } = await api('lolhuman').get('/api/tebak/caklontong').catch(console.error)
    let question = await msg.reply(`${data.result.question}\n\nWaktu 60 Detik`.format({ question: data.result.question }))

    _collection.set(msg.from, question)

    msg.createMessageCollector({
      filter: data.result.answer.toLowerCase(),
      max: 1,
    })
      .on('collect', (msg) => {
        let xp = Math.floor(Math.random() * (999 - 1) + 1)
        users.addExp(msg, msg.senderNumber, xp)
        msg.reply(i18n.__('game.right_answer', { xp }))
      })
      .on('end', (res) => {
        _collection.delete(msg.from)
        if (res == 'timeout') {
          msg.reply(i18n.__('game.timeout_answer', { answer: data.result.answer }), question)
        }
      })
  },
}
