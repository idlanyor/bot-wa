const api = require('@libs/utils/api')

/**
 * @type { import('@libs/builders/command').ICommand }
 */
module.exports = {
  aliases: ['wiki', 'wikipedia'],
  category: 'Chat',
  description: 'ChatGPT 3.5 Turbo.',
  waitMessage: true,
  minArgs: 1,
  expectedArgs: '<link>',
  example: '{prefix}{command} Perang dunia II',
  callback: async ({ msg, fullArgs }) => {
    try {
      let { data } = await api('lolhuman').get('/api/wiki', { params: { query: fullArgs } });
      await msg.reply(`*[Wikipedia]* \n \n ${data.result}`);
    } catch (error) {
      console.error('Terjadi kesalahan dalam permintaan:', error);
      await msg.reply('Terjadi kesalahan dalam permintaan. Mohon cek URL atau coba lagi nanti.');
    }
  },
}
